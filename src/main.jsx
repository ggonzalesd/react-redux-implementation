import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { JournalApp } from "./JournalApp.jsx";
import "./styles.css";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Configuración del store */}
    <Provider store={store}>
      {/* Configuración para el uso de rutas en navegador */}
      <BrowserRouter>
        <JournalApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
