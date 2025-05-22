import { createContext } from "react";

const FilterContext = createContext({
    comuna: undefined,
    tipo_contrato: undefined, 
    estado: undefined, 
    actividad: undefined, 
    numero_contrato: undefined
});

export default FilterContext