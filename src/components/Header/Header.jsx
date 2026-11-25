
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <header
      style={{
        minHeight: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #dcdcdc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2 style={{ margin: 0, color: "#1f2937" }}>
          Plataforma de Monitoreo de Compostaje
        </h2>
        <small style={{ color: "#6b7280" }}>
          Seguimiento Experimental
        </small>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ color: "#6b7280", fontSize: 14 }}>
          {user?.user_metadata?.full_name || user?.email}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#1f4f46",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "10px 14px",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;
