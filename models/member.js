var mongoose   = require('mongoose');
var badge       = require('./badge');





var memberSchema = new mongoose.Schema ({
   username     : { type : String, required : true , unique : true },
   name         : String,
   image        : String,   
   github       : String,
   twitter      : String,
   gmail        : String,
   badges       : [{
                    type : String
                    
                   }],
   jobtitle     : String,
   location     : String,
   achievements : String,
   skills       : String,
   /*certificates : [{
                    type : mongoose.Schema.Types.certificateid,
                    ref : 'certificate'
                    }]*/
});


module.exports = mongoose.model("member",memberSchema);