import comunasData from "../data/COMUNA.json";
import { useContext } from "react";
import FilterContext from "../context/FilterContext";

const FiltroComuna = () => {
  const comunas = comunasData.features || []
  
  const {filters, setFilter} = useContext(FilterContext);
  
  return (
    <div className="flex flex-col gap-1 border-t-2 border-white p-2">
      <label htmlFor="comuna">Selecciona una Comuna:</label>
      <select
        className="bg-white p-1 text-black rounded"
        id="comuna"
        value={filters["comuna"] ?? ""}
        onChange={(e) => setFilter("comuna", e.target.value || undefined)}
      >
        <option value="">Todas las comunas</option>
        {comunas.map(({attributes: comuna}, index) => (
          <option key={index} value={`${comuna.CODIGO} - ${comuna.NOMBRE}`}>
            {`${comuna.CODIGO} - ${comuna.NOMBRE}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroComuna;