const allowance = require("../krishiBhavan/allowance");
const compensations = require("../krishiBhavan/compensations");
const guidelineSchema = require("../krishiBhavan/guidelineSchema");
const complaintSchema = require("./complaintSchema");
const farmers = require("./farmerSchema");
const products = require("./prodSchema");
const orderSchema = require("../Customer/orderSchema");
//Customer Registration

const registerFarmer = (req, res) => {
  const newFarmer = new farmers({
    name: req.body.name,
    age: req.body.age,
    village: req.body.village,
    city: req.body.city,
    pincode: req.body.pincode,
    contact: req.body.contact,
    district: req.body.district,
    password: req.body.password,
    aadhar: req.body.aadhar,
  });
  newFarmer
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//Farmer Registration -- finished

//Login Farmer
const loginFarmer = (req, res) => {
  const contact = req.body.contact;
  const password = req.body.password;

  farmers
    .findOne({ contact: contact })
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

//Login Farmer --finished

//View all Farmers

const viewFarmers = (req, res) => {
  farmers
    .find({})
    .exec()
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Farmers finished

//update Farmer by id
const editFarmerById = (req, res) => {
  farmers
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        age: req.body.age,
        village: req.body.village,
        city: req.body.city,
        pincode: req.body.pincode,
        contact: req.body.contact,
        district: req.body.district,

        aadhar: req.body.aadhar,
      }
    )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
// view cust by id
const viewFarmerById = (req, res) => {
  farmers
    .findOne({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
      console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};


const deleteFarmerById=async(req,res)=>{
    
  ////////
  
  
  let pdts=[],orders=[],flag=0
       await products.find({farm_id:req.params.id}).exec().then(data=>{
              if(data.length>0){
              data.map(x=>{
                pdts.push((x._id).toString())
              })
            }
          else
        //   res.json({
        //     status:500,
        //     msg:"No products added"
        // })
        console.log("No products added");
          }).catch(err=>{
              res.json({
                  status:500,
                  msg:"no data",
                  Error:err
              })
          })
          console.log(pdts);
          await orderSchema.find({}).exec().then(data1=>{
            data1.map(x=>{
              console.log(x.products);
              x.products.map(pdt=>{
                console.log(pdt.product._id);
                if(pdts.includes(pdt.product._id)){
                  console.log("1");
                  orders.push(x._id)
                }
              })
            })
            console.log("pdts",orders);
          })
          orderSchema.find({_id:{$in:orders}}).populate('userid').then(datas=>{
          //   res.json({
          //     status:200,
          //     msg:"data obtained",
          //     data:datas
          // })
          if(datas.length>0)
          flag=1
          }).catch(err=>{
            console.log(err);
            res.json({
              status:500,
              msg:"data not  obtained",
              err:err
          })
          })
          
  
  
  
      //////
      if(flag==1){
        res.json({
          status:500,
          msg:"Sorry !! Delete Operation couldn't be performed as the Farmer got some orders !!"
         
      })
      }else{
        products.deleteMany({farm_id:req.params.id}).exec().then(data=>{
          console.log(data);
         
        
      }).catch(err=>{
        console.log(err);
         
      })
    complaintSchema.deleteMany({farm_id:req.params.id}).exec().then(data=>{
      console.log(data);
     
    
  }).catch(err=>{
    console.log(err);
     
  })
      farmers.findByIdAndDelete({_id:req.params.id}).exec()
      .then(data=>{
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
    
    }
//forgotvPawd Customer by id
const forgotPwd = (req, res) => {
  farmers
    .findOneAndUpdate(
      { contact: req.body.contact },
      {
        password: req.body.password,
      }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};

//id card check

//View all Farmers

const viewFarmerIdCard = (req, res) => {
  farmers
    .findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      if (data.isactive) {
        res.json({
          status: 200,
          idstatus: "Approved",
          data: data,
        });
      } else {
        res.json({
          status: 500,
          idstatus: "Pending",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//Add complaint

const addComplaint = (req, res) => {
  farmers
    .findById({ _id: req.body.farm_id })
    .exec()
    .then((frmr) => {
      console.log(frmr.village);
      let vill = frmr.village;
      const newcomplaint = new complaintSchema({
        name: req.body.name,
        village: vill,
        farm_id: req.body.farm_id,
        description: req.body.description,
        contact: req.body.contact,
        district: frmr.district,
        category: req.body.category,
      });
      newcomplaint
        .save()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Registered successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const DeleteComplaintById = (req, res) => {
  complaintSchema
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Registered successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//view Guidelines
const viewGuidelines = (req, res) => {
  farmers
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      console.log(kb.village);

      guidelineSchema
        .find({ village: kb.village, district: kb.district })
        .exec()
        .then((data) => {
          if (data.length > 0) {
            res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: data,
            });
          } else {
            res.json({
              status: 200,
              msg: "No Data obtained ",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not found",
            Error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not found",
        Error: err,
      });
    });
};

const viewallowances = (req, res) => {
  farmers
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      console.log(kb.village);

      allowance
        .find({ village: kb.village, district: kb.district })
        .exec()
        .then((data) => {
          if (data.length > 0) {
            res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: data,
            });
          } else {
            res.json({
              status: 200,
              msg: "No Data obtained ",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not found",
            Error: err,
          });
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not found",
        Error: err,
      });
    });
};

const viewCompensation = (req, res) => {
  compensations
    .find({ farm_id: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0)
        res.json({
          status: 200,
          msg: "data obtained",
          data: data,
        });
      else
        res.json({
          status: 500,
          msg: "No compensations",
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "no data",
        Error: err,
      });
    });
};

const viewMyProductsByFarmerId = (req, res) => {
  products
    .find({ farm_id: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0)
        res.json({
          status: 200,
          msg: "data obtained",
          data: data,
        });
      else
        res.json({
          status: 500,
          msg: "No compensations",
        });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "no data",
        Error: err,
      });
    });
};

const viewMyOrdersByFarmId = async (req, res) => {
  let pdts = [],
    orders = [];
  await products
    .find({ farm_id: req.params.id })
    .exec()
    .then((data) => {
      if (data.length > 0) {
        data.map((x) => {
          pdts.push(x._id.toString());
        });
      } else
        // res.json({
        //   status: 500,
        //   msg: "No products added",
        // });
        console.log("no products added");
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "no data",
        Error: err,
      });
    });

  console.log(pdts, "pdts");

  await orderSchema
    .find({})
    .exec()
    .then((data1) => {
      data1.map((x) => {
        console.log(x.products);
        x.products.map((pdt) => {
          console.log(pdt.product._id);
          if (pdts.includes(pdt.product._id)) {
            console.log("1");
            orders.push(x._id);
          }
        });
      });
      console.log("pdts", orders);
    });
  orderSchema
    .find({ _id: { $in: orders } })
    .populate("userid")
    .then((datas) => {
      res.json({
        status: 200,
        msg: "data obtained",
        data: datas,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "data not  obtained",
        err: err,
      });
    });
};

module.exports = {
  registerFarmer,
  viewGuidelines,
  viewFarmerIdCard,
  addComplaint,
  DeleteComplaintById,
  viewFarmerById,
  editFarmerById,
  loginFarmer,
  forgotPwd,
  viewFarmers,
  deleteFarmerById,
  viewCompensation,
  viewallowances,
  viewMyProductsByFarmerId,
  viewMyOrdersByFarmId,
};
