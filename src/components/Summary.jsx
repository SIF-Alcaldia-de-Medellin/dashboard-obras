import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";

const Summary = ({ data, className }) => {
  const tipoContratoData = Object.entries(
    data.reduce((acc, obra) => {
      const tipo_contrato = obra.attributes?.TIPO_CONTR;
      if (!acc[tipo_contrato]) acc[tipo_contrato] = 0;
      acc[tipo_contrato]++;
      return acc;
    }, {})
  ).map(([tipo_contrato, cantidad]) => ({ tipo_contrato, cantidad }))
   .sort((a, b) => b.cantidad - a.cantidad);

  return (
    <div className={`bg-gray-50 p-2 px-4 rounded max-h-[400px] overflow-auto ${className}`}>
      <h3 className="heading-4 font-bold border-b-2">Resumen General</h3>
      <div className="flex">
        <div className="p-2 flex flex-col gap-1 w-full md:w-1/2">
          <h4 className="heading-5 font-semibold flex items-center gap-1"><FontAwesomeIcon className="text-4xl" icon={faMagnifyingGlassChart} />Tipo de contrato:</h4>
          <ul className="">
            {tipoContratoData.map((c, i) => (
              <li key={i} className=" border-b-2 border-gray-700">
                {c.tipo_contrato}: <p className="font-semibold heading-5">{c.cantidad}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Summary;
