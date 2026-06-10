import { useState } from "react";

import { useCompost } from "../context/CompostContext";

import LotCard from "../components/Lots/LotCard";
import LotTable from "../components/Lots/LotTable";

function Lots() {
  const { lots } = useCompost();

  const [viewMode, setViewMode] =
    useState("cards");

  return (
    <div>
      <h1>
        Lotes de Compostaje
      </h1>

      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <button
          onClick={() =>
            setViewMode("cards")
          }
        >
          Tarjetas
        </button>

        <button
          onClick={() =>
            setViewMode("table")
          }
          style={{
            marginLeft: "10px"
          }}
        >
          Tabla
        </button>
      </div>

      {viewMode ===
      "cards" ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "20px"
          }}
        >
          {lots.map((lot) => (
            <LotCard
              key={lot.id}
              lot={lot}
            />
          ))}
        </div>
      ) : (
        <LotTable lots={lots} />
      )}
    </div>
  );
}

export default Lots;