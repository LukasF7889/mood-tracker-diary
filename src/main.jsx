import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { EntryProvider } from "./context/EntryContext.jsx";
import { LocalStorageProvider } from "./context/LocalStorageContext.jsx";

createRoot(document.getElementById("root")).render(
  <LocalStorageProvider>
    <ModalProvider>
      <EntryProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </EntryProvider>
    </ModalProvider>
  </LocalStorageProvider>
);
