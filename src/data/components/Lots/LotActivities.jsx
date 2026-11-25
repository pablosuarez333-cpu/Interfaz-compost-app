import { useState } from "react";

import { useCompost } from "../../context/CompostContext";
import { ACTIVITY_TYPES } from "../../services/activityService";
import { calculateDay } from "../../services/measurementService";
import { todayLocal } from "../../services/dateUtils";

function LotActivities({ lotId }) {
  const { lots, events, addActivity, deleteActivity } = useCompost();

  const lot = lots.find((item) => item.id === lotId);
  const activities = events.filter((item) => item.lotId === lotId);

  const [showForm, setShowForm] = useState(false);
  const [activityType, setActivityType] = useState("watering");
  const [date, setDate] = useState(todayLocal());
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const day = lot ? calculateDay(lot.startDate, date) : null;

  function openForm() {
    setError("");
    setDate(todayLocal());
    setDescription("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Seleccione la fecha de la actividad.");
      return;
    }

    if (date > todayLocal()) {
      setError("La fecha no puede ser futura.");
      return;
    }

    if (day < 0) {
      setError(`La fecha es anterior al inicio del lote (${lot.startDate}).`);
      return;
    }

    setSaving(true);

    try {
      await addActivity({ lotId, activityType, date, description });
      setShowForm(false);
    } catch (err) {
      setError(err.message || "No fue posible guardar la actividad.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(activity) {
    const confirmed = window.confirm(
      `¿Eliminar la actividad "${activity.type}" del ${activity.date}?`
    );

    if (!confirmed) return;

    try {
      await deleteActivity(activity.id);
    } catch (err) {
      setError(err.message || "No fue posible eliminar la actividad.");
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "25px"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h2 style={{ margin: 0 }}>Actividades del Proceso</h2>

        {!showForm && (
          <button onClick={openForm}>+ Registrar actividad</button>
        )}
      </div>

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

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#f9fafb",
            padding: "15px",
            borderRadius: "8px",
            margin: "15px 0"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: "15px"
            }}
          >
            <div>
              <label style={labelStyle}>Tipo</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                style={{ width: "100%" }}
              >
                {ACTIVITY_TYPES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Fecha</label>
              <input
                type="date"
                value={date}
                max={todayLocal()}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: "100%" }}
              />
              {day !== null && (
                <small style={{ color: "#6b7280" }}>
                  Día del proceso: {day}
                </small>
              )}
            </div>
          </div>

          <label style={{ ...labelStyle, marginTop: "15px" }}>
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              minHeight: "60px",
              fontFamily: "inherit"
            }}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button type="submit" disabled={saving}>
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {activities.length === 0 && (
        <p style={{ color: "#6b7280" }}>
          Aún no hay actividades registradas para este lote.
        </p>
      )}

      {activities.map((activity) => (
        <div
          key={activity.id}
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "10px",
            paddingBottom: "10px"
          }}
        >
          <strong>
            Día {activity.day} · {activity.date}
          </strong>

          <p style={{ margin: "4px 0" }}>{activity.type}</p>

          {activity.description && (
            <p style={{ margin: "4px 0", color: "#4b5563" }}>
              {activity.description}
            </p>
          )}

          <button
            onClick={() => handleDelete(activity)}
            style={{ color: "#b91c1c" }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  color: "#374151",
  marginBottom: "4px"
};

export default LotActivities;
