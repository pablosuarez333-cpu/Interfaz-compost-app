function getStageColor(
  stage
) {
  switch (stage) {
    case "Mesófila":
      return "#dbeafe";

    case "Termófila Moderada":
      return "#fde68a";

    case "Termófila":
      return "#fecaca";

    case "Enfriamiento":
      return "#e5e7eb";

    case "Maduración":
      return "#dcfce7";

    default:
      return "#f3f4f6";
  }
}

function StageTimeline({
  stageHistory
}) {
  return (
    <div
      style={{
        background:
          "#ffffff",
        padding:
          "20px",
        borderRadius:
          "10px"
      }}
    >
      <h2>
        Evolución del
        Proceso
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection:
            "column",
          gap: "10px"
        }}
      >
        {stageHistory.map(
          (item) => (
            <div
              key={item.day}
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap: "15px",
                padding:
                  "10px",
                borderRadius:
                  "8px",
                background:
                  getStageColor(
                    item.stage
                  )
              }}
            >
              <strong>
                Día{" "}
                {item.day}
              </strong>

              <span>
                {
                  item.temperature
                }
                °C
              </span>

              <span>
                {
                  item.stage
                }
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default StageTimeline;