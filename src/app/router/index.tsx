import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../../features/auth/pages/LoginPage";
import { PublicRoute } from "./PublicRoute";
import RegisterPage from "../../features/auth/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);
