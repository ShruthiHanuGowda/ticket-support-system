const mongoose = require("mongoose");
//const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = mongoose.Schema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  fileupload: {
    type: String,
  },
  issuetype: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
  },
  
});

module.exports.ticketModel = mongoose.model("ticket", ticketSchema, "ticket");
