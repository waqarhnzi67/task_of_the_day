const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name : { type: String, required: true },
    last_name : { type: String, required: true},
    email_address : {type: String, required: true},
    username : {type: String, required: true},
    gender : {type: String, require: true},
    date_of_birth : {type: Date, required: true},
    password: {type: String, required: true}

})

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;