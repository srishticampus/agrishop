const mongoose= require("mongoose");




const locSchema=mongoose.Schema({
    
  
    driverid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'drivers'
    },
  userid:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'customers'
  },
    date:{
        type:Date,
        required:true
    },
    arrivaldate:{
        type:Date,
        default:null
    },
    orderid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'orders'
    },
    status:{
        type:String,
        default:'Order Confirmed'

    },
    comments:{
        type:String,
        default:null
    },
    isactive:{
        type:Boolean,
        default:true
    }
});
module.exports=mongoose.model('locationupdates',locSchema)

