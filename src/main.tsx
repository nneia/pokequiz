import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PaginationProvider } from "./contexts/PaginationContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </React.StrictMode>
);
