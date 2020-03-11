const { auth } = require("express-openid-connect");

module.exports = function(app) {

  const config = {
    required: false,
    auth0Logout: true,
    baseURL: `https://localhost:${process.env.PORT}`,
    issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
    clientID: process.env.AUTH0_CLIENT_ID,
    appSessionSecret: process.env.AUTH0_SESSION_SECRET,
  };

  // auth router attaches /login, /logout, and /callback routes to the baseURL
  app.use(auth(config));

  // req.isAuthenticated is provided from the auth router
  app.get("*", (req, res, next) => {
    if (req.path.substr(0,7)==='/public') return next();
    if (req.path.substr(0,4)==='/api' && !req.isAuthenticated()) return res.status(401).send('this endpoint requires authentication');
    if (!req.isAuthenticated()) res.status(401).send('Not logged in. Please visit <a href="/login">/login</a> to log in.');
    next();
    // res.send(req.isAuthenticated() ? "Logged in" : "Logged out");
  });

}