var mongoose   = require('mongoose');




var memberSchema = new mongoose.Schema ({
   username     : String,
   name         : String,
   image        : String,   
   github       : String,
   twitter      : String,
   gmail        : String,
   badges       : [{ badge1 : String,
                     badge2 : String,
                     badge3 : String,
                     badge4 : String,
                     badge5 : String    

                    }],
   jobtitle     : String,
   location     : String,
   achievements : String,
   skills       : String,
   certificates : [{ certificate1 : String,
                     certificate2 : String,
                     certificate3 : String,
                     certificate4 : String,
                     certificate5 : String,
                     certificate6 : String

                    }]
});


module.exports = mongoose.model("member",memberSchema);