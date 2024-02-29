const cart=require('./cartSchema')

//cart

const addtocart=async(req,res)=>{
   

    date=new Date()
cart.find({userid:req.body.userid,product_id:req.body.product_id}).exec().then(data=>{
    if(data.length<=0){

    const cartobj=new cart({
    
   
        product_id:req.body.product_id,
        userid:req.body.userid,
       count:req.body.count,
       date:date
    })
    cartobj.save((err,data)=>{
        if(err){
            res.json({
                status:500,
                err:err,
                message:err.message
            })
        }
        else{
            res.json({
                status:200,
                data:data,
                message:"Successfully saved"
            })
        }
    })
}
else{
    res.json({
        status:500,
       msg:"Item already added"
    })
}
}).catch(err1=>{
    res.json({
        status:500,
        err:err1,
        message:err1.message
    })
})
}


  
const deleteproduct=async(req,res)=>{
    try{
   await cart.deleteOne({_id:req.params.id})
   res.json({
    status:200,
    message:"Data removed"
   })
    }
    catch(err){ 
      res.json({
        status:404,
        message:"Error occured"
      })
    }
}
const getproductbyUserId=(req,res)=>{
 
  cart.find({userid:req.params.id}).populate('product_id')
         
           .exec()
           .then(data=>{
            res.json({
                status:200,
                msg:"Data obtained successfully",
                data:data
            })
        }).catch(err=>{
          console.log(err);
            res.json({
                status:500,
                msg:"wrong data",
                Error:err
            })
        })
    }
    
    const getproductbyid=(req,res)=>{
   
        cart.findById({_id:req.params.id}).populate('product_id')
               
                 .exec()
                 .then(data=>{
                  res.json({
                      status:200,
                      msg:"Data obtained successfully",
                      data:data
                  })
              }).catch(err=>{
                console.log(err);
                  res.json({
                      status:500,
                      msg:"wrong data",
                      Error:err
                  })
              })
          }
       
const viewcarts=async (req,res)=>{
   const result= await cart.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'product_id',
        foreignField: '_id',
        as: 'product'
      }
    },
    {
      $lookup: {
        from: 'customers',
        localField: 'userid',
        foreignField: '_id',
        as: 'user'
      }
    }
  ])
res.json({
    status:200,
    data:result
})
  }


module.exports={addtocart,getproductbyid,deleteproduct,viewcarts,getproductbyUserId}


// const result = await db.collection('cart').aggregate([
//     {
//       $lookup: {
//         from: 'product',
//         localField: 'productId',
//         foreignField: '_id',
//         as: 'product'
//       }
//     },
//     {
//       $lookup: {
//         from: 'user',
//         localField: 'userId',
//         foreignField: '_id',
//         as: 'user'
//       }
//     }
//   ]).toArray();

//   // Close the MongoDB client
//   client.close();

//   // Send the result as a response
//   res.json(result);
// } catch (err) {
//   console.error(err);
//   res.status(500).send('Internal Server Error');
// }