function Header() {
  return (
    <header
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #dcdcdc",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px"
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1f2937"
          }}
        >
          Plataforma de Monitoreo de Compostaje
        </h2>
      </div>

      <div>
        <span
          style={{
            color: "#6b7280"
          }}
        >
          Seguimiento Experimental
        </span>
      </div>
    </header>
  );
}

export default Header;