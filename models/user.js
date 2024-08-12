const mongoose = require('mongoose');

const User = mongoose.Schema ( {
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true 
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now()
    }
})

const user =  mongoose.model('user',User)

module.exports = user


