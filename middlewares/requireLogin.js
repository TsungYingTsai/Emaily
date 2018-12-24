// Before parsing the body (middleware#2) to backend from client, we check if the user has been logged in
// right now, only used for billing case

// for the convention of naming, we use lowercase if it exists only a piece of codes or a function. Otherise, use capital for exporting class instead
module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'you must log in!'});
    }

    next();
};
// why naming next? to imply that after finishing this function, it will pass the request to the next middleware in the chain
// middleware#1 -> middleware#2
