import { useState } from "react";

import { useCompost } from "../../context/CompostContext";
import {
  INCIDENT_TYPES,
  INCIDENT_SEVERITIES
} from "../../services/incidentService";
import { calculateDay } from "../../services/measurementService";
import { todayLocal } from "../../services/dateUtils";

const SEVERITY_COLORS = {
  low: { background: "#dcfce7", color: "#166534" },
  medium: { background: "#fef3c7", color: "#92400e" },
  high: { background: "#fee2e2", color: "#991b1b" }
};

function Badge({ children, colors }) {
  return (
    <span
      style={{
        ...colors,
        padding: "2px 10px",
        borderRadius: "999px",
        fontSize: "0.8rem",
        fontWeight: 600,
        marginRight: "8px"
      }}
    >
      {children}
    </span>
  );
}

function LotIncidents({ lotId }) {
  const {
    lots,
    incidents,
    addIncident,
    setIncidentStatus,
    deleteIncident
  } = useCompost();

  const lot = lots.find((item) => item.id === lotId);

  // Primero las abiertas; dentro de cada grupo, las más recientes arriba
  const lotIncidents = incidents
    .filter((item) => item.lotId === lotId)
    .sort((a, b) => {
      if (a.status !== b.status) return a.status === "open" ? -1 : 1;
      return b.date.localeCompare(a.date);
    });

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [incidentType, setIncidentType] = useState("other");
  const [severity, setSeverity] = useState("medium");
  const [date, setDate] = useState(todayLocal());
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const day = lot ? calculateDay(lot.startDate, date) : null;

  function openForm() {
    setError("");
    setTitle("");
    setIncidentType("other");
    setSeverity("medium");
    setDate(todayLocal());
    setDescription("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("El título de la incidencia es obligatorio.");
      return;
    }

    if (!date) {
      setError("Seleccione la fecha de la incidencia.");
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
      await addIncident({
        lotId,
        title,
        incidentType,
        severity,
        date,
        description
      });
      setShowForm(false);
    } catch (err) {
      setError(err.message || "No fue posible guardar la incidencia.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(incident) {
    setError("");

    try {
      await setIncidentStatus(
        incident.id,
        incident.status === "open" ? "resolved" : "open"
      );
    } catch (err) {
      setError(err.message || "No fue posible actualizar la incidencia.");
    }
  }

  async function handleDelete(incident) {
    const confirmed = window.confirm(
      `¿Eliminar la incidencia "${incident.title}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      await deleteIncident(incident.id);
    } catch (err) {
      setError(err.message || "No fue posible eliminar la incidencia.");
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
        <h2 style={{ margin: 0 }}>Incidencias</h2>

        {!showForm && (
          <button onClick={openForm}>+ Registrar incidencia</button>
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
              <label style={labelStyle}>Título *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box" }}
              />
            </div>

            <div>
              <label style={labelStyle}>Tipo</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                style={{ width: "100%" }}
              >
                {INCIDENT_TYPES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Severidad</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                style={{ width: "100%" }}
              >
                {INCIDENT_SEVERITIES.map((item) => (
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

      {lotIncidents.length === 0 && (
        <p style={{ color: "#6b7280" }}>
          No hay incidencias registradas para este lote.
        </p>
      )}

      {lotIncidents.map((incident) => (
        <div
          key={incident.id}
          style={{
            borderBottom: "1px solid #e5e7eb",
            marginBottom: "10px",
            paddingBottom: "10px",
            opacity: incident.status === "resolved" ? 0.7 : 1
          }}
        >
          <div style={{ marginBottom: "6px" }}>
            <Badge colors={SEVERITY_COLORS[incident.severity] ?? {}}>
              {incident.severityLabel}
            </Badge>

            <Badge
              colors={
                incident.status === "open"
                  ? { background: "#dbeafe", color: "#1e40af" }
                  : { background: "#e5e7eb", color: "#374151" }
              }
            >
              {incident.statusLabel}
            </Badge>

            <strong>{incident.title}</strong>
          </div>

          <p style={{ margin: "4px 0", color: "#6b7280" }}>
            Día {incident.day} · {incident.date} · {incident.typeLabel}
            {incident.status === "resolved" && incident.resolvedDate
              ? ` · resuelta el ${incident.resolvedDate}`
              : ""}
          </p>

          {incident.description && (
            <p style={{ margin: "4px 0", color: "#4b5563" }}>
              {incident.description}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
            <button onClick={() => handleToggle(incident)}>
              {incident.status === "open"
                ? "Marcar como resuelta"
                : "Reabrir"}
            </button>

            <button
              onClick={() => handleDelete(incident)}
              style={{ color: "#b91c1c" }}
            >
              Eliminar
            </button>
          </div>
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

export default LotIncidents;
