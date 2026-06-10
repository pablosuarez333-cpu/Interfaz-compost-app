import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

function ComparisonChart({
  data
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "450px",
        background:
          "#ffffff",
        padding: "20px",
        borderRadius:
          "10px"
      }}
    >
      <h3>
        Comparación
        de Temperaturas
      </h3>

      <ResponsiveContainer
        width="100%"
        height="90%"
      >
        <LineChart
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="day"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          <Line
            type="monotone"
            dataKey="cajon"
            name="Cajón"
          />

          <Line
            type="monotone"
            dataKey="pila"
            name="Pila"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ComparisonChart;