const mongoose = require('mongoose');
const {Schema} = mongoose; //equal to const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleID: String

});

mongoose.model('user', userSchema);
