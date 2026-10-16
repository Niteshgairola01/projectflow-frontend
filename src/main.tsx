import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./app/providers/AppProvider.tsx";
import { AuthInitializer } from "./features/auth/providers/AuthInitializer.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <AuthInitializer>
        <App />
      </AuthInitializer>
    </AppProvider>
  </StrictMode>
);
