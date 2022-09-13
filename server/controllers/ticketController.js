const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const { default: axios } = require("axios");
const multer = require("multer");
const app = express.Router();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../../src/Assets/UploadDocument");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + fileList.originename);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/", upload.single("Images"), (req, res) => {
  console.log(req.files);
  res.send("FIles upload");
});

app.get("/", async (req, res) => {
  const data = await ticketModel.find();

  return successResponseWithData(res, "users array", data);
});
const getAllTIcketData = async (req, res) => {
  console.log("bharat kar");
  const data = await ticketModel.find();
  return res.status(200).json({ data });
};

// const getTIcketById = async(req , res) =>{
//   const id = req.params.id;
// }


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

const addTicket = async (req, res) => {
  // console.log("body reqyest  data===== " , req.body)
  const { name, department, fileupload, issuetype, message,status } = req.body;
  // console.log(ticketExist, "ticketExist");

  try {
    let ticket;
    ticket = new ticketModel({
      name,
      department,
      fileupload,
      issuetype,
      message,
      status
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
exports.getTIcketById = getTIcketById;
// //   module.exports = addTicket;
// module.exports=app;
