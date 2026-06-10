/*
Fuentes:

Epstein (2011)
Industrial Composting

Haug (1993)
The Practical Handbook of Compost Engineering

Las recomendaciones son
orientativas y no sustituyen
evaluaciones fisicoquímicas.
*/

function Recommendations({
  temperature,
  humidity,
  ph
}) {
  const recommendations =
    [];

  if (
    temperature !== null &&
    temperature < 40
  ) {
    recommendations.push(
      "Verificar disponibilidad de sustratos fácilmente biodegradables y evaluar necesidad de volteo."
    );
  }

  if (
    temperature > 65
  ) {
    recommendations.push(
      "Temperatura elevada. Evaluar aireación para evitar condiciones anaerobias."
    );
  }

  if (
    humidity !== null &&
    humidity < 40
  ) {
    recommendations.push(
      "Humedad baja. Considerar adición controlada de agua."
    );
  }

  if (
    humidity !== null &&
    humidity > 65
  ) {
    recommendations.push(
      "Humedad elevada. Revisar drenaje y aireación."
    );
  }

  if (
    ph !== null &&
    ph < 5.5
  ) {
    recommendations.push(
      "pH ácido. Revisar acumulación de ácidos orgánicos."
    );
  }

  if (
    ph !== null &&
    ph > 8.5
  ) {
    recommendations.push(
      "pH elevado. Vigilar pérdidas potenciales de nitrógeno por volatilización."
    );
  }

  if (
    recommendations.length ===
    0
  ) {
    recommendations.push(
      "Los indicadores actuales no muestran desviaciones significativas."
    );
  }

  return (
    <div
      style={{
        background:
          "#ffffff",
        padding:
          "20px",
        borderRadius:
          "10px"
      }}
    >
      <h2>
        Recomendaciones
      </h2>

      <ul>
        {recommendations.map(
          (
            recommendation,
            index
          ) => (
            <li
              key={index}
            >
              {
                recommendation
              }
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default Recommendations;