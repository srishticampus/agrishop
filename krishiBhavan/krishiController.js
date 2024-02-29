const complaintSchema = require("../Farmer/complaintSchema");
const farmerSchema = require("../Farmer/farmerSchema");
const allowance = require("./allowance");
const compensations = require("./compensations");
const guidelineSchema = require("./guidelineSchema");
const krishi = require("./krishiSchema");

//Customer Registration

const registerKBhavan =async (req, res) => {
  let stat=false
  let village=(req.body.village).toLowerCase()
  let district=(req.body.district).toLowerCase()

  await krishi.find({village:village,district:district}).exec().then(dat=>{
if(dat.length>0){
stat=true
console.log(stat);
}
  })
  const newKBhavan = new krishi({
    village: village,
    email: req.body.email,
    pincode: req.body.pincode,
    contact: req.body.contact,
    district: district,
    password: req.body.password,
    regNo: req.body.regNo,
  });
  if(stat==false){
  await newKBhavan
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
  }
  else{
    res.json({
      status: 500,
      msg: "The Krishi Bhavan has already been registered with us !!"
      
    });
  }
};
//KBhavan Registration -- finished

//Login
const loginKBhavan = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  krishi
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

//Login krishi --finished

//View all

const viewKBhavans = (req, res) => {
  krishi
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

// view KBhavan finished

//update KBhavan by id
const editKBhavanById = (req, res) => {
  krishi
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        village: req.body.village,
        regNo: req.body.regNo,
        pincode: req.body.pincode,
        contact: req.body.contact,
        district: req.body.district,
        email: req.body.email,
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
// view KBhavan by id
const viewKBhavanById = (req, res) => {
  krishi
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

const deleteKBhavanById = (req, res) => {
  krishi
    .findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then((data) => {
      emps = data;
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
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
//forgotvPawd KBhavan by id
const forgotPwd = (req, res) => {
  krishi
    .findOneAndUpdate(
      { email: req.body.email },
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

//view Farmer reqs
const viewFarmerRequests = (req, res) => {
  krishi
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      farmerSchema
        .find({ isactive: false, village: kb.village, district: kb.district })
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
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

//farmer Approval
const Approvefarmer = (req, res) => {
  farmerSchema
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        isactive: true,
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

//view Farmer Complaints
const viewFarmerComplaints = (req, res) => {
  krishi
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      console.log(kb.village);

      complaintSchema
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

const addGuideline = (req, res) => {
  let date = new Date();
  krishi
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      const guideline = new guidelineSchema({
        village: kb.village,
        date: date,
        title: req.body.title,
        category: req.body.category,
        contents: req.body.contents,
        district: kb.district,
      });
      guideline
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
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not found",
        Error: err,
      });
    });
};

const addAllowances = (req, res) => {
  let date = new Date();
  krishi
    .findById({ _id: req.params.id })
    .exec()
    .then((kb) => {
      const allow = new allowance({
        village: kb.village,
        date: date,
        title: req.body.title,
        category: req.body.category,
        Scheme: req.body.Scheme,
        criteria: req.body.criteria,
        endDate: req.body.endDate,
        contents: req.body.contents,
        district: kb.district,
      });
      allow
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
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not found",
        Error: err,
      });
    });
};

const addCompensation = (req, res) => {
  let date = new Date();

  const guideline = new compensations({
    date: date,
    farm_id: req.params.id,

    title: req.body.title,
    category: req.body.category,
    Scheme: req.body.Scheme,
    endDate: req.body.endDate,
    contents: req.body.contents,
  });
  guideline
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

module.exports = {
  registerKBhavan,
  viewKBhavanById,
  editKBhavanById,
  loginKBhavan,
  forgotPwd,
  viewKBhavans,
  deleteKBhavanById,
  Approvefarmer,
  viewFarmerRequests,
  viewFarmerComplaints,
  addGuideline,
  addAllowances,
  addCompensation,
};
