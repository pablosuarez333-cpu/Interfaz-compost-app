import { useMemo } from "react";

import { useCompost } from "../context/CompostContext";

import {
  getCurrentTemperature,
  getMaximumTemperature,
  getAverageTemperature
} from "../services/temperatureService";

import {
  determineStage
} from "../services/stageService";

function Reports() {
  const {
    lots,
    measurements,
    events
  } = useCompost();

  const reportData = useMemo(() => {
    return lots.map((lot) => {
      const lotMeasurements =
        measurements.filter(
          (measurement) =>
            measurement.lotId ===
            lot.id
        );

      const latest =
        lotMeasurements.at(-1);

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
        stage: latest
          ? determineStage(
              latest.temperature,
              latest.day
            )
          : "Sin datos",
        measurements:
          lotMeasurements.length
      };
    });
  }, [lots, measurements]);

  return (
    <div>
      <h1>
        Reportes e Indicadores
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {reportData.map((item) => (
          <div
            key={item.id}
            style={{
              background:
                "#ffffff",
              padding: "20px",
              borderRadius:
                "10px"
            }}
          >
            <h2>
              {item.name}
            </h2>

            <p>
              Temperatura
              actual:
              {" "}
              {
                item.currentTemperature
              }
              °C
            </p>

            <p>
              Temperatura
              máxima:
              {" "}
              {
                item.maximumTemperature
              }
              °C
            </p>

            <p>
              Temperatura
              promedio:
              {" "}
              {
                item.averageTemperature
              }
              °C
            </p>

            <p>
              Etapa:
              {" "}
              {item.stage}
            </p>

            <p>
              Mediciones:
              {" "}
              {
                item.measurements
              }
            </p>
          </div>
        ))}
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
          Estadísticas
          Generales
        </h2>

        <p>
          Lotes
          monitoreados:
          {" "}
          {lots.length}
        </p>

        <p>
          Mediciones
          registradas:
          {" "}
          {
            measurements.length
          }
        </p>

        <p>
          Eventos
          registrados:
          {" "}
          {events.length}
        </p>
      </div>
    </div>
  );
}

export default Reports;