function ProcessEvents({
  events
}) {
  return (
    <div
      style={{
        background:
          "#ffffff",
        padding: "20px",
        borderRadius:
          "10px"
      }}
    >
      <h2>
        Eventos
      </h2>

      {events.map(
        (event) => (
          <div
            key={event.id}
            style={{
              borderBottom:
                "1px solid #e5e7eb",
              marginBottom:
                "10px",
              paddingBottom:
                "10px"
            }}
          >
            <strong>
              Día{" "}
              {event.day}
            </strong>

            <p>
              {
                event.type
              }
            </p>

            <p>
              {
                event.description
              }
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default ProcessEvents;