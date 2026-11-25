import { Link } from "react-router-dom";

import LotStatus from "./LotStatus";

function LotTable({ lots, onEdit, onDelete }) {
  const hasActions = Boolean(onEdit || onDelete);

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: "20px",
        overflowX: "auto"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse"
        }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Volumen</th>
            <th>Detalle</th>
            {hasActions && <th>Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {lots.map((lot) => (
            <tr key={lot.id}>
              <td>{lot.name}</td>

              <td>{lot.type || "—"}</td>

              <td>
                <LotStatus
                  status={lot.status}
                />
              </td>

              <td>
                {lot.volume === null
                  ? "—"
                  : `${lot.volume} m³`}
              </td>

              <td>
                <Link
                  to={`/lots/${lot.id}`}
                >
                  Abrir
                </Link>
              </td>

              {hasActions && (
                <td>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(lot)}
                    >
                      Editar
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(lot)}
                      style={{
                        marginLeft: "8px",
                        color: "#b91c1c"
                      }}
                    >
                      Eliminar
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LotTable;
