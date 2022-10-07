const { successResponse, successResponseWithData, ErrorResponse } = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const { TicketCounter } = require("../models/ticketCounter")
const { default: axios } = require("axios");
const { getImgUrl, deleteFile } = require("../services/cloudinary");
const { updateSendMail } = require("../services/emailSend");
const { userModel } = require("../models/userSchema");
//const multer = require("multer");
const app = express.Router();
app.get("/", async (req, res) => {
  const data = await ticketModel.find();
  return successResponseWithData(res, "users array", data);
});




const getImageById = async (req, res, next) => {
  const id = req.params.id;
  console.log("id is ::::::::", id);
  const data = await getImgUrl(id);
  console.log("loggggg", data);
  res.status(200).json({ data });
};


const getTIcketById = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, "hii");
  let ticket;
  try {
    console.log(id);
    ticket = await ticketModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!ticket) {
    return res.status(404).json({ message: "No Product Id Found" });
  }
  return res.status(200).json({ ticket });
};

// @@@@@@@@@@@@@@@@@@@@@@ ticketId @@@@@@@@@@@@@@@@@@@@ //
// const ticketId = async (req, res) => {
//   ticketModel.findOneAndUpdate(
//     { id: "autoval" },
//     { $inc: { seq: 1 } },
//     { new: true },
//     (err, cd) => {
//       console.log("ticket value", cd);
//       if (cd == null) {
//         const newval = new ticketModel({ id: "autoval", seq: 1 });
//         newval.save();
//       }
//     }
//   );
//   const data = new ticketModel({
//     ticketId: req.body.ticketId,
//     name: req.body.name,
//     department: req.body.department,
//     fileupload: req.body.fileupload,
//     issuetype: req.body.issuetype,
//     message: req.body.message,
//     status: req.body.status,
//     createdAt: { type: String },
//     updatedAt: { type: String },
//     solvedAt: { type: String },
//   });
//   data.save();
//   res.send("Add id!!!!");
// };



const addTicket = async (req, res) => {
  const count = await ticketModel.findOne().sort({ ticketId: -1 })
  let ticketNumber = 1001
  if (count && count.ticketId) {
    ticketNumber = parseInt(count.ticketId) + 1
  }
  const { ticketId, name, department, fileupload, issuetype, message, status, createdUserID } =
    req.body;
  console.log(req.body);
  try {
    let ticket;
    ticket = new ticketModel({
      ticketId: ticketNumber,
      name,
      department,
      fileupload,
      issuetype,
      message,
      status,
      createdUserID,
      createdAt: new Date().toISOString(),
      updatedAt: "",
      solvedAt: "",
    });
    await ticket.save();
    if (!ticket) {
      return res.status(500).json({ message: "unable to add" });
    }
    return res.status(201).json({ ticket, message: "Ticket Add Successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Something Went Wrong!" });
  }
};
const getTicketByStatus = async (req, res) => {

  const data = req.body?.flags;
  const searchString = req.body?.searchString;
  console.log("no data", searchString);
  const regex = new RegExp(searchString, "i");
  if (data && data.length === 0) {
    await ticketModel
      .find({ $or: [{ ticketId: regex }, { name: regex }, { department: regex }] })
      .then((result) => {
        return res.status(200).json({ message: "data fetched succesfully", data: result });
      })
      .catch((err) => {
        return res.status(500).json({ mesage: "something went wrong", description: err });
      });
  } else {
    console.log("flags passed", data);
    console.log("string passed", searchString);
    if (data.includes(1) || data.includes(2) || data.includes(3) || data.includes(4)) {
      const flagArray = [];
      for (let i of data) {
        // console.log(i)
        switch (parseInt(i)) {
          case 1:
            flagArray.push("Open");
            // console.log(">::::::", flagArray)
            break;
          case 2:
            flagArray.push("Close");
            break;
          case 3:
            flagArray.push("Hold");
            break;
          case 4:
            flagArray.push("In Progress");
            break;
          default:
            break;
        }
      }
      console.log("mknnjjkk", flagArray);
      await ticketModel
        .find({ $and: [{ status: { $in: flagArray } }, { $or: [{ name: regex }, { department: regex }, { ticketId: regex }] }] })
        .then((result) => {
          // console.log("result----", result)
          return res.status(200).json({ message: "data fetcheds succesfully", data: result });
        })
        .catch((err) => {
          return res.status(500).json({ message: "something went wrong", description: err });
        });
    } else {
      await ticketModel
        .find({})
        .then((result) => {
          return res.status(200).json({ message: "data fetched succesfully", data: result });
        })
        .catch((err) => {
          return res.status(500).json({ message: "something went wrong", description: err });
        });
    }
  }
};
const searchUser = async (req, res) => {
  const { searchText } = req.params;
  console.log("searchText::::::::", searchText);
  const regex = new RegExp(searchText, "i");
  await ticketModel
    .find({ $or: [{ name: regex }, { department: regex }, { ticketId: regex }] })
    .then((resp) => {
      res.status(200).json({ result: resp });
    })
    .catch((err) => console.log("errr", err));
};
const UpdateTicket = async (req, res) => {
  const _id = req.params.id;
  let data = req.body;
  sendMailOnUpdateTicket(_id, data)
  data.updatedAt = new Date().toISOString();
  console.log("hiaddyyastt=000000=====", data);

  try {
    if (_id) {
      await ticketModel.updateOne({ _id: _id }, { $set: data });
      return res.status(200).json({ message: "user updated " });
      // return successResponseWithData(res, 'user updated', user_resp)
    } else return successResponse(res, "sorry user couldnt be updated");
  } catch (ex) {
    ErrorResponse(res, "something went wrong " + ex.message);
  }
};
const sendMailOnUpdateTicket = async (_id, data) => {
  const ticketData = await ticketModel.findById(_id);
  const userData = await userModel.findById(ticketData.createdUserID)
  console.log("~~~~`", userData)
  await updateSendMail(userData?.name, userData?.email, ticketData.ticketId, data);
}
const DeleteAttechment = async (req, res) => {
  const id = req.params.id;
  console.log("id here received:::::::::::", id);
  const data = await deleteFile(id);
  res.status(200).json({ data });
};

exports.addTicket = addTicket;
exports.getTIcketById = getTIcketById;
exports.UpdateTicket = UpdateTicket;
exports.getImageById = getImageById;
exports.DeleteAttechment = DeleteAttechment;
// exports.ticketId = ticketId;
exports.searchUser = searchUser;
exports.getTicketByStatus = getTicketByStatus;
