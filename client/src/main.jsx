import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-4utpiwl7wai4et1g.us.auth0.com"
    clientId="d2elecAI8jrBmxvGMyj8T91ia1eGt4EH"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
