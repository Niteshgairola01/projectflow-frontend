import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./app/providers/AppProvider.tsx";
import { AuthInitializer } from "./features/auth/providers/AuthInitializer.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AuthInitializer>
      <App />
    </AuthInitializer>
  </AppProvider>
);
