// Fecha de hoy (AAAA-MM-DD) en hora local
export function todayLocal() {
  return new Date().toLocaleDateString("en-CA");
}

// Fecha local (AAAA-MM-DD) a partir de un instante guardado en Supabase
export function toLocalDate(isoString) {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString("en-CA");
}

// Se guarda al mediodía para que la fecha no cambie por la zona horaria
export function dateToNoonIso(date) {
  return new Date(`${date}T12:00:00`).toISOString();
}
