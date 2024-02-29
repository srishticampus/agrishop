const mongoose= require("mongoose");

const Schema=mongoose.Schema({
    village:{
        type:String,
        required:true
    },
   
    contact:{
        type:Number,
        required:true
    },
    
    district:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },  
    email:{
        type:String,
        unique:true,
        required:true,
       
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true
       
    },
    regNo:{
        type:Number,
        required:true
    }
});
module.exports=mongoose.model('krishibhavans',Schema)

