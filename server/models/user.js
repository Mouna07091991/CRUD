const mongoose = require("mongoose");

const user = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    name: String,
    lastname: String,
    todos: [{
        desc: String,
        done: Boolean
    }]

})

module.exports = user;