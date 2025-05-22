import FilterContext from "../context/FilterContext";
import { useContext } from "react";

const FiltroTipoContrato = ({obrasData}) => {
  const tiposContratosUnicos = [
    ...new Set(obrasData.map((obra) => obra.attributes.TIPO_CONTR)),
  ];

  const {filters, setFilter} = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-1 border-t-2 border-white p-2">
      <label htmlFor="tipo_contrato">Selecciona un Tipo de contrato:</label>
      <select 
        className="bg-white p-1 text-black rounded" 
        id="tipo_contrato" 
        onChange={(e) => setFilter("tipo_contrato", e.target.value || undefined)}
        value={filters["tipo_contrato"] ?? ""}
      >
        <option value="">Todos los tipos</option>
        {tiposContratosUnicos.map((tipo_contrato, index) => (
          <option key={index} value={tipo_contrato}>
            {tipo_contrato}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroTipoContrato;