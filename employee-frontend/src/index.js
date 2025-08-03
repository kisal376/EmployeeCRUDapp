import React from "react";
import ReactDOM from "react-dom/client"; // ✅ use 'client' here
import App from "./App";
import keycloak from "./components/keycloak";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
if (authenticated) {
  console.log("Access Token:", keycloak.token);

  root.render(
    // ✅ use root.render instead of ReactDOM.render
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Refresh token every 6 seconds
  setInterval(() => {
    keycloak.updateToken(70).catch(() => {
      keycloak.logout();
    });
  }, 6000);
} else {
  keycloak.login();
}
});
