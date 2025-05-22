import FilterContext from "../context/FilterContext";
import { useContext } from "react";

const FiltroEstado = ({obrasData}) => {
  const estadosUnicos = [
    ...new Set(obrasData.map((obra) => obra.attributes.ESTADO)),
  ];

  const {filters, setFilter} = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-1 border-t-2 border-white p-2">
      <label htmlFor="estado">Selecciona un Estado:</label>
      <select 
        className="bg-white p-1 text-black rounded" 
        id="estado" 
        onChange={(e) => setFilter("estado", e.target.value || undefined)}
        value={filters["estado"] ?? ""}
      >
        <option value="">Todos los estados</option>
        {estadosUnicos.map((estado, index) => (
          <option key={index} value={estado}>
            {estado}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroEstado;