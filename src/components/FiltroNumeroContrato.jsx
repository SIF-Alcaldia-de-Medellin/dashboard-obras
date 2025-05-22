import FilterContext from "../context/FilterContext";
import { useContext } from "react";

const FiltroNumeroContrato = ({obrasData}) => {
  const numerosContratosUnicos = [
    ...new Set(obrasData.map((obra) => obra.attributes.NUMERO_CON)),
  ];

  const {filters, setFilter} = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-1 border-t-2 border-white p-2">
      <label htmlFor="numero_contrato">Selecciona un Número de contrato:</label>
      <select 
        className="bg-white p-1 text-black rounded" 
        id="numero_contrato" 
        onChange={(e) => setFilter("numero_contrato", e.target.value || undefined)}
        value={filters["numero_contrato"] ?? ""}
      >
        <option value="">Todos los contratos</option>
        {numerosContratosUnicos.map((numero_contrato, index) => (
          <option key={index} value={numero_contrato}>
            {numero_contrato}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroNumeroContrato;