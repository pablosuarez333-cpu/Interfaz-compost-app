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

const CompostContext = createContext();

export function CompostProvider({ children }) {
  const { user, logout } = useAuth();
  const userId = user?.id ?? null;

  // Lotes: vienen de Supabase
  const [lots, setLots] = useState([]);
  const [loadedUserId, setLoadedUserId] = useState(null);
  const [lotsError, setLotsError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Mediciones y eventos: siguen en memoria hasta las Fases 4 y 5
  const [measurements, setMeasurements] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!userId) {
      setLots([]);
      setMeasurements([]);
      setEvents([]);
      setLoadedUserId(null);
      setLotsError("");
      return;
    }

    let cancelled = false;
    setLotsError("");

    lotService
      .list()
      .then((data) => {
        if (cancelled) return;
        setLots(data);
        setLoadedUserId(userId);
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("Error cargando lotes:", error);
        setLotsError(error.message || "No fue posible cargar tus lotes.");
      });

    return () => {
      cancelled = true;
    };
  }, [userId, reloadKey]);

  const retryLoad = () => {
    setLotsError("");
    setLoadedUserId(null);
    setReloadKey((key) => key + 1);
  };

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
    setMeasurements((prev) => prev.filter((m) => m.lotId !== id));
  }, []);

  const addMeasurement = (measurement) => {
    setMeasurements((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...measurement,
      },
    ]);
  };

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...event,
      },
    ]);
  };

  const value = useMemo(
    () => ({
      lots,
      measurements,
      events,
      setLots,
      setMeasurements,
      setEvents,
      addLot,
      updateLot,
      deleteLot,
      addMeasurement,
      addEvent,
    }),
    [lots, measurements, events, addLot, updateLot, deleteLot]
  );

  // Pantallas de estado: evitan mostrar datos incompletos o una pantalla en blanco
  let gate = null;

  if (userId && lotsError) {
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
          <p>{lotsError}</p>
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
