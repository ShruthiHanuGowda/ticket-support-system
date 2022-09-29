const mongoose = require('mongoose');

var otpSchema =  new mongoose.Schema({
    email:String,
    code: String,
    expireIn: Number
},{
     timestamp:true

})

// let otp = connect.model('otp', otpSchema, 'otp')
module.exports.otpModel = mongoose.model("otp", otpSchema, "otp");