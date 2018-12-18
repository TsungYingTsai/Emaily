// keys.js - figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') {
    // in production stage
    module.exports = require('./prod')
} else {
    // in developing stage
    module.exports = require('./dev');
}
