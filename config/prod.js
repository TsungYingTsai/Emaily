// DO commiting prod.js into the heroku. Othrwise, Heroku is unable to know what the keys are when in production
// Variabl are setting at the heroku.com/settings -> Config Vars

// only for backend, not for frontend. Because these will be exposed to the outside word if used in front end
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
};
