import { useState } from "react";

import { calculateDay } from "../../services/measurementService";

function todayLocal() {
  return new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD en hora local
}

const EMPTY_VALUES = {
  temperature: "",
  humidity: "",
  ph: "",
  notes: ""
};

function MeasurementForm({
  lots,
  onSubmit
}) {
  const [lotId, setLotId] =
    useState("");

  const [date, setDate] =
    useState(todayLocal());

  const [values, setValues] =
    useState(EMPTY_VALUES);

  const [error, setError] =
    useState("");

  const [saved, setSaved] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const selectedLot = lots.find(
    (lot) => lot.id === lotId
  );

  const day = selectedLot
    ? calculateDay(
        selectedLot.startDate,
        date
      )
    : null;

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setSaved(false);

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSaved(false);

    if (!lotId) {
      setError(
        "Seleccione un lote."
      );
      return;
    }

    if (!date) {
      setError(
        "Seleccione la fecha de la medición."
      );
      return;
    }

    if (date > todayLocal()) {
      setError(
        "La fecha no puede ser futura."
      );
      return;
    }

    if (day < 0) {
      setError(
        `La fecha es anterior al inicio del lote (${selectedLot.startDate}).`
      );
      return;
    }

    if (values.temperature === "") {
      setError(
        "La temperatura es obligatoria."
      );
      return;
    }

    const temperature = Number(
      values.temperature
    );

    if (
      temperature < -20 ||
      temperature > 120
    ) {
      setError(
        "La temperatura debe estar entre -20 y 120 °C."
      );
      return;
    }

    const humidity =
      values.humidity === ""
        ? null
        : Number(values.humidity);

    if (
      humidity !== null &&
      (humidity < 0 ||
        humidity > 100)
    ) {
      setError(
        "La humedad debe estar entre 0 y 100 %."
      );
      return;
    }

    const ph =
      values.ph === ""
        ? null
        : Number(values.ph);

    if (
      ph !== null &&
      (ph < 0 || ph > 14)
    ) {
      setError(
        "El pH debe estar entre 0 y 14."
      );
      return;
    }

    setSaving(true);

    try {
      await onSubmit({
        lotId,
        date,
        temperature,
        humidity,
        ph,
        notes: values.notes
      });

      // Se conserva el lote y la fecha para capturar rápido varias mediciones
      setValues(EMPTY_VALUES);
      setSaved(true);
    } catch (err) {
      setError(
        err.message ||
          "No fue posible guardar la medición."
      );
    } finally {
      setSaving(false);
    }
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.85rem",
    color: "#374151",
    marginBottom: "4px"
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px"
      }}
    >
      <h2>
        Registrar Medición
      </h2>

      {error && (
        <p
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {error}
        </p>
      )}

      {saved && (
        <p
          style={{
            color: "#166534",
            background: "#dcfce7",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          Medición guardada.
        </p>
      )}

      {lots.length === 0 && (
        <p>
          Primero crea un lote en la
          sección «Lotes».
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(200px,1fr))",
          gap: "15px"
        }}
      >
        <div>
          <label style={labelStyle}>
            Lote
          </label>

          <select
            value={lotId}
            onChange={(event) => {
              setSaved(false);
              setLotId(
                event.target.value
              );
            }}
            style={{ width: "100%" }}
          >
            <option value="">
              Seleccione lote
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
          <label style={labelStyle}>
            Fecha
          </label>

          <input
            type="date"
            value={date}
            max={todayLocal()}
            onChange={(event) => {
              setSaved(false);
              setDate(
                event.target.value
              );
            }}
            style={{ width: "100%" }}
          />

          {selectedLot &&
            day !== null && (
              <small
                style={{
                  color: "#6b7280"
                }}
              >
                Día del proceso:{" "}
                {day}
              </small>
            )}
        </div>

        <div>
          <label style={labelStyle}>
            Temperatura (°C) *
          </label>

          <input
            type="number"
            step="0.1"
            name="temperature"
            value={
              values.temperature
            }
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Humedad (%)
          </label>

          <input
            type="number"
            step="0.1"
            name="humidity"
            value={values.humidity}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            pH
          </label>

          <input
            type="number"
            step="0.1"
            name="ph"
            value={values.ph}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label style={labelStyle}>
            Notas
          </label>

          <input
            type="text"
            name="notes"
            value={values.notes}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        style={{
          marginTop: "15px"
        }}
      >
        {saving
          ? "Guardando..."
          : "Guardar"}
      </button>
    </form>
  );
}

export default MeasurementForm;
