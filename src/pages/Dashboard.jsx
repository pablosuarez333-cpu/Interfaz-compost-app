import { useMemo } from "react";

import { useCompost } from "../context/CompostContext";

import DashboardCards from "../components/Dashboard/DashboardCards";
import QuickStats from "../components/Dashboard/QuickStats";
import ProcessSummary from "../components/Dashboard/ProcessSummary";

import {
  getCurrentTemperature,
  getMaximumTemperature,
  getAverageTemperature,
  getLotMeasurements
} from "../services/temperatureService";

import {
  determineStage
} from "../services/stageService";

function Dashboard() {
  const {
    lots,
    measurements,
    events
  } = useCompost();

  const lotsSummary =
    useMemo(() => {
      return lots.map((lot) => {
        const lotMeasurements =
          getLotMeasurements(
            measurements,
            lot.id
          );

        return {
          id: lot.id,
          name: lot.name,
          currentTemperature:
            getCurrentTemperature(
              measurements,
              lot.id
            ),
          maximumTemperature:
            getMaximumTemperature(
              measurements,
              lot.id
            ),
          averageTemperature:
            getAverageTemperature(
              measurements,
              lot.id
            ),
          stage:
            determineStage(
              lotMeasurements
            )
        };
      });
    }, [
      lots,
      measurements
    ]);

  const hottestLotData =
    lotsSummary.reduce(
      (previous, current) => {
        if (
          current.maximumTemperature >
          previous.maximumTemperature
        ) {
          return current;
        }

        return previous;
      },
      lotsSummary[0]
    );

  return (
    <div>
      <h1>Dashboard</h1>

      <DashboardCards
        activeLots={lots.length}
        totalMeasurements={
          measurements.length
        }
        totalEvents={events.length}
      />

      <QuickStats
        lotsSummary={
          lotsSummary
        }
      />

      <ProcessSummary
        hottestLot={
          hottestLotData?.name ??
          "Sin datos"
        }
        highestTemperature={
          hottestLotData?.maximumTemperature ??
          0
        }
        totalEvents={
          events.length
        }
      />
    </div>
  );
}

export default Dashboard;