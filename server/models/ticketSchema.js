const mongoose = require("mongoose");
//const ObjectId = mongoose.Schema.Types.ObjectId;

const ticketSchema = mongoose.Schema({
  ticketid: {
    type: String,
  },
  issuetype: {
    type: String,
  },
  name: {
    type: Number,
    
  },
  department: {
    type: String,
    
  },
  message: {
    type: String,
     
  },
});

module.exports.ticketModel = mongoose.model("ticket", ticketSchema, "ticket");
