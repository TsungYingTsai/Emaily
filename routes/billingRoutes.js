const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/stripe', requireLogin, async (req,res) => {
        if (!req.user) {
            return res.status(401).send({error: 'Please log in first'});
        }

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 dollars',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();

        res.send(user);
    });
};

// When we doing POST (Request Payload) to the Express(backend), the backend does 'NOT' by default parse the request payload
// so we install mudule, , it will take the request body and applicable to the application.

// on the front end, just tell the user it wil charge 500 cents, and When work on the backend
// we are actually confirm to say we definitely charge 500 cents

// for thr arguments for post (or get, delete...etc), first if the url, last is the function, others are middlewares(can put as much as you want)
