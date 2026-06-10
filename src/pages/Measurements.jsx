import { useMemo, useState } from "react";

import { useCompost } from "../context/CompostContext";

import MeasurementForm from "../components/Measurements/MeasurementForm";
import MeasurementFilters from "../components/Measurements/MeasurementFilters";
import MeasurementTable from "../components/Measurements/MeasurementTable";

function Measurements() {
  const {
    measurements,
    lots,
    addMeasurement
  } = useCompost();

  const [selectedLot, setSelectedLot] =
    useState("");

  const [selectedDate, setSelectedDate] =
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

      <MeasurementTable
        measurements={
          filteredMeasurements
        }
        lots={lots}
      />
    </div>
  );
}

export default Measurements;