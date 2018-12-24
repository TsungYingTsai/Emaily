const passport = require('passport'); // NPM's passport library

module.exports = (app) => {
    app.get(
        '/auth/google',
        passport.authenticate('google',{
            scope: ['profile','email']
        })
    );
    // after authenticate this middleware, the system is not told what to do next, and thst is why system show 'Cannot GET /aut/google/callback'
    // do need another request to continue on next step
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys'); // why I am here at 5000 can access to 3000 ??
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
};
