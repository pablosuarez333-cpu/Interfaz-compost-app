import { useMemo, useState } from "react";

import { useCompost } from "../context/CompostContext";

import MeasurementForm from "../components/Measurements/MeasurementForm";
import MeasurementFilters from "../components/Measurements/MeasurementFilters";
import MeasurementTable from "../components/Measurements/MeasurementTable";

function Measurements() {
  const {
    measurements,
    lots,
    addMeasurement,
    deleteMeasurement
  } = useCompost();

  const [selectedLot, setSelectedLot] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState("");

  const [actionError, setActionError] =
    useState("");

  const filteredMeasurements =
    useMemo(() => {
      return measurements.filter(
        (measurement) => {
          const lotMatch =
            selectedLot === ""
              ? true
              : measurement.lotId ===
                selectedLot;

          const dateMatch =
            selectedDate === ""
              ? true
              : measurement.date ===
                selectedDate;

          return (
            lotMatch &&
            dateMatch
          );
        }
      );
    }, [
      measurements,
      selectedLot,
      selectedDate
    ]);

  async function handleDelete(
    measurement
  ) {
    const confirmed =
      window.confirm(
        `¿Eliminar la medición del ${measurement.date} (${measurement.temperature} °C)?\n\n` +
          "Esta acción no se puede deshacer."
      );

    if (!confirmed) return;

    setActionError("");

    try {
      await deleteMeasurement(
        measurement.id
      );
    } catch (err) {
      setActionError(
        err.message ||
          "No fue posible eliminar la medición."
      );
    }
  }

  return (
    <div>
      <h1>
        Mediciones
      </h1>

      <MeasurementForm
        lots={lots}
        onSubmit={
          addMeasurement
        }
      />

      <MeasurementFilters
        lots={lots}
        selectedLot={
          selectedLot
        }
        selectedDate={
          selectedDate
        }
        onLotChange={
          setSelectedLot
        }
        onDateChange={
          setSelectedDate
        }
      />

      {actionError && (
        <p
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "10px",
            borderRadius: "6px"
          }}
        >
          {actionError}
        </p>
      )}

      <MeasurementTable
        measurements={
          filteredMeasurements
        }
        lots={lots}
        onDelete={
          handleDelete
        }
      />
    </div>
  );
}

export default Measurements;
