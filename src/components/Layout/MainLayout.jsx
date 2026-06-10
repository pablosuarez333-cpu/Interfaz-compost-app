import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function MainLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh"
      }}
    >
      <Sidebar />

      <div>
        <Header />

        <main
          style={{
            padding: "24px",
            background: "#f5f7fa",
            minHeight: "calc(100vh - 70px)"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;