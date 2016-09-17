var mongoose = require('mongoose');

var certificateSchema= new mongoose.Schema({
    certificateid  : String,
    certificatename: String,
    certificatedesc: String,
    certificateimg : String

});



module.exports = mongoose.model('certificate',certificateSchema);