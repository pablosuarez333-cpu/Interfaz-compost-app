function formatTemp(value) {
  return value === null || value === undefined ? "—" : `${value} °C`;
}

function QuickStats({ lotsSummary }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(300px,1fr))",
        gap: "20px"
      }}
    >
      {lotsSummary.map((lot) => (
        <div
          key={lot.id}
          style={{
            background: "#ffffff",
            borderRadius: "10px",
            padding: "20px",
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.08)"
          }}
        >
          <h3>{lot.name}</h3>

          <p>
            Temperatura actual:
            {" "}
            {formatTemp(lot.currentTemperature)}
          </p>

          <p>
            Temperatura máxima:
            {" "}
            {formatTemp(lot.maximumTemperature)}
          </p>

          <p>
            Temperatura promedio:
            {" "}
            {formatTemp(lot.averageTemperature)}
          </p>

          <p>
            Etapa:
            {" "}
            {lot.stage}
          </p>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
