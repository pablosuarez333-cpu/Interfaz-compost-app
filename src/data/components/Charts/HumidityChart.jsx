import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceArea
} from "recharts";

import ChartCard from "./ChartCard";

function HumidityChart({ data = [] }) {
  // Solo se grafican las mediciones que sí tienen humedad
  const points = data.filter(
    (item) => item.humidity !== null && item.humidity !== undefined
  );

  return (
    <ChartCard
      title="Humedad"
      points={points.length}
      emptyText="Aún no hay mediciones de humedad para este lote. Captura la humedad al registrar una medición en la sección Mediciones."
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={points}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="day"
            label={{
              value: "Día",
              position: "insideBottom",
              offset: -5
            }}
          />

          <YAxis
            domain={[0, 100]}
            label={{
              value: "%",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip />

          <Legend />

          <ReferenceArea
            y1={40}
            y2={60}
            fill="#16a34a"
            fillOpacity={0.08}
            label="Rango recomendado"
          />

          <Line
            type="monotone"
            dataKey="humidity"
            name="Humedad (%)"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export default HumidityChart;
