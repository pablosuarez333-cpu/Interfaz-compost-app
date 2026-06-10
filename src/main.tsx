import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CompostProvider } from "./context/CompostContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CompostProvider>
        <App />
      </CompostProvider>
    </BrowserRouter>
  </React.StrictMode>
);