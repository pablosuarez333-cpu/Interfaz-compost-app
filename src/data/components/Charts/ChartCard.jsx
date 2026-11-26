// Tarjeta común para las gráficas: título, mensajes claros cuando faltan datos
// y un contenedor de altura fija para que la gráfica siempre tenga espacio.
function ChartCard({ title, points, emptyText, children }) {
  return (
    <div
      style={{
        width: "100%",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      {points === 0 ? (
        <p style={{ color: "#6b7280" }}>{emptyText}</p>
      ) : (
        <>
          {points === 1 && (
            <p
              style={{
                color: "#92400e",
                background: "#fef3c7",
                padding: "8px 12px",
                borderRadius: "6px"
              }}
            >
              Solo hay 1 medición. Se necesitan al menos 2 para dibujar la curva.
            </p>
          )}

          <div style={{ width: "100%", height: "320px" }}>{children}</div>
        </>
      )}
    </div>
  );
}

export default ChartCard;
