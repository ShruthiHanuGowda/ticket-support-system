const mongoose = require("mongoose");
//const ObjectId = mongoose.Schema.Types.ObjectId;
const ticketSchema = mongoose.Schema({
  ticketId: {
    type: String,
  },
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  fileupload: [{ imageID: { type: String }, imageName: { type: String } }],
  issuetype: {
    type: String,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
  },
  createdAt: { type: String },
  updatedAt: { type: String },
  solvedAt: { type: String },
});
module.exports.ticketModel = mongoose.model("ticket", ticketSchema, "ticket");
