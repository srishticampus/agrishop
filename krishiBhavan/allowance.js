const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    village:{
        type:String,
        required:true
    },
   title:String,
    date:Date,
    category:String,
    Scheme:String,
    criteria:String,
    endDate:Date,

    district:{
        type:String,
        required:true
    },
    contents:{
        type:String,
        required:true
    }
 
});
module.exports=mongoose.model('allowances',Schema)

