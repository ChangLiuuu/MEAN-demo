/**
 * Created by liuchang on 9/20/17.
 */

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String
    },
    password : {
        type : String,
        required : true
    }
});

mongoose.model('User', userSchema);