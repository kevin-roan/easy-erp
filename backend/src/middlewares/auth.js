const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: "http://localhost:8000",
  clientID: "tlml29ifmAoAGLZz5v1inlMAP7oChSQK",
  issuerBaseURL: "https://dev-e7uxuudwsqqup47u.us.auth0.com",
};

module.exports = { config };
