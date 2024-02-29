const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    farm_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'farmers',
        required:true
    },
   title:String,
    date:Date,
    Scheme:String,
    endDate:Date,
    contents:{
        type:String,
        required:true
    },
    category:String
 
});
module.exports=mongoose.model('compensations',Schema)

