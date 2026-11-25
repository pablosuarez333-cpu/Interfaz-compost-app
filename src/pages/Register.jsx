
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        fullName,
        email,
        password,
      });

      if (result.session) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError(err.message || "No fue posible crear la cuenta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>CompostLab</h1>
        <p style={styles.subtitle}>Crear una cuenta</p>

        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Nombre completo</label>
        <input
          style={styles.input}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />

        <label style={styles.label}>Correo electrónico</label>
        <input
          style={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <label style={styles.label}>Contraseña</label>
        <input
          style={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete="new-password"
        />

        <button disabled={loading} style={styles.button}>
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p style={styles.footer}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fa",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 35,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,.08)",
  },
  title: {
    textAlign: "center",
    color: "#1f4f46",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 28,
  },
  label: {
    display: "block",
    marginBottom: 7,
    fontWeight: 600,
    color: "#374151",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 12,
    marginBottom: 18,
    border: "1px solid #d1d5db",
    borderRadius: 7,
    fontSize: 15,
  },
  button: {
    width: "100%",
    padding: 13,
    background: "#1f4f46",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    cursor: "pointer",
    fontWeight: 600,
  },
  error: {
    color: "#b91c1c",
    background: "#fee2e2",
    padding: 10,
    borderRadius: 6,
  },
  footer: {
    textAlign: "center",
    marginTop: 22,
    color: "#6b7280",
  },
};

export default Register;
