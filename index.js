// Start of the App
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi:'there'});
});

const PORT = process.env.PORT || 5000; //If it is not defined by Heroku or standin in the developing stage, using local machine 5000
app.listen(PORT);
