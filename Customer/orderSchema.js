const mongoose = require("mongoose");

const cSchema = mongoose.Schema({
  products: {
    type: Array,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
  },
  total: Number,
  date: {
    type: Date,
  },
  isactive: {
    type: Boolean,
    default: true,
  },
  deliverystatus:{
    type:Boolean,
    default:false
  },
  driverid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "deliveryagents",
  },
  status:{
    type:String,
    default:'Order Confirmed. Your Items will be dispatched soon'

}
 
});

module.exports = mongoose.model("orders", cSchema);
