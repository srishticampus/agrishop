const mongoose= require("mongoose");

const farmerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        unique:true,
        required:true,
       
        dropDups: true
    },
    city:{
        type:String,
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
   
    password:{
        type:String,
        required:true
    },aadhar:{
        type:Number,
        required:true
    },
    village:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('farmers',farmerSchema)

