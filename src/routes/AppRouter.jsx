import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";

import Dashboard from "../pages/Dashboard";
import Lots from "../pages/Lots";
import LotDetails from "../pages/LotDetails";
import Measurements from "../pages/Measurements";
import Reports from "../pages/Reports";
import AboutProject from "../pages/AboutProject";

function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lots" element={<Lots />} />
        <Route path="/lots/:lotId" element={<LotDetails />} />
        <Route path="/measurements" element={<Measurements />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/about" element={<AboutProject />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;