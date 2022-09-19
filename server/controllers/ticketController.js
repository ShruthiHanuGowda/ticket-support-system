const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const { default: axios } = require("axios");
const { getImgUrl ,deleteFile} = require("../services/cloudinary");
//const multer = require("multer");
const app = express.Router();

// const fileStorageEngine = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../../src/Assets/UploadDocument");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "--" + fileList.originename);
//   },
// });

// const upload = multer({ storage: fileStorageEngine });

// app.post("/", upload.single("Images"), (req, res) => {
//   console.log(req.files);
//   res.send("FIles upload");
// });

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
const ticketId = async (req , res) =>{

ticketModel.findOneAndUpdate(
  
  {id:"autoval"},
  {"$inc":{"seq":1}},
  {new:true},(err,cd)=>{

    console.log("ticket value" , cd)
            
    if(cd==null)
    {      const newval =new ticketModel({id:"autoval" , seq:1})
      newval.save()

    }
  }
)





    const data= new ticketModel({
      ticketId:req.body.ticketId,
      name:  req.body.name,
      department: req.body.department,
      fileupload:req.body.fileupload,
      issuetype:req.body.issuetype,
      message:req.body.message,
      status:req.body.status,
      createdAt: { type: String },
      updatedAt: { type: String },
      solvedAt: { type: String },
    })
    data.save()
    res.send("Add id!!!!")

}


const addTicket = async (req, res) => {
  // console.log("body reqyest  data===== " , req.body)
  const { ticketId, name, department, fileupload, issuetype, message, status } = req.body;
  // console.log(ticketExist, "ticketExist");

  try {
    let ticket;
    ticket = new ticketModel({
      ticketId,
      name,
      department,
      fileupload,
      issuetype,
      message,
      status,
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
    console.log(err, "eorrr");
  }
};

const UpdateTicket = async (req, res) => {
  const _id = req.params.id;
  let data = req.body;
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
const DeleteAttechment =async (req,res)=>{
  const id = req.params.id;
  console.log('id here received:::::::::::',id)
  const data=await deleteFile(id);
  res.status(200).json({data});
}
exports.getAllTIcketData = getAllTIcketData;
exports.addTicket = addTicket;
exports.getTIcketById = getTIcketById;
exports.UpdateTicket = UpdateTicket;
exports.getImageById = getImageById;
exports.DeleteAttechment=DeleteAttechment;
exports.ticketId=ticketId;
