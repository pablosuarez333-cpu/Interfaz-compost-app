import { useState } from "react";

import { LOT_STATUS_OPTIONS } from "../../services/lotService";

function todayLocal() {
  return new Date().toLocaleDateString("en-CA"); // AAAA-MM-DD en hora local
}

function LotForm({ initialValues, onSubmit, onCancel, submitLabel }) {
  const isEditing = Boolean(initialValues);

  const [form, setForm] = useState({
    name: initialValues?.name ?? "",
    type: initialValues?.type ?? "",
    volume: initialValues?.volume ?? "",
    startDate: initialValues?.startDate ?? todayLocal(),
    status: initialValues?.status ?? "Activo",
    description: initialValues?.description ?? "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("El nombre del lote es obligatorio.");
      return;
    }

    if (!form.startDate) {
      setError("La fecha de inicio es obligatoria.");
      return;
    }

    if (form.volume !== "" && Number(form.volume) < 0) {
      setError("El volumen no puede ser negativo.");
      return;
    }

    setSaving(true);

    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "No fue posible guardar el lote.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.card}>
      <h2 style={{ marginTop: 0 }}>
        {isEditing ? "Editar lote" : "Nuevo lote"}
      </h2>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.grid}>
        <div>
          <label style={styles.label}>Nombre *</label>
          <input
            style={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label style={styles.label}>Tipo</label>
          <input
            style={styles.input}
            name="type"
            value={form.type}
            onChange={handleChange}
            list="lot-types"
            placeholder="Cajón, Pila..."
          />
          <datalist id="lot-types">
            <option value="Cajón" />
            <option value="Pila" />
          </datalist>
        </div>

        <div>
          <label style={styles.label}>Volumen (m³)</label>
          <input
            style={styles.input}
            name="volume"
            type="number"
            min="0"
            step="0.01"
            value={form.volume}
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={styles.label}>Fecha de inicio *</label>
          <input
            style={styles.input}
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            required
          />
        </div>

        {isEditing && (
          <div>
            <label style={styles.label}>Estado</label>
            <select
              style={styles.input}
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {LOT_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <label style={styles.label}>Descripción</label>
      <textarea
        style={{ ...styles.input, minHeight: 70, resize: "vertical" }}
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="submit"
          disabled={saving}
          style={{ background: "#1f4f46", color: "#fff" }}
        >
          {saving ? "Guardando..." : submitLabel}
        </button>

        <button type="button" onClick={onCancel} disabled={saving}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 15,
  },
  label: {
    display: "block",
    marginBottom: 6,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 10,
    marginBottom: 16,
    border: "1px solid #d1d5db",
    borderRadius: 7,
    fontSize: 15,
    fontFamily: "inherit",
  },
  error: {
    color: "#b91c1c",
    background: "#fee2e2",
    padding: 10,
    borderRadius: 6,
  },
};

export default LotForm;
