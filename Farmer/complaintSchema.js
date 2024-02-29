const mongoose=require('mongoose')

const cSchema=mongoose.Schema({
    name:{
        type:String
    },
    category:{
        type:String
    },
    contact:{
        type:Number,
        required:true
    },
    village:{
        type:String
    },
    district:{
        type:String
    },
    
    description:{
        type:String
    },
    farm_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'farmers',
        required:true
    },
    date:Date
})

module.exports=mongoose.model('complaints',cSchema)