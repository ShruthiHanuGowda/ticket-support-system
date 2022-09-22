const mongoose = require("mongoose");
//const ObjectId = mongoose.Schema.Types.ObjectId;
const ticketSchema = mongoose.Schema({
  ticketId: {
    type: String,

  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  fileupload: [{ imageID: { type: String }, imageName: { type: String } }],
  issuetype: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  createdAt: { type: String },
  updatedAt: { type: String },
  solvedAt: { type: String },
});
module.exports.ticketModel = mongoose.model("ticket", ticketSchema, "ticket");
