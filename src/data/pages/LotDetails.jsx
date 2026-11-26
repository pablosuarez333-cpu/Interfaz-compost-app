import { useMemo } from "react";
import { useParams } from "react-router-dom";

import { useCompost } from "../context/CompostContext";

import TemperatureChart from "../components/Charts/TemperatureChart";
import HumidityChart from "../components/Charts/HumidityChart";
import PhChart from "../components/Charts/PhChart";

import {
  getCurrentTemperature,
  getMaximumTemperature,
  getAverageTemperature,
  getTemperatureSeries
} from "../services/temperatureService";

import {
  determineStage
} from "../services/stageService";

import LotActivities from "../components/Lots/LotActivities";
import LotIncidents from "../components/Lots/LotIncidents";

function formatTemp(value) {
  return value === null || value === undefined ? "—" : `${value} °C`;
}

function LotDetails() {
  const { lotId } = useParams();

  const {
    lots,
    measurements
  } = useCompost();

  const lot = lots.find(
    (item) => item.id === lotId
  );

  const lotMeasurements =
    useMemo(
      () =>
        measurements.filter(
          (measurement) =>
            measurement.lotId ===
            lotId
        ),
      [measurements, lotId]
    );

  const temperatureData =
    getTemperatureSeries(
      measurements,
      lotId
    );

  const humidityData =
    lotMeasurements.map(
      (measurement) => ({
        day:
          measurement.day,
        humidity:
          measurement.humidity
      })
    );

  const phData =
    lotMeasurements.map(
      (measurement) => ({
        day:
          measurement.day,
        ph:
          measurement.ph
      })
    );

  if (!lot) {
    return (
      <div>
        <h2>
          Lote no encontrado
        </h2>
      </div>
    );
  }

  return (
    <div>
      <h1>{lot.name}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "15px",
          marginBottom: "25px"
        }}
      >
        <div
          style={{
            background:
              "#ffffff",
            padding: "20px",
            borderRadius:
              "10px"
          }}
        >
          <h3>
            Temperatura Actual
          </h3>

          <p>
            {formatTemp(
              getCurrentTemperature(
                measurements,
                lotId
              )
            )}
          </p>
        </div>

        <div
          style={{
            background:
              "#ffffff",
            padding: "20px",
            borderRadius:
              "10px"
          }}
        >
          <h3>
            Temperatura Máxima
          </h3>

          <p>
            {formatTemp(
              getMaximumTemperature(
                measurements,
                lotId
              )
            )}
          </p>
        </div>

        <div
          style={{
            background:
              "#ffffff",
            padding: "20px",
            borderRadius:
              "10px"
          }}
        >
          <h3>
            Temperatura Promedio
          </h3>

          <p>
            {formatTemp(
              getAverageTemperature(
                measurements,
                lotId
              )
            )}
          </p>
        </div>

        <div
          style={{
            background:
              "#ffffff",
            padding: "20px",
            borderRadius:
              "10px"
          }}
        >
          <h3>
            Etapa Actual
          </h3>

          <p>
            {determineStage(lotMeasurements)}
          </p>
        </div>
      </div>

      <TemperatureChart
        data={
          temperatureData
        }
      />

      <div
        style={{
          marginTop: "25px"
        }}
      >
        <HumidityChart
          data={humidityData}
        />
      </div>

      <div
        style={{
          marginTop: "25px"
        }}
      >
        <PhChart
          data={phData}
        />
      </div>

      <div
        style={{
          background:
            "#ffffff",
          padding: "20px",
          borderRadius:
            "10px",
          marginTop: "25px"
        }}
      >
        <h2>
          Historial de
          Mediciones
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse"
          }}
        >
          <thead>
            <tr>
              <th>Día</th>
              <th>Fecha</th>
              <th>Temperatura</th>
              <th>Humedad</th>
              <th>pH</th>
            </tr>
          </thead>

          <tbody>
            {lotMeasurements.map(
              (
                measurement
              ) => (
                <tr
                  key={
                    measurement.id
                  }
                >
                  <td>
                    {
                      measurement.day
                    }
                  </td>

                  <td>
                    {
                      measurement.date
                    }
                  </td>

                  <td>
                    {
                      measurement.temperature
                    }
                    °C
                  </td>

                  <td>
                    {measurement.humidity ??
                      "N/D"}
                  </td>

                  <td>
                    {measurement.ph ??
                      "N/D"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <LotActivities lotId={lotId} />

      <LotIncidents lotId={lotId} />
    </div>
  );
}

export default LotDetails;