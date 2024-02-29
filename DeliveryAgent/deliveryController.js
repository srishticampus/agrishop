const orderSchema = require('../Customer/orderSchema');
const deliverySchema=require('./deliveryAgentSchema')
const locationupdates=require('./locationUpdates')
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const registerDriver=(req,res)=>{

      const newDriver=new deliverySchema({
          name:req.body.name,
          location:req.body.location,
          licence:req.file,
          contact:req.body.contact,
          email:req.body.email,
          password:req.body.password
      })
      newDriver.save().then(data=>{
          res.json({
              status:200,
              msg:"Inserted successfully",
              data:data
          })
      }).catch(err=>{
          res.json({
              status:500,
              msg:"Data not Inserted",
              Error:err
          })
      })
  }
  //Driver Registration -- finished
  
  
  
  //View all Drivers
  
  const viewDrivers=(req,res)=>{
    console.log("apin");
      deliverySchema.find({isactive:true}).exec()
      .then(data=>{
        if(data.length>0){
        res.json({
            status:200,
            msg:"Data obtained successfully",
            data:data
        })
      }else{
        res.json({
          status:200,
          msg:"No Data obtained "
      })
      }
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
    
    }
    
    // view drivers finished
    
    const viewDriverReqs=(req,res)=>{
      deliverySchema.find({isactive:false}).exec()
      .then(data=>{
        if(data.length>0){
        res.json({
            status:200,
            msg:"Data obtained successfully",
            data:data
        })
      }else{
        res.json({
          status:200,
          msg:"No Data obtained "
      })
      }
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
    
    }
    //View  driver by id
    
    const viewDriverById=(req,res)=>{
      deliverySchema.findById({_id:req.params.id}).exec()
      .then(data=>{
        
        res.json({
            status:200,
            msg:"Data obtained successfully",
            data:data
        })
      
    }).catch(err=>{
        res.json({
            status:500,
            msg:"Data not Inserted",
            Error:err
        })
    })
    
    }
    
    // view Drivers finished
   //update Drivers by id
   const editDriverById=(req,res)=>{
      
    drivers.findByIdAndUpdate({_id:req.params.id},
        {
            name:req.body.name,
            gender:req.body.gender,
            location:req.body.location,
            licence:req.file,
            contact:req.body.contact,
            email:req.body.email,
      })
  .exec().then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
  //accept Drivers by id
  const acceptorderbyDriverId=async(req,res)=>{
    let date=new Date()
      console.log(req.body.driverid);

    await orderSchema.findByIdAndUpdate({_id:req.params.id},
        {
          deliverystatus:true,
          driverid:req.body.driverid
      })
  .exec().then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
    let newDriverUpdate=new locationupdates({
      driverid:req.body.driverid,
      userid:req.body.userid,

      date:date,
      orderid:req.params.id
  
    })
    await newDriverUpdate.save().then(data=>{
      console.log("data saved");
    })
    .catch(err=>{
      console.log("err on loc updates",err);
    })


  }
  
   // del drivers by id
   const deleteDriverById=(req,res)=>{
    deliverySchema.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
      
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }

//Login
const loginDriver = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    deliverySchema
      .findOne({ email: email })
      .exec()
      .then((data) => {
        if (password == data.password) {
          res.json({
            status: 200,
            msg: "Login successfully",
            data: data,
          });
        } else {
          res.json({
            status: 500,
            msg: "password Mismatch",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "User not found",
          Error: err,
        });
      });
  };
  
  //Login  --finished
//View all orders for drivers
  
  
  const viewAcceptedOrders=(req,res)=>{
    locationupdates.find({driverid:req.params.id,isactive:true}).populate('orderid').exec()
    .then(data=>{
      
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  }
//View  driver by id
    
const acceptDriverById=(req,res)=>{
  deliverySchema.findByIdAndUpdate({_id:req.params.id},{isactive:true}).exec()
  .then(data=>{
    
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}

//View all Drivers
  
const viewOrdersforDelivery=(req,res)=>{
    orderSchema.find({deliverystatus:false}).populate('userid').exec()
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }
  
  //View all Drivers
  
const viewOrdersbyDriverId=(req,res)=>{
  console.log("id",req.params.id);
  locationupdates.find({driverid:req.params.id,status:{$ne:'Delivered'}}).populate('userid').exec()
  .then(data=>{
    if(data.length>0){
      console.log(data);
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

}
const updateStatusByDriverId=async (req,res)=>{
  console.log("id",req.body.orderid);
  await locationupdates.findByIdAndUpdate({_id:req.body.orderid},{
    status:req.body.status,
    comments:req.body.comments
  }).exec()
  .then(data=>{
    if(data.length>0){
    res.json({
        status:200,
        msg:"Data obtained successfully",
        data:data
    })
  }else{
    res.json({
      status:200,
      msg:"No Data obtained "
  })
  }
}).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Inserted",
        Error:err
    })
})

await orderSchema.findOneAndUpdate({orderid:req.body.orderid},{
  status:req.body.status
}).exec()
.then(data=>{
 
  console.log("updated Successfully");

}).catch(err=>{
  console.log("updated Successfully");
})

}
  module.exports={
    registerDriver,
    loginDriver,
    viewDriverById,
    viewDrivers,
    editDriverById,
    deleteDriverById,
    upload,
    acceptDriverById,
    viewDriverReqs,
    viewOrdersforDelivery,
    acceptorderbyDriverId,
    viewOrdersbyDriverId,
    updateStatusByDriverId
    
}