import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://auth.employeeapp.app",
  realm: "employee-realm", // change if you created a different realm
  clientId: "employee-frontend", // public client
});

export default keycloak;
