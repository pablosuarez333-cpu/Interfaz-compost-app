import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from "recharts";

import ChartCard from "./ChartCard";

function TemperatureChart({ data = [] }) {
  // Solo se grafican las mediciones que sí tienen temperatura
  const points = data.filter(
    (item) => item.temperature !== null && item.temperature !== undefined
  );

  return (
    <ChartCard
      title="Temperatura"
      points={points.length}
      emptyText="Aún no hay mediciones de temperatura para este lote. Regístralas en la sección Mediciones."
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
            domain={[
              (dataMin) => Math.min(Math.floor(dataMin / 5) * 5, 20),
              (dataMax) => Math.max(Math.ceil(dataMax / 5) * 5, 60)
            ]}
            label={{
              value: "°C",
              angle: -90,
              position: "insideLeft"
            }}
          />

          <Tooltip />

          <Legend />

          <ReferenceLine y={40} stroke="#9ca3af" strokeDasharray="4 4" label="Mesófila" />

          <ReferenceLine y={55} stroke="#9ca3af" strokeDasharray="4 4" label="Termófila" />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperatura (°C)"
            stroke="#dc2626"
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

export default TemperatureChart;
