import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from "recharts";

const RadarObras = ({ data }) => {
    const dataRadarChart = Object.entries(
        data.reduce((acc, obra) => {
            if(obra.attributes?.CANTIDAD_A == 0 || obra.attributes?.ACTIVIDAD == " ") return acc;
            const actividad = `${obra.attributes?.ACTIVIDAD}(${obra.attributes?.UN})`;
            if (!acc[actividad]) acc[actividad] = obra.attributes?.CANTIDAD_A;
            acc[actividad]+= obra.attributes?.CANTIDAD_A;
            if(acc[actividad] > 1000) acc[actividad] = Math.round(acc[actividad]);
            return acc;
        }, {})
    ).map(([actividad, valor_total]) => ({ actividad, valor_total }));

    return (
        <ResponsiveContainer width="100%" height={600}>
            <RadarChart cx="50%" cy="50%" outerRadius="90%" data={dataRadarChart}>
                <PolarGrid />
                <PolarAngleAxis 
                    dataKey="actividad" 
                    tick={{ fontSize: 10, angle: 0 }} 
                    tickLine={false}
                    interval={0}
                />
                <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 'dataMax']} />
                <Tooltip />
                <Radar 
                    name="Cantidad Ejecutada" 
                    dataKey="valor_total" 
                    stroke="#00749f" 
                    fill="#00AEEF" 
                    fillOpacity={0.6} 
                    lineWidth={2}  
                />
            </RadarChart>
        </ResponsiveContainer>
    )
};

export default RadarObras;