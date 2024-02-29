const customers=require('./customerSchema')

//Customer Registration 

const registerCustomer=(req,res)=>{


    const newcustomer=new customers({
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district,
        password:req.body.password
    })
    newcustomer.save().then(data=>{
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
//customer Registration -- finished

//Login Customer 
const loginCustomer=(req,res)=>{
    const email=req.body.email
    const password=req.body.password
  
    customers.findOne({email:email}).exec().then(data=>{
      if(password==data.password){
        res.json({
          status:200,
          msg:"Login successfully",
          data:data
      })
    }else{
      res.json({
        status:500,
        msg:"password Mismatch",
        
    })
    }
    
  }).catch(err=>{
  res.json({
      status:500,
      msg:"User not found",
      Error:err
  })
  })
    };
  
  
  //Login Customer --finished
  
  
  //View all Customers
  
  const viewCustomers=(req,res)=>{
    customers.find().exec()
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
  
  // view Customers finished
  
  
  //update Customer by id
  const editCustomerById=(req,res)=>{
  
    
      
    customers.findByIdAndUpdate({_id:req.params.id},{
        name:req.body.name,
        age:req.body.age,
        email:req.body.email,
        city:req.body.city,
        pincode:req.body.pincode,
        contact:req.body.contact,
        district:req.body.district
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
// view cust by id
  const viewCustomerById=(req,res)=>{
    let emps
    customers.findOne({_id:req.params.id}).exec()
    .then(data=>{
    emps=data
      console.log(data);
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  
  const deleteCustomerById=(req,res)=>{
    let emps
    customers.findByIdAndDelete({_id:req.params.id}).exec()
    .then(data=>{
    emps=data
      console.log(data);
      res.json({
          status:200,
          msg:"Data removed successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  
  }
  //forgotvPawd Customer by id
  const forgotPwd=(req,res)=>{
  
    
      
    customers.findOneAndUpdate({email:req.body.email},{
     
      password:req.body.password
      })
  .exec().then(data=>{
    if(data!=null)
    res.json({
        status:200,
        msg:"Updated successfully"
    })
    else
    res.json({
      status:500,
      msg:"User Not Found"
     
  })
  }).catch(err=>{
    console.log(err);
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }
  



module.exports={registerCustomer,viewCustomers,editCustomerById,loginCustomer,forgotPwd,viewCustomerById,deleteCustomerById}