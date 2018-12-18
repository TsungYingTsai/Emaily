const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys') // if js document no need to add .js in the end
const mongoose = require('mongoose')

const User = mongoose.model('user'); // model class

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
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
                    googleID: profile.id
                })
                .then((existingUser) => {
                    if (existingUser) {
                        done(null,existingUser);
                    } else {
                        new User({googleID: profile.id})
                            .save()
                            .then((user) => done(null,user));
                    }
                });
        })
);
