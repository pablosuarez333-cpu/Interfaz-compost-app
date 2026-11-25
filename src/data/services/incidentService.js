import { supabase } from "../lib/supabase";
import { toLocalDate, dateToNoonIso } from "./dateUtils";

export const INCIDENT_TYPES = [
  { value: "odor", label: "Olor" },
  { value: "dryness", label: "Sequedad" },
  { value: "excess_moisture", label: "Exceso de humedad" },
  { value: "pests", label: "Plagas" },
  { value: "temperature", label: "Temperatura anómala" },
  { value: "other", label: "Otra" },
];

export const INCIDENT_SEVERITIES = [
  { value: "low", label: "Baja" },
  { value: "medium", label: "Media" },
  { value: "high", label: "Alta" },
];

export const INCIDENT_STATUSES = {
  open: "Abierta",
  resolved: "Resuelta",
};

const TYPE_LABELS = Object.fromEntries(
  INCIDENT_TYPES.map((item) => [item.value, item.label])
);

const SEVERITY_LABELS = Object.fromEntries(
  INCIDENT_SEVERITIES.map((item) => [item.value, item.label])
);

// Fila de Supabase -> objeto que usa la interfaz (el campo "day" lo calcula el contexto)
function fromDb(row) {
  return {
    id: row.id,
    lotId: row.lot_id,
    title: row.title,
    description: row.description ?? "",
    incidentType: row.incident_type,
    typeLabel: TYPE_LABELS[row.incident_type] ?? row.incident_type,
    severity: row.severity,
    severityLabel: SEVERITY_LABELS[row.severity] ?? row.severity,
    status: row.status,
    statusLabel: INCIDENT_STATUSES[row.status] ?? row.status,
    date: toLocalDate(row.recorded_at),
    resolvedDate: toLocalDate(row.resolved_at),
    createdAt: row.created_at,
  };
}

export const incidentService = {
  async list() {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("recorded_at", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map(fromDb);
  },

  async create(userId, values) {
    const { data, error } = await supabase
      .from("incidents")
      .insert({
        lot_id: values.lotId,
        user_id: userId,
        title: values.title.trim(),
        description: (values.description ?? "").trim(),
        incident_type: values.incidentType,
        severity: values.severity,
        recorded_at: dateToNoonIso(values.date),
      })
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async setStatus(id, status) {
    const { data, error } = await supabase
      .from("incidents")
      .update({
        status,
        resolved_at:
          status === "resolved" ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async remove(id) {
    const { error } = await supabase
      .from("incidents")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
