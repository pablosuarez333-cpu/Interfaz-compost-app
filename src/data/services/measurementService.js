import { supabase } from "../lib/supabase";

// Fecha local (AAAA-MM-DD) a partir de un instante guardado en Supabase
function toLocalDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-CA");
}

// Días transcurridos entre el inicio del lote y la fecha de la medición
export function calculateDay(startDate, date) {
  if (!startDate || !date) return null;

  const [sy, sm, sd] = startDate.split("-").map(Number);
  const [y, m, d] = date.split("-").map(Number);

  return Math.round(
    (Date.UTC(y, m - 1, d) - Date.UTC(sy, sm - 1, sd)) / 86400000
  );
}

function toNumberOrNull(value) {
  return value === null || value === undefined ? null : Number(value);
}

// Fila de Supabase -> objeto que usa la interfaz (el campo "day" lo calcula el contexto)
function fromDb(row) {
  return {
    id: row.id,
    lotId: row.lot_id,
    date: toLocalDate(row.recorded_at),
    temperature: toNumberOrNull(row.temperature),
    humidity: toNumberOrNull(row.humidity),
    ph: toNumberOrNull(row.ph),
    notes: row.notes ?? "",
    createdAt: row.created_at,
  };
}

export const measurementService = {
  async list() {
    const { data, error } = await supabase
      .from("measurements")
      .select("*")
      .order("recorded_at", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map(fromDb);
  },

  async create(userId, values) {
    // Se guarda al mediodía para que la fecha no cambie por la zona horaria
    const recordedAt = new Date(`${values.date}T12:00:00`).toISOString();

    const { data, error } = await supabase
      .from("measurements")
      .insert({
        lot_id: values.lotId,
        user_id: userId,
        recorded_at: recordedAt,
        temperature: values.temperature,
        humidity: values.humidity,
        ph: values.ph,
        notes: (values.notes ?? "").trim(),
      })
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async remove(id) {
    const { error } = await supabase
      .from("measurements")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
