import { useState, useEffect, lazy, Suspense } from "react";
import obrasData from "./data/AVANCE_2024_2025.json"
import Header from "./components/Header";
import ModalContext from "./context/ModalContext";
import FilterContext from "./context/FilterContext";
import SkeletonMap from "./components/SkeletonMap";
import SkeletonPaneles from "./components/SkeletonPaneles";
import SkeletonSummary from "./components/SkeletonSummary";
import SkeletonFilterButton from "./components/SkeletonFilterButton";

const MapaObras = lazy(() => import("./components/MapaObras"));
const Paneles = lazy(() => import("./components/Paneles"));
const Summary = lazy(() => import("./components/Summary"));
const FilterButton = lazy(() => import("./components/FilterButton"));
const HistogramaComuna = lazy(() => import("./components/HistogramaComuna"));
const RadarObras = lazy(() => import("./components/RadarObras"));

const App = () => {
  const [filters, setFilters] = useState({
    comuna: undefined,
    tipo_contrato: undefined, 
    estado: undefined, 
    actividad: undefined, 
    numero_contrato: undefined
  });

  const setFilter = (filter, value) => {
    setFilters({...filters, [filter]: value})
  }

  const resetFilters = () => setFilters({
    comuna: undefined,
    tipo_contrato: undefined, 
    estado: undefined, 
    actividad: undefined, 
    numero_contrato: undefined
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }

  const [todasLasObras, _] = useState(obrasData.features || []);
  const [obrasFiltradas, setObrasFiltradas] = useState(todasLasObras);

  useEffect(() => {
    const resultadoFiltrado = todasLasObras.filter((obra) => {
      const { 
        COMUMEDELL: comuna, 
        TIPO_CONTR: tipo_contrato, 
        ESTADO: estado, 
        ACTIVIDAD: actividad, 
        NUMERO_CON 
      } = obra.attributes || {};

      if (filters.comuna && comuna !== filters.comuna) return false;
      if (filters.tipo_contrato && tipo_contrato !== filters.tipo_contrato) return false;
      if (filters.estado && estado !== filters.estado) return false;
      if (filters.actividad && actividad !== filters.actividad) return false;
      if (filters.numero_contrato && NUMERO_CON != filters.numero_contrato) return false;

      return true;
    });

    setObrasFiltradas(resultadoFiltrado);
  }, [
    filters,
    todasLasObras 
  ])

  return (
    <ModalContext.Provider value={{isModalOpen: isModalOpen, openModal: openModal}}>
      <FilterContext.Provider value={{filters, setFilter, setFilters, resetFilters}}>
        <div className="bg max-w-screen min-h-screen" onClick={closeModal}>
          <main className="relative flex flex-col p-[20px] gap-[10px] xl:gap-[20px]">
            <Header title="Dashboard de Obras" />
            <div className="flex flex-col bg-white rounded-2xl p-[20px] gap-[10px] lg:gap-[20px]">
              <Suspense fallback={<SkeletonPaneles />}>
                <Paneles data={obrasFiltradas} />
              </Suspense>
            </div>
            <div className="bg-white p-[20px] flex flex-wrap rounded-2xl gap-[10px] lg:flex-nowrap lg:gap-[20px]">
              <Suspense fallback={<SkeletonMap className="w-full lg:min-w-[calc(3/5*100%+40px)]"/>}>
                <MapaObras data={obrasFiltradas} className="w-full lg:w-[calc(3/5*100%+40px)]"/>
              </Suspense>
              <Suspense fallback={<SkeletonSummary className="w-full lg:w-[calc(2/5*100%+20px)]"/>}>
                <Summary data={obrasFiltradas} className="w-full lg:w-[calc(2/5*100%+20px)]"/>
              </Suspense>
            </div>

            <Suspense fallback={<div className="w-full rounded-2xl bg-white animate-pulse h-[600px]"></div>}>
              <div className="w-full p-2 px-4 rounded-2xl bg-white">
                <h3 className="font-bold heading-5 text-center">Valor Total de Contratos por comuna</h3>
                <HistogramaComuna data={obrasFiltradas} />
              </div>
            </Suspense>
            <Suspense fallback={<div className="w-full rounded-2xl bg-white animate-pulse h-[600px]"></div>}>
              <div className="w-full p-2 px-4 rounded-2xl bg-white">
                  <h3 className="font-bold heading-5 text-center">Cantidad Total ejecutada por actividad</h3>
                  <RadarObras data={obrasFiltradas}/>
              </div>
            </Suspense>
            <Suspense fallback={<SkeletonFilterButton />}>
              <FilterButton data={todasLasObras}/>
            </Suspense> 
          </main>
        </div>
      </FilterContext.Provider>
    </ModalContext.Provider>
    );
};

export default App;
