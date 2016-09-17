var mongoose   = require('mongoose');


var badgeSchema = new mongoose.Schema({
    badgeid  : String,
    badgeimg : String,
    badgetxt : String

});


module.exports = mongoose.model("badge",badgeSchema);