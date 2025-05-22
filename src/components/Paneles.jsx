import Card from "./Card";
import { faBuildingCircleCheck, faBuildingCircleExclamation, faBuildingCircleXmark, faPersonDigging } from "@fortawesome/free-solid-svg-icons";

const Paneles = ({data}) => {
  const dataByEstado = data.reduce((acc, obra) => {
    const estado = obra.attributes.ESTADO;
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex justify-center gap-[10px] xl:gap-[20px] flex-wrap xl:flex-nowrap xl:justify-between">
      <Card className="bg-dark-blue-400 w-[100%] xl:w-1/4" icon={faPersonDigging} title="Total Obras" kpi={data.length || 0} />
      <Card className="bg-red-500 w-[calc(1/2*100%-10px)] xl:w-1/4" icon={faBuildingCircleXmark} title="Suspendidas" kpi={dataByEstado["Suspendido"] || 0} />
      <Card className="bg-orange-500 w-[calc(1/2*100%-10px)] xl:w-1/4" icon={faBuildingCircleExclamation} title="En Ejecución" kpi={dataByEstado["En Ejecución"] || 0} />
      <Card className="bg-green-500 w-[100%] xl:w-1/4" icon={faBuildingCircleCheck} title="Terminadas" kpi={dataByEstado["Terminado"] || 0} />
    </div>
  );
};

export default Paneles;
