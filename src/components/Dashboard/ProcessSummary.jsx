function ProcessSummary({
  hottestLot,
  highestTemperature,
  totalEvents
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "25px",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.08)"
      }}
    >
      <h2>
        Resumen General del Proceso
      </h2>

      <p>
        Lote con mayor temperatura
        registrada:
        {" "}
        <strong>
          {hottestLot}
        </strong>
      </p>

      <p>
        Temperatura máxima
        observada:
        {" "}
        <strong>
          {highestTemperature}
          °C
        </strong>
      </p>

      <p>
        Eventos registrados:
        {" "}
        <strong>
          {totalEvents}
        </strong>
      </p>

      <p>
        El sistema se encuentra en
        fase experimental con
        seguimiento manual de
        variables fisicoquímicas.
      </p>
    </div>
  );
}

export default ProcessSummary;