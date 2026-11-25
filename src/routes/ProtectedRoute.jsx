
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p style={{ padding: 30 }}>Verificando sesión...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
