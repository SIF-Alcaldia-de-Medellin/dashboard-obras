import {useMemo, useState, useEffect} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const PieChartObras = ({data}) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // consider <768px as mobile
        };

        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const dataChart = useMemo(() => {
        const counts = data.reduce((acc, obra) => {
          const actividad = obra.attributes?.;
          if (!acc[actividad]) {
            acc[actividad] = 0;
          }
          acc[actividad]++;
          return acc;
        }, {});
      
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
      }, [data]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                data={dataChart}
                cx="50%"
                cy="50%"
                
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label
                >
                    {dataChart.map((entry, index) => (
                        <Cell key={`cell-${index}`} />
                    ))}
                </Pie>
                <Legend 
                    layout={isMobile ? "horizontal" : "vertical"}
                    verticalAlign={isMobile ? "top" : "middle"}
                    align={isMobile ? "center" : "right"}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default PieChartObras