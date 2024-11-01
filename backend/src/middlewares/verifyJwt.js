const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "http://easyerp.com/api/v1/tasks",
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
