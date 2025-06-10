import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import botRoutes from "../pages/bot/routes";

import Login from "../pages/main/Login";
import Home from "../pages/main/Home";
import HomeBot from "../pages/bot/Layout";
import Welcome from "../pages/main/Welcome";
import HomeBotGMB from "../pages/bot_gmb/home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<h1>regsiter</h1>} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Home />} />}
      />

      <Route
        path="/dashboard/bot-redes/*"
        element={<ProtectedRoute element={<HomeBot />} />}
      >
        {botRoutes}
      </Route>
      <Route
        path="/dashboard/bot-gmb/*"
        element={<ProtectedRoute element={<HomeBotGMB />} />}
      >
        {botRoutes}
      </Route>

      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default Router;
