function LotStatus({ status }) {
  const getStatusStyle = () => {
    switch (status) {
      case "Activo":
        return {
          backgroundColor: "#dcfce7",
          color: "#166534"
        };

      case "Finalizado":
        return {
          backgroundColor: "#dbeafe",
          color: "#1e40af"
        };

      default:
        return {
          backgroundColor: "#f3f4f6",
          color: "#374151"
        };
    }
  };

  return (
    <span
      style={{
        ...getStatusStyle(),
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "0.85rem",
        fontWeight: "600"
      }}
    >
      {status}
    </span>
  );
}

export default LotStatus;