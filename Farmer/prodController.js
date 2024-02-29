const mongoose = require("mongoose");
const Product_Model = require("./prodSchema");
const farmer = require("./farmerSchema");
const multer = require("multer");
const orderSchema=require('../Customer/orderSchema')
const wishlistSchema=require('../Customer/wishlistSchema')
const cartSchema=require('../Customer/cartSchema')
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const addproduct = async (req, res) => {
  let isactive = false;

  await farmer
    .findById({ _id: req.body.farm_id })
    .exec()
    .then((dta) => {
      isactive = dta.isactive;
    });
  let images = req.file;
  console.log("req.file.filename", req.file.filename);
  console.log(req.body);

  const new_product = new Product_Model({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    count: req.body.count,
    description: req.body.description,
    image: images,
    farm_id: req.body.farm_id,
  });
  if (isactive == true) {
    await new_product
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Inserted",
          Error: err,
        });
      });
  } else {
    res.json({
      status: 500,
      msg: "Sorry, You can't add Products as you don't get approval from Admin",
    });
  }
};
const displayproduct = async (req, res) => {
  try {
    const show_products = await Product_Model.find();
    res.json({
      status: 200,
      data: show_products,
      message: "Data send",
    });
  } catch (err) {
    if (err) {
      res.json({
        status: 404,
        message: "Data can't be displayed",
      });
    }
  }
};

//for farmer
const displayproductByFarmId = async (req, res) => {
  try {
    const show_products = await Product_Model.find({
      farm_id: req.params.farm_id,
    });
    res.json({
      status: 200,
      data: show_products,
      message: "Data send",
    });
  } catch (err) {
    if (err) {
      res.json({
        status: 404,
        message: "Data can't be displayed",
      });
    }
  }
};

const getproductbyid = (req, res) => {
  Product_Model.findById({ _id: req.params.id })

    .exec()
    .then((data) => {
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
        msg: "wrong data",
        Error: err,
      });
    });
};

const editproduct = (req, res) => {
  let images = req.file;

  Product_Model.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      count: req.body.count,
      description: req.body.description,
      image: images,
    }
  )
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "wrong data",
        Error: err,
      });
    });
};

// const deleteproduct = async (req, res) => {
//   try {
//     await Product_Model.deleteOne({ _id: req.params.id });
//     res.json({
//       status: 200,
//       message: "Data removed",
//     });
//   } catch (err) {
//     res.json({
//       status: 404,
//       message: "Error occured",
//     });
//   }
// };

const deleteproduct = async (req, res) => {
  let flag = 0;
  await orderSchema
    .find({ "products.product._id": req.params.id })
    .exec()
    .then((dat) => {
      if (dat.length > 0) {
        console.log("fond");
        flag = 1;
      }
    });
  if (flag == 0) {
    await wishlistSchema
      .deleteMany({ product_id: req.params.id })
      .exec()
      .then((dat) => {
        console.log("fond 1");
      });
    await cartSchema
      .deleteMany({ product_id: req.params.id })
      .exec()
      .then((dat) => {
        console.log("fond");
      });
    try {
      await Product_Model.deleteOne({ _id: req.params.id });
      res.json({
        status: 200,
        message: "Data removed",
      });
    } catch (err) {
      res.json({
        status: 500,
        message: "Error occured",
      });
    }
  } else {
    res.json({
      status: 500,
      message:
        "Sorry !! Delete Operation couldn't be performed as the Product is ordered by someone !!",
    });
  }
};
const addRating = (req, res) => {
  let newRate = parseFloat(req.body.rating);
  let rating = 0;

  Product_Model.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = parseFloat(data.rating);

      if (rating != 0) {
        rating = (rating + newRate) / 2;
      } else {
        rating = newRate;
      }
      console.log(rating);

      Product_Model.findByIdAndUpdate(
        { _id: req.params.id },
        {
          rating: rating,
        }
      )
        .exec()
        .then((data) => {
          console.log(data);
          res.json({
            status: 200,
            msg: "Data obtained successfully",
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
    });
};

module.exports = {
  addRating,
  addproduct,
  displayproduct,
  displayproductByFarmId,
  editproduct,
  upload,
  getproductbyid,
  deleteproduct,
  upload,
};
