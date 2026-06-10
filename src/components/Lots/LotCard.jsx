import { Link } from "react-router-dom";

import LotStatus from "./LotStatus";

function LotCard({ lot }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.08)"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center"
        }}
      >
        <h2>{lot.name}</h2>

        <LotStatus
          status={lot.status}
        />
      </div>

      <p>
        <strong>Tipo:</strong>
        {" "}
        {lot.type}
      </p>

      <p>
        <strong>Volumen:</strong>
        {" "}
        {lot.volume}
        {" "}
        m³
      </p>

      <p>
        <strong>Inicio:</strong>
        {" "}
        {lot.startDate}
      </p>

      <p>{lot.description}</p>

      <Link
        to={`/lots/${lot.id}`}
      >
        Ver detalle
      </Link>
    </div>
  );
}

export default LotCard;