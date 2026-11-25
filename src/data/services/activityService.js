import { supabase } from "../lib/supabase";
import { toLocalDate, dateToNoonIso } from "./dateUtils";

export const ACTIVITY_TYPES = [
  { value: "turning", label: "Volteo" },
  { value: "watering", label: "Riego" },
  { value: "addition", label: "Adición / Inoculación" },
  { value: "inspection", label: "Inspección / Seguimiento" },
  { value: "other", label: "Otra" },
];

const TYPE_LABELS = Object.fromEntries(
  ACTIVITY_TYPES.map((item) => [item.value, item.label])
);

// Fila de Supabase -> objeto que usa la interfaz (el campo "day" lo calcula el contexto)
function fromDb(row) {
  return {
    id: row.id,
    lotId: row.lot_id,
    activityType: row.activity_type,
    type: TYPE_LABELS[row.activity_type] ?? row.activity_type,
    description: row.description ?? "",
    date: toLocalDate(row.recorded_at),
    createdAt: row.created_at,
  };
}

export const activityService = {
  async list() {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("recorded_at", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map(fromDb);
  },

  async create(userId, values) {
    const { data, error } = await supabase
      .from("activities")
      .insert({
        lot_id: values.lotId,
        user_id: userId,
        activity_type: values.activityType,
        description: (values.description ?? "").trim(),
        recorded_at: dateToNoonIso(values.date),
      })
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async remove(id) {
    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};
