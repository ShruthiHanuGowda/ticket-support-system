const { successResponse, successResponseWithData, ErrorResponse } = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const { default: axios } = require("axios");

// const fileUpload = require("express-fileupload");
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
const getTicketByStatus = async (req, res) => {
  const data = req.body?.flags;
  const searchString = req.body?.searchString;

  console.log("=================00000000======", searchString);
  // const status=new userModel();
  // console.log("data received", data);
  console.log("no data", searchString);
  const regex = new RegExp(searchString, "i");
  if (data && data.length === 0) {
    await ticketModel
      .find({ $or: [{ name: regex }, { department: regex }] })
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
        .find({ $and: [{ status: { $in: flagArray } }, { $or: [{ name: regex }, { department: regex }] }] })
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
          return res.status(500).json({ mesage: "something went wrong", description: err });
        });
    }
  }
};
const searchUser = async (req, res) => {
  const { searchText } = req.params;
  console.log("searchText::::::::", searchText);
  const regex = new RegExp(searchText, "i");
  await ticketModel
    .find({ $or: [{ name: regex }, { department: regex }] })
    .then((resp) => {
      res.status(200).json({ result: resp });
    })
    .catch((err) => console.log("errr", err));
};
exports.getAllTIcketData = getAllTIcketData;
exports.addTicket = addTicket;
exports.searchUser = searchUser;
exports.getTicketByStatus = getTicketByStatus;
// //   module.exports = addTicket;
// module.exports=app;
