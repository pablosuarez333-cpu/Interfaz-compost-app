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

function HumidityChart({
  data
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background:
          "#ffffff",
        padding: "20px",
        borderRadius:
          "10px"
      }}
    >
      <h3>
        Humedad
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
            dataKey="humidity"
            name="Humedad"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HumidityChart;