window.auth0Secret = "{{ env('auth0_config_secret') }}";

// Courtesy of auth0

const { auth } = require('express-openid-connect');
const { env } = require('process');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: auth0Secret,
  baseURL: 'https://shopkeepandheroes.netlify.app',
  clientID: 'MAlEvCvQK8NWpBm22SDZPBN5gieqPbWY',
  issuerBaseURL: 'https://dev-y36uzk1n.eu.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});