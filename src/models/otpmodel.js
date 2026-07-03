const mongoose = require("mongoose");

const otpschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
   
  },
  otp: {
    type: Number,
    required: true,
  },
  expiry: {
    type: Number, 
    required: true,
  },
  is_verified: {
    type: Boolean,
    default:false
  },
});

const otpmodel = mongoose.model("otpchek", otpschema);
module.exports = otpmodel;