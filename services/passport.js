const passport = require('passport');
// whenever we make use of passport, user has signed to our application. req.user will exist
// in index.js app.use(...initialize() & session())
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys') // if js document no need to add .js in the end
const mongoose = require('mongoose')

const User = mongoose.model('user'); // look at ./models/User

passport.serializeUser((user, done) => {
    done(null,user.id);
    //user ID (unique key, assigned by Mongo) != profile.id ()
    // if they assign in other then Google id, then using profile id would not be valid( or you need to)
    // assign the variable id's in hard code. But the user.id is only one and unique

    // OAuth's 'only' purpose is to allow someone to log in. After that, we use our own internal ID's (Mongo id)
});

passport.deserializeUser((id, done) => {        //id is from user.id from serialization
    User.findById(id)
        .then((user) => {
            done(null,user);
        });
});

passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({googleID: profile.id})
            if (existingUser) {
                return done(null, existingUser);
            }
            const user = await new User({googleID: profile.id}).save()
            done(null, user);
    })
);
