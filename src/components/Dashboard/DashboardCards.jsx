function cardStyle() {
  return {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
  };
}

function DashboardCards({
  activeLots,
  totalMeasurements,
  totalEvents
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "20px",
        marginBottom: "25px"
      }}
    >
      <div style={cardStyle()}>
        <h3>Lotes Activos</h3>
        <h2>{activeLots}</h2>
      </div>

      <div style={cardStyle()}>
        <h3>Mediciones</h3>
        <h2>{totalMeasurements}</h2>
      </div>

      <div style={cardStyle()}>
        <h3>Eventos</h3>
        <h2>{totalEvents}</h2>
      </div>
    </div>
  );
}

export default DashboardCards;