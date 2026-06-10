function getStageColor(
  stage
) {
  switch (stage) {
    case "Mesófila":
      return "#2563eb";

    case "Termófila Moderada":
      return "#ca8a04";

    case "Termófila":
      return "#dc2626";

    case "Enfriamiento":
      return "#6b7280";

    case "Maduración":
      return "#16a34a";

    default:
      return "#111827";
  }
}

function StageIndicator({
  stage
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
      <h3>
        Etapa Actual
      </h3>

      <h2
        style={{
          color:
            getStageColor(
              stage
            )
        }}
      >
        {stage}
      </h2>
    </div>
  );
}

export default StageIndicator;