function MeasurementTable({
  measurements,
  lots
}) {
  const getLotName = (lotId) => {
    return (
      lots.find(
        (lot) => lot.id === lotId
      )?.name || "N/D"
    );
  };

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        overflowX: "auto"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse"
        }}
      >
        <thead>
          <tr>
            <th>Día</th>
            <th>Fecha</th>
            <th>Lote</th>
            <th>Temperatura</th>
            <th>Humedad</th>
            <th>pH</th>
          </tr>
        </thead>

        <tbody>
          {measurements.map(
            (measurement) => (
              <tr
                key={
                  measurement.id
                }
              >
                <td>
                  {
                    measurement.day
                  }
                </td>

                <td>
                  {
                    measurement.date
                  }
                </td>

                <td>
                  {getLotName(
                    measurement.lotId
                  )}
                </td>

                <td>
                  {
                    measurement.temperature
                  }
                  °C
                </td>

                <td>
                  {measurement.humidity ??
                    "N/D"}
                </td>

                <td>
                  {measurement.ph ??
                    "N/D"}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {measurements.length ===
        0 && (
        <p>
          No existen
          mediciones para
          los filtros
          seleccionados.
        </p>
      )}
    </div>
  );
}

export default MeasurementTable;