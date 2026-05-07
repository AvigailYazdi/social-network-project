import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Router } from "./Router.jsx";
import { TanstackProvider } from "./QueryClientProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TanstackProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </TanstackProvider>
  </StrictMode>,
);
