import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useAuth } from "./AuthContext";
import { lotService } from "../services/lotService";
import {
  measurementService,
  calculateDay,
} from "../services/measurementService";
import { activityService } from "../services/activityService";
import { incidentService } from "../services/incidentService";

const CompostContext = createContext();

// Ordena por fecha y, si coincide, por orden de creación
function byDate(a, b) {
  return (
    a.date.localeCompare(b.date) ||
    a.createdAt.localeCompare(b.createdAt)
  );
}

export function CompostProvider({ children }) {
  const { user, logout } = useAuth();
  const userId = user?.id ?? null;

  // Todo viene de Supabase
  const [lots, setLots] = useState([]);
  const [rawMeasurements, setRawMeasurements] = useState([]);
  const [rawActivities, setRawActivities] = useState([]);
  const [rawIncidents, setRawIncidents] = useState([]);

  const [loadedUserId, setLoadedUserId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!userId) {
      setLots([]);
      setRawMeasurements([]);
      setRawActivities([]);
      setRawIncidents([]);
      setLoadedUserId(null);
      setLoadError("");
      return;
    }

    let cancelled = false;
    setLoadError("");

    Promise.all([
      lotService.list(),
      measurementService.list(),
      activityService.list(),
      incidentService.list(),
    ])
      .then(([lotsData, measurementsData, activitiesData, incidentsData]) => {
        if (cancelled) return;
        setLots(lotsData);
        setRawMeasurements(measurementsData);
        setRawActivities(activitiesData);
        setRawIncidents(incidentsData);
        setLoadedUserId(userId);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Error cargando datos:", error);
        setLoadError(error.message || "No fue posible cargar tus datos.");
      });

    return () => {
      cancelled = true;
    };
  }, [userId, reloadKey]);

  const retryLoad = () => {
    setLoadError("");
    setLoadedUserId(null);
    setReloadKey((key) => key + 1);
  };

  // A cada registro se le agrega el "día" del proceso (días desde el inicio del lote)
  const startByLot = useMemo(
    () => new Map(lots.map((lot) => [lot.id, lot.startDate])),
    [lots]
  );

  const withDay = useCallback(
    (item) => ({
      ...item,
      day: calculateDay(startByLot.get(item.lotId), item.date) ?? 0,
    }),
    [startByLot]
  );

  const measurements = useMemo(
    () => rawMeasurements.map(withDay).sort(byDate),
    [rawMeasurements, withDay]
  );

  // "events" = actividades de todos los lotes (se conserva el nombre para
  // que el Dashboard y Reportes sigan funcionando)
  const events = useMemo(
    () => rawActivities.map(withDay).sort(byDate),
    [rawActivities, withDay]
  );

  const incidents = useMemo(
    () => rawIncidents.map(withDay).sort(byDate),
    [rawIncidents, withDay]
  );

  // ---------- Lotes ----------
  const addLot = useCallback(
    async (values) => {
      if (!userId) throw new Error("No hay una sesión activa.");

      const created = await lotService.create(userId, values);
      setLots((prev) => [...prev, created]);
      return created;
    },
    [userId]
  );

  const updateLot = useCallback(async (id, values) => {
    const updated = await lotService.update(id, values);
    setLots((prev) => prev.map((lot) => (lot.id === id ? updated : lot)));
    return updated;
  }, []);

  const deleteLot = useCallback(async (id) => {
    await lotService.remove(id);
    setLots((prev) => prev.filter((lot) => lot.id !== id));
    // La base de datos borra todo lo relacionado en cascada; aquí se limpia la copia local
    setRawMeasurements((prev) => prev.filter((m) => m.lotId !== id));
    setRawActivities((prev) => prev.filter((a) => a.lotId !== id));
    setRawIncidents((prev) => prev.filter((i) => i.lotId !== id));
  }, []);

  // ---------- Mediciones ----------
  const addMeasurement = useCallback(
    async (values) => {
      if (!userId) throw new Error("No hay una sesión activa.");

      const created = await measurementService.create(userId, values);
      setRawMeasurements((prev) => [...prev, created]);
      return created;
    },
    [userId]
  );

  const deleteMeasurement = useCallback(async (id) => {
    await measurementService.remove(id);
    setRawMeasurements((prev) => prev.filter((m) => m.id !== id));
  }, []);

  // ---------- Actividades ----------
  const addActivity = useCallback(
    async (values) => {
      if (!userId) throw new Error("No hay una sesión activa.");

      const created = await activityService.create(userId, values);
      setRawActivities((prev) => [...prev, created]);
      return created;
    },
    [userId]
  );

  const deleteActivity = useCallback(async (id) => {
    await activityService.remove(id);
    setRawActivities((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // ---------- Incidencias ----------
  const addIncident = useCallback(
    async (values) => {
      if (!userId) throw new Error("No hay una sesión activa.");

      const created = await incidentService.create(userId, values);
      setRawIncidents((prev) => [...prev, created]);
      return created;
    },
    [userId]
  );

  const setIncidentStatus = useCallback(async (id, status) => {
    const updated = await incidentService.setStatus(id, status);
    setRawIncidents((prev) =>
      prev.map((incident) => (incident.id === id ? updated : incident))
    );
    return updated;
  }, []);

  const deleteIncident = useCallback(async (id) => {
    await incidentService.remove(id);
    setRawIncidents((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      lots,
      measurements,
      events,
      incidents,
      setLots,
      addLot,
      updateLot,
      deleteLot,
      addMeasurement,
      deleteMeasurement,
      addActivity,
      deleteActivity,
      addIncident,
      setIncidentStatus,
      deleteIncident,
    }),
    [
      lots,
      measurements,
      events,
      incidents,
      addLot,
      updateLot,
      deleteLot,
      addMeasurement,
      deleteMeasurement,
      addActivity,
      deleteActivity,
      addIncident,
      setIncidentStatus,
      deleteIncident,
    ]
  );

  // Pantallas de estado: evitan mostrar datos incompletos o una pantalla en blanco
  let gate = null;

  if (userId && loadError) {
    gate = (
      <div style={{ maxWidth: 520, margin: "60px auto", padding: 24 }}>
        <div
          style={{
            background: "#fee2e2",
            color: "#7f1d1d",
            padding: 20,
            borderRadius: 10,
          }}
        >
          <h2 style={{ marginTop: 0 }}>No se pudieron cargar tus datos</h2>
          <p>{loadError}</p>
          <button onClick={retryLoad}>Reintentar</button>
          <button
            onClick={() => logout()}
            style={{ marginLeft: 10 }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    );
  } else if (userId && loadedUserId !== userId) {
    gate = <p style={{ padding: 30 }}>Cargando tus datos...</p>;
  }

  return (
    <CompostContext.Provider value={value}>
      {gate ?? children}
    </CompostContext.Provider>
  );
}

export function useCompost() {
  const context = useContext(CompostContext);

  if (!context) {
    throw new Error("useCompost debe utilizarse dentro de CompostProvider");
  }

  return context;
}
