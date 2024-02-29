const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    count:{
        type:Number
    },
    description:{
        type:String
    },
    farm_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'farmers',
        required:true
    },
    rating:{

        type:Number,
        default:0

    },
    image:Object
})

module.exports=mongoose.model('products',productSchema)