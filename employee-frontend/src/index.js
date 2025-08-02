// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import keycloak from "./components/keycloak";

keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
  if (authenticated) {
     window.keycloak = keycloak;
    ReactDOM.render(<App />, document.getElementById("root"));

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
