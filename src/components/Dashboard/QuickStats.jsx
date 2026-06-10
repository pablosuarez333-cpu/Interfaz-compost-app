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
            {lot.currentTemperature}
            °C
          </p>

          <p>
            Temperatura máxima:
            {" "}
            {lot.maximumTemperature}
            °C
          </p>

          <p>
            Temperatura promedio:
            {" "}
            {lot.averageTemperature}
            °C
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