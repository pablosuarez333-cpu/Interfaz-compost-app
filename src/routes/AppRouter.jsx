
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/Layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Lots from "../pages/Lots";
import LotDetails from "../pages/LotDetails";
import Measurements from "../pages/Measurements";
import Reports from "../pages/Reports";
import AboutProject from "../pages/AboutProject";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/lots" element={<Lots />} />
          <Route path="/lots/:lotId" element={<LotDetails />} />
          <Route path="/measurements" element={<Measurements />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/about" element={<AboutProject />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
