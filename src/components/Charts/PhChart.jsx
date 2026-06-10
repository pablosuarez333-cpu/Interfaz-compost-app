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

function PhChart({
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
      <h3>pH</h3>

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

          <ReferenceLine
            y={7}
            label="Neutral"
          />

          <Line
            type="monotone"
            dataKey="ph"
            name="pH"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PhChart;