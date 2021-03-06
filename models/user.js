var mongoose   = require('mongoose');
var plmongoose = require('passport-local-mongoose');



var userSchema = new mongoose.Schema ({
    username : { type : String, required : true ,unique : true},
    password : { type :String, required : true}
});

userSchema.plugin(plmongoose);
module.exports = mongoose.model("user",userSchema);