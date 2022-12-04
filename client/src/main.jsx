import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-sdogc8omrlj0alk4.us.auth0.com"
    clientId="bTnSQS1lFEQS7pO6Cz4lNAkQvqXgo0Qh"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
