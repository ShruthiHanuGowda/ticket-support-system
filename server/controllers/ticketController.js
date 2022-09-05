const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { ticketModel } = require("../models/ticketSchema");
const app = express.Router();

const addTicket = async (req, res) => {
    console.log("nidhi is hear")
    const { ticketid, issuetype, name, department, message } = req.body;
   const ticketExist = await ticketModel.findOne({ ticketid: ticketid });
   console.log(ticketExist, "ticketExist");
  
    try {  
      let ticket;
      ticket = new ticketModel({
        ticketid,
        issuetype,
        name,
        department,
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
exports.addTicket=addTicket
//   module.exports = addTicket;