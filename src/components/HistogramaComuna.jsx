import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle
} from "recharts";

const HistogramaComuna = ({ data }) => {
  const dataBarChart = Object.entries(
    data.reduce((acc, obra) => {
      const comuna = obra.attributes?.COMUMEDELL;
      if (!acc[comuna]) acc[comuna] = obra.attributes?.VALOR_ACTU;
      acc[comuna]+= obra.attributes?.VALOR_ACTU;
      return acc;
    }, {})
  ).map(([comuna, valor_total]) => ({ comuna, valor_total }));

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart width={150} height={40} data={dataBarChart}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="comuna" 
          tick={true} 
          axisLine={true} 
        />
        <YAxis 
          orientation="left"
          width={150}
        />
        <Tooltip 
          formatter={(value, _) => [value, 'valor_total']}
          labelFormatter={(label) => `${label}`}
        />
        <Bar dataKey="valor_total" fill="#004884" activeBar={<Rectangle fill="#FF8403" stroke="#d76e00" />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HistogramaComuna;
