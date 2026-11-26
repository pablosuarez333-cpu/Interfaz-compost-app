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

function PhChart({ data = [] }) {
  // Solo se grafican las mediciones que sí tienen pH
  const points = data.filter(
    (item) => item.ph !== null && item.ph !== undefined
  );

  return (
    <ChartCard
      title="pH"
      points={points.length}
      emptyText="Aún no hay mediciones de pH para este lote. Captura el pH al registrar una medición en la sección Mediciones."
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
              (dataMin) => Math.min(Math.floor(dataMin) - 1, 6),
              (dataMax) => Math.max(Math.ceil(dataMax) + 1, 8)
            ]}
            allowDecimals={false}
          />

          <Tooltip />

          <Legend />

          <ReferenceLine y={7} stroke="#9ca3af" strokeDasharray="4 4" label="Neutral" />

          <Line
            type="monotone"
            dataKey="ph"
            name="pH"
            stroke="#16a34a"
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

export default PhChart;
