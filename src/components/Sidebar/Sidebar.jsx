import { NavLink } from "react-router-dom";

const linkStyle = {
  display: "block",
  padding: "12px 16px",
  marginBottom: "6px",
  textDecoration: "none",
  borderRadius: "8px",
  color: "#e5e7eb"
};

function Sidebar() {
  return (
    <aside
      style={{
        background: "#111827",
        color: "#ffffff",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h2
        style={{
          marginBottom: "30px"
        }}
      >
        CompostLab
      </h2>

      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#1f4f46" : "transparent"
          })}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/lots"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#1f4f46" : "transparent"
          })}
        >
          Lotes
        </NavLink>

        <NavLink
          to="/measurements"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#1f4f46" : "transparent"
          })}
        >
          Mediciones
        </NavLink>

        <NavLink
          to="/reports"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#1f4f46" : "transparent"
          })}
        >
          Reportes
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => ({
            ...linkStyle,
            background: isActive ? "#1f4f46" : "transparent"
          })}
        >
          Proyecto
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;