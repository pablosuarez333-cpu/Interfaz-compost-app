import { useState } from "react";

import { useCompost } from "../context/CompostContext";

import LotCard from "../components/Lots/LotCard";
import LotTable from "../components/Lots/LotTable";
import LotForm from "../components/Lots/LotForm";

function Lots() {
  const { lots, addLot, updateLot, deleteLot } = useCompost();

  const [viewMode, setViewMode] =
    useState("cards");

  // null = formulario cerrado | "new" = crear | objeto lote = editar
  const [formTarget, setFormTarget] =
    useState(null);

  const [actionError, setActionError] =
    useState("");

  async function handleSave(values) {
    if (formTarget === "new") {
      await addLot(values);
    } else {
      await updateLot(formTarget.id, values);
    }

    setFormTarget(null);
  }

  async function handleDelete(lot) {
    const confirmed = window.confirm(
      `¿Eliminar el lote "${lot.name}"?\n\n` +
        "También se borrarán sus mediciones, actividades e incidencias. " +
        "Esta acción no se puede deshacer."
    );

    if (!confirmed) return;

    setActionError("");

    try {
      await deleteLot(lot.id);
    } catch (err) {
      setActionError(
        err.message ||
          "No fue posible eliminar el lote."
      );
    }
  }

  return (
    <div>
      <h1>
        Lotes de Compostaje
      </h1>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px"
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
        >
          Tabla
        </button>

        <button
          onClick={() => {
            setActionError("");
            setFormTarget("new");
          }}
          style={{
            marginLeft: "auto",
            background: "#1f4f46",
            color: "#ffffff"
          }}
        >
          + Nuevo lote
        </button>
      </div>

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

      {formTarget && (
        <LotForm
          key={
            formTarget === "new"
              ? "new"
              : formTarget.id
          }
          initialValues={
            formTarget === "new"
              ? null
              : formTarget
          }
          submitLabel={
            formTarget === "new"
              ? "Crear lote"
              : "Guardar cambios"
          }
          onSubmit={handleSave}
          onCancel={() =>
            setFormTarget(null)
          }
        />
      )}

      {lots.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "30px",
            textAlign: "center"
          }}
        >
          <p>
            Aún no tienes lotes registrados.
          </p>
          <p>
            Crea el primero con el botón
            «+ Nuevo lote».
          </p>
        </div>
      ) : viewMode ===
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
              onEdit={(item) => {
                setActionError("");
                setFormTarget(item);
              }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <LotTable
          lots={lots}
          onEdit={(item) => {
            setActionError("");
            setFormTarget(item);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Lots;
