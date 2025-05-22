import FilterContext from "../context/FilterContext";
import { useContext } from "react";

const FiltroActividad = ({obrasData}) => {
  const actividadesUnicas = [
    ...new Set(obrasData.map((obra) => obra.attributes.ACTIVIDAD)),
  ];

  const {filters, setFilter} = useContext(FilterContext);

  return (
    <div className="flex flex-col gap-1 border-t-2 border-white p-2">
      <label htmlFor="actividad">Selecciona una Actividad:</label>
      <select 
        className="bg-white p-1 text-black rounded" 
        id="actividad" 
        onChange={(e) => setFilter("actividad", e.target.value || undefined)}
        value={filters["actividad"] ?? ""}
      >
        <option value="">Todas las actividades</option>
        {actividadesUnicas.map((actividad, index) => (
          <option key={index} value={actividad}>
            {actividad}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroActividad;