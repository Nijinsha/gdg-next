var mongoose   = require('mongoose');
var plmongoose = require('passport-local-mongoose');



var userSchema = new mongoose.Schema ({
    username : String,
    password : String
});

userSchema.plugin(plmongoose);
module.exports = mongoose.model("user",userSchema);