import FilterContext from "../context/FilterContext";
import { useContext } from "react";

const TableContracts = ({ data, className })=>{
    const infoPorContrato =  Object.values(data.reduce((acc, obra) => {
        const contrato = obra.attributes.NUMERO_CON;
        const objeto = obra.attributes.OBJETO;
        const tipoContrato = obra.attributes.TIPO_CONTR;
        const vigencia = obra.attributes.VIGENCIA;
        const fechaInicio = obra.attributes.FECHA_INIC;
        const fechaFinalizacion = obra.attributes.FECHA_DE_T;
        const valorObra = obra.attributes.VALOR_ACTU;
        const actividad = obra.attributes.ACTIVIDAD;

        if (!acc[contrato]) {
            acc[contrato] = {
            numeroContrato: contrato,
            objeto,
            tipoContrato,
            vigencia,
            fechaInicio: new Date(fechaInicio).toLocaleDateString(),
            fechaFinalizacion: new Date(fechaFinalizacion).toLocaleDateString(),
            frentesObra: 0,
            valorTotal: 0,
            actividades: new Set(),
            };
        }

        if(tipoContrato == "Obra") acc[contrato].frentesObra += 1;

        acc[contrato].valorTotal += valorObra;
        acc[contrato].actividades.add(actividad);

        return acc;
    }, {}))
    .sort((a, b) => b.frentesObra - a.frentesObra)

    const {filters, setFilter} = useContext(FilterContext);

    return (
    <div className={`rounded-2xl ${className}`}>
        <table className={`table-fixed border rounded-2xl overflow-hidden`}>
            <thead className="bg-blue-sky-400 text-white paragraph font-bold uppercase sticky">
                <tr>
                    <th className="px-4 py-2 text-center">Número Contrato</th>
                    <th className="px-4 py-2 text-center">Objeto</th>
                    <th className="px-4 py-2 text-center">Tipo</th>
                    <th className="px-4 py-2 text-center">Vigencia</th>
                    <th className="px-4 py-2 text-center">Fecha Inicio</th>
                    <th className="px-4 py-2 text-center">Fecha Finalización</th>
                    <th className="px-4 py-2 text-center">Total Frentes de obra</th>
                    <th className="px-4 py-2 text-center">Valor Total (COP)</th>
                    <th className="px-4 py-2 text-center">Actividades</th>
                </tr>
            </thead>
            <tbody>
                {infoPorContrato.map((info, index)=>(
                    <tr 
                        key={index}
                        className={`${index % 2 == 0 ? "bg-blue-sky-100" : "bg-blue-sky-200"} hover:bg-blue-sky-800 hover:text-white transition`}
                        onClick={(e) => {
                            if(!filters["numero_contrato"]){
                                setFilter("numero_contrato", info.numeroContrato || undefined)
                            }else{
                                setFilter("numero_contrato", undefined)
                            }
                        }}
                    >
                        <td className="px-4 py-2 text-sm w-fit">{info.numeroContrato}</td>
                        <td className="px-4 py-2 text-sm max-w-xs truncate" title={info.objeto}>{info.objeto}</td>
                        <td className="px-4 py-2 text-sm">{info.tipoContrato}</td>
                        <td className="px-4 py-2 text-sm">{info.vigencia}</td>
                        <td className="px-4 py-2 text-sm">{info.fechaInicio}</td>
                        <td className="px-4 py-2 text-sm">{info.fechaFinalizacion}</td>
                        <td className="px-4 py-2 text-sm text-right">{info.frentesObra}</td>
                        <td className="px-4 py-2 text-sm text-right">
                            {info.valorTotal.toLocaleString("es-CO", {
                                style: "currency",
                                currency: "COP",
                                minimumFractionDigits: 0,
                            })}
                        </td>
                        <td 
                            className="px-4 py-2 text-sm max-w-3xs truncate" 
                            title={[...info.actividades].join(", ").toLowerCase()}
                        >
                            {[...info.actividades].join(", ").toLowerCase()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default TableContracts;