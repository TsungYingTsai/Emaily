// Start of the App
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

//connect to mongo db
mongoose.connect(keys.mongoURI);

const app = express();

// start middleware
// this middleware will parse the body and assogn it to the req.body object when POST, PUT or DELETE from client side
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey] // can be multiple keys
    })
);
app.use(passport.initialize());
app.use(passport.session());
// end middleware

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

//In production, make sure express server can understand some routes will be asked that it miht not have specific role handler (ex/api/surveys) and behave correctly
if (process.env.NODE_ENV === 'production') {
    //Expree will serve up production assets like our main.js file, or main.css file
    app.use(express.static('client/build'));

    //Express will serve up the index.html if it doesn't recognize the route (ex./api/surveys)
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

const PORT = process.env.PORT || 5000; //If it is not defined by Heroku or standin in the developing stage, using local machine 5000
app.listen(PORT);
