var mongoose   = require('mongoose');


var badgeSchema = new mongoose.Schema({
    badgeid  : { type:String,required : true, unique : true },
    badgeimg : { type:String, required :true, unique : true },
    badgename : String

});

 var badge = mongoose.model("badge",badgeSchema);


module.exports = badge;