import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassChart } from "@fortawesome/free-solid-svg-icons";

const Summary = ({ data, className }) => {
  const tipoContratoData = Object.entries(
    data.reduce((acc, obra) => {
      const tipo_contrato = obra.attributes?.TIPO_CONTR;
      if (!acc[tipo_contrato]) acc[tipo_contrato] = 0;
      acc[tipo_contrato]+= obra.attributes?.VALOR_ACTU;
      return acc;
    }, {})
  ).map(([tipo_contrato, valor]) => ({ tipo_contrato, valor }))
  .sort((a, b) => b.valor - a.valor);

  return (
    <div className={`bg-gray-50 p-2 px-4 rounded max-h-[400px] overflow-auto ${className}`}>
      <h3 className="heading-4 font-bold border-b-2">Resumen General</h3>
      <div className="flex">
        <div className="p-2 flex flex-col gap-1 w-full ">
          <h4 className="heading-5 font-semibold flex items-center gap-1"><FontAwesomeIcon className="text-4xl" icon={faMagnifyingGlassChart} />Inversión por tipo de contrato:</h4>
          <ul className="">
            {tipoContratoData.map((c, i) => (
              <li key={i} className=" border-b-2 border-gray-700">
                {c.tipo_contrato}: <p className="font-semibold heading-5">{c.valor.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                            })}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <table className="table-auto">
        <thead>
          <tr>
            <th># Contrato</th>
            <th>Objeto</th>
            <th>Tipo</th>
            <th>Vigencia</th>
            <th>Fecha Inicio</th>
            <th>Fecha Finalización</th>
            <th>Total Frentes de obra</th>
            <th>Valor Total (COP)</th>
            <th>Actividades</th>
          </tr>
        </thead>
        <tbody>
          {infoPorContrato.map((info)=>(
            <tr>
              <td>{info.numeroContrato}</td>
              <td>{info.objeto}</td>
              <td>{info.tipoContrato}</td>
              <td>{info.vigencia}</td>
              <td>{info.fechaInicio}</td>
              <td>{info.fechaFinalizacion}</td>
              <td>{info.frentesObra}</td>
              <td>{info.valorTotal}</td>
              <td>{[...info.actividades].join(", ").toLowerCase()}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Summary;
