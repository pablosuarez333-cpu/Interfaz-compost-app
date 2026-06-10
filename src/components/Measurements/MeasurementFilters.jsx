function MeasurementFilters({
  lots,
  selectedLot,
  selectedDate,
  onLotChange,
  onDateChange
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "20px",
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <div>
        <label>Lote</label>

        <br />

        <select
          value={selectedLot}
          onChange={(event) =>
            onLotChange(event.target.value)
          }
        >
          <option value="">
            Todos
          </option>

          {lots.map((lot) => (
            <option
              key={lot.id}
              value={lot.id}
            >
              {lot.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Fecha</label>

        <br />

        <input
          type="date"
          value={selectedDate}
          onChange={(event) =>
            onDateChange(
              event.target.value
            )
          }
        />
      </div>
    </div>
  );
}

export default MeasurementFilters;