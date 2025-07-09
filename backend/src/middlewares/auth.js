require("dotenv").config();

const config = {
  auth0Logout: true,
  secret:
    process.env.SESSION_SECRET || "replace-with-a-very-long-random-string",
  baseURL: process.env.BASE_URL || "http://localhost:8000",
  clientID: process.env.AUTH0_CLIENT_ID || "uVRDwUfGkFiYGDRWot6ByieuLWNVhtId",
  issuerBaseURL:
    process.env.AUTH0_ISSUER_BASE_URL ||
    "https://dev-e7uxuudwsqqup47u.us.auth0.com",
};

module.exports = { config };
