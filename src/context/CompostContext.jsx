import { createContext, useContext, useMemo, useState } from "react";

import lotsData from "../data/lots";
import measurementsData from "../data/measurements";
import eventsData from "../data/events";

const CompostContext = createContext();

export function CompostProvider({ children }) {
  const [lots, setLots] = useState(lotsData);
  const [measurements, setMeasurements] = useState(measurementsData);
  const [events, setEvents] = useState(eventsData);

  const addMeasurement = (measurement) => {
    setMeasurements((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...measurement
      }
    ]);
  };

  const addEvent = (event) => {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...event
      }
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
      addMeasurement,
      addEvent
    }),
    [lots, measurements, events]
  );

  return (
    <CompostContext.Provider value={value}>
      {children}
    </CompostContext.Provider>
  );
}

export function useCompost() {
  const context = useContext(CompostContext);

  if (!context) {
    throw new Error(
      "useCompost debe utilizarse dentro de CompostProvider"
    );
  }

  return context;
}