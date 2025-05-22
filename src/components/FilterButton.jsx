import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSliders } from "@fortawesome/free-solid-svg-icons";
import FiltroComuna from "./FiltroComuna";
import FiltroTipoContrato from "./FiltroTipoContrato";
import ModalContext from "../context/ModalContext";
import FilterContext from "../context/FilterContext";
import FiltroEstado from "./FiltroEstado";
import FiltroActividad from "./FiltroActividad";
import FiltroNumeroContrato from "./FiltroNumeroContrato";

const FilterButton = ({data}) => {
    const {isModalOpen, openModal} = useContext(ModalContext);
    const {resetFilters} = useContext(FilterContext);

    return (!isModalOpen ? <div className="fixed bottom-[25px] right-[25px] bg-purple-500 w-[60px] h-[60px] flex justify-center items-center rounded-full hover:scale-110 cursor-pointer z-50" onClick={openModal}>
        <FontAwesomeIcon className="text-white text-[36px]" icon={faSliders}/>
    </div> : <div className="fixed bottom-[25px] right-[25px] text-white bg-purple-400 p-4 rounded flex flex-col gap-2 max-w-[calc(100vw-50px)]" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between">
            <h3 className="font-bold heading-4"><FontAwesomeIcon className="text-[36px]" icon={faFilter}/> Filtrar Datos</h3>
            <button className="bg-indigo-800 hover:bg-indigo-900 active:bg-indigo-950 foc cursor-pointer p-2 rounded-lg font-semibold" onClick={resetFilters}>Reestablecer</button>
        </div>
        <FiltroComuna />
        <FiltroTipoContrato obrasData={data} />
        <FiltroEstado obrasData={data} />
        <FiltroActividad obrasData={data} />
        <FiltroNumeroContrato obrasData={data} />
    </div>);
}

export default FilterButton;