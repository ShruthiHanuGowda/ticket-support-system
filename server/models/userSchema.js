const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "",
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  sex: {
    type: String,
    required: true,
    default: "",
  },
});

module.exports.userModel = mongoose.model("users", userSchema, "users");
