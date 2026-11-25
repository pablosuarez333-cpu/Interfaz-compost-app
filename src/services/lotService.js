import { supabase } from "../lib/supabase";

// La base de datos guarda los estados en inglés; la interfaz los muestra en español.
const STATUS_FROM_DB = {
  active: "Activo",
  completed: "Finalizado",
  cancelled: "Cancelado",
};

const STATUS_TO_DB = Object.fromEntries(
  Object.entries(STATUS_FROM_DB).map(([dbValue, label]) => [label, dbValue])
);

export const LOT_STATUS_OPTIONS = Object.values(STATUS_FROM_DB);

// Fila de Supabase -> objeto que usa la interfaz
function fromDb(row) {
  return {
    id: row.id,
    name: row.name,
    type: row.lot_type ?? "",
    status: STATUS_FROM_DB[row.status] ?? row.status,
    startDate: row.start_date,
    description: row.description ?? "",
    volume:
      row.volume === null || row.volume === undefined
        ? null
        : Number(row.volume),
  };
}

// Valores del formulario -> columnas de Supabase
function toDb(values) {
  const volume =
    values.volume === "" || values.volume === null || values.volume === undefined
      ? null
      : Number(values.volume);

  return {
    name: values.name.trim(),
    lot_type: (values.type ?? "").trim(),
    status: STATUS_TO_DB[values.status] ?? "active",
    start_date: values.startDate,
    description: (values.description ?? "").trim(),
    volume,
  };
}

export const lotService = {
  async list() {
    const { data, error } = await supabase
      .from("lots")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data.map(fromDb);
  },

  async create(userId, values) {
    const { data, error } = await supabase
      .from("lots")
      .insert({ ...toDb(values), user_id: userId })
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async update(id, values) {
    const { data, error } = await supabase
      .from("lots")
      .update(toDb(values))
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return fromDb(data);
  },

  async remove(id) {
    const { error } = await supabase.from("lots").delete().eq("id", id);

    if (error) throw error;
  },
};
