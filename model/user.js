const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:3
    },
    email:{
        type: String,
        required:true,
        max:255
    },
    password:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    permissions:{
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('user', userSchema);