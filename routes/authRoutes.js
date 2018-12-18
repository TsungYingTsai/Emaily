const passport = require('passport'); // NPM's passport library

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );

    app.get('/auth/google/callback', passport.authenticate('google')); // excahnge the code with Google

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user); // empty
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};
