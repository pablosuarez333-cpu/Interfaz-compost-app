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

function TemperatureChart({
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
        Temperatura
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
            label={{
              value:
                "Día",
              position:
                "insideBottom",
              offset: -5
            }}
          />

          <YAxis
            label={{
              value:
                "°C",
              angle: -90,
              position:
                "insideLeft"
            }}
          />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={40}
            label="Mesófila"
          />

          <ReferenceLine
            y={55}
            label="Termófila"
          />

          <Line
            type="monotone"
            dataKey="temperature"
            name="Temperatura"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;