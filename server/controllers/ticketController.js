const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const { default: axios } = require("axios");

const fileUpload = require("express-fileupload");
const app = express.Router();
// app.get("/", (req, res) => {
//     res.send("up and running")
//    });

// app.post('/', async (req, res) => {
//     try {
//         if(!req.files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             let data = [];

//             //loop all files
//             _.forEach(_.keysIn(req.files.fileupload), (key) => {
//                 let photo = req.files.fileupload[key];

//                 //move photo to uploads directory
//                 photo.mv('../../src/Assets/Images' );

//                 //push file details
//                 data.push({
//                     name: photo.name,
//                     mimetype: photo.mimetype,
//                     size: photo.size
//                 });
//             });

//             //return response
//             res.send({
//                 status: true,
//                 message: 'Files are uploaded',
//                 data: data
//             });
//         }
//     } catch (err) {
//         res.status(500).send(err);
//     }
// });
app.get("/", async (req, res) => {
  console.log("nidhi pgl he====", req);
  const data = await ticketModel.find();

  return successResponseWithData(res, "users array", data);
});
const getAllTIcketData = async (req, res) => {
  console.log("bharat kar");
  const data = await ticketModel.find();
  return res.status(200).json({ data });
};

const addTicket = async (req, res) => {
  // console.log("body reqyest  data===== " , req.body)
  const { name, department, fileupload, issuetype, message } = req.body;
  // console.log(ticketExist, "ticketExist");

  try {
    let ticket;
    ticket = new ticketModel({
      name,
      department,
      fileupload,
      issuetype,
      message,
    });
    await ticket.save();

    if (!ticket) {
      return res.status(500).json({ message: "unable to add" });
    }
    return res.status(201).json({ ticket, message: "Ticket Add Successfully" });
  } catch (err) {
    console.log(err, "eorrr");
  }
};
exports.getAllTIcketData = getAllTIcketData;
exports.addTicket = addTicket;

// //   module.exports = addTicket;
// module.exports=app;
