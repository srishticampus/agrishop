const cartSchema = require("./cartSchema")
const orderSchema = require("./orderSchema")

const addtoOrders = async (req, res) => {


    date = new Date()
    // cart.find({userid:req.body.userid,product_id:req.body.product_id}).exec().then(data=>{
    //     if(data.length<=0){
// await cartSchema.findByIdAndDelete({_id:req.body.cartid}).exec()
// .then(data => {
//     console.log(data);
   
// }).catch(err => {
//     console.log(err);
 
// })
console.log("pdts",req.body.products);

    cartSchema.deleteMany({userid:req.body.userid}).exec()
   .then(data => {
       console.log(data);
      
   }).catch(err => {
       console.log(err);
    
   })


    const obj = new orderSchema({


        products: req.body.products,
        userid: req.body.userid,
        total: req.body.total,
        date: date,
        deliverystatus:req.body.deliverystatus

    })
    obj.save((err, data) => {
        if (err) {
            res.json({
                status: 500,
                err: err,
                message: err.message
            })
        }
        else {
            res.json({
                status: 200,
                data: data,
                message: "Successfully saved"
            })
        }
    })
}

// view order by id
const viewOrderById = (req, res) => {
    let emps
    customers.findOne({ _id: req.params.id }).exec()
        .then(data => {
            emps = data
            console.log(data);
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })

}

// view orders  by custid
const viewOrderByCustomerId = (req, res) => {

    orderSchema.find({ userid: req.params.id }).exec()
        .then(data => {
            console.log(data);
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })

}


module.exports = { addtoOrders, viewOrderById, viewOrderByCustomerId }