const mongoose= require("mongoose");

const deliverySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    contact:{
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
   
    licence:{
        type:Object,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    isactive:{
        type:Boolean,
        default:false
    }
});
module.exports=mongoose.model('deliveryagents',deliverySchema)

