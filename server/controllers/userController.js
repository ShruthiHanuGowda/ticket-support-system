const {
  successResponse,
  successResponseWithData,
  ErrorResponse,
} = require("../helpers/apiResponse");
const userDataService = require("../services/userDataService");
const express = require("express");
const { userModel } = require("../models/userSchema");
const { default: axios } = require("axios");
const { Navigate } = require("react-router-dom");
const app = express.Router();
const bcrypt = require("bcrypt");
const EmailSend = require("../services/emailSend");
const { ticketModel } = require("../models/ticketSchema");

app.get("/", async (req, res) => {
  const data = await userModel.find();
  return successResponseWithData(res, "users array", data);
});
const getAllUserData = async (req, res, next) => {
  const Role = req.params.role;
  console.log(req.headers);
  const { searchstring } = req.headers;
  console.log("searchS----------------", searchstring)
  const regex = new RegExp(searchstring, "i");
  // console.log("getAllUserData", Role);
  // if (typeof Role == undefined) return res.send({ message: 'no option selected' })
  const data = await userModel.find({ $and: [{ role: Role }, { $or: [{ name: regex }, { department: regex }] }] });
  // console.warn(data);

  return successResponseWithData(res, "users array", data);
};
const getUserByStatus = async (req, res) => {
  const data = req.body?.flags;
  // const status=new userModel();
  console.log("data received", data);
  if (data && data.length === 0) {
    console.log("no data");
    await userModel
      .find({})
      .then((result) => {
        return res.status(200).json({ message: "data fetched succesfully", data: result });
      })
      .catch((err) => {
        return res.status(500).json({ mesage: "something went wrong", description: err });
      });
    // return res.status(400).json({ mesage: 'no flags passed' })
  } else {
    console.log("flags passed", data);
    if (data.includes(1) || data.includes(2) || data.includes(3) || data.includes(4)) {
      const flagArray = [];
      for (let i of data) {
        // console.log(i)
        switch (parseInt(i)) {
          case 1:
            flagArray.push("user");
            break;
          case 2:
            flagArray.push("admin");
            break;
          case 3:
            flagArray.push("client");
            break;
          case 4:
            flagArray.push("demo");
            break;
          default:
            break;
        }
      }
      console.log(flagArray);
      await userModel
        .find({ role: { $in: flagArray } })
        .then((result) => {
          return res.status(200).json({ message: "data fetched succesfully", data: result });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ mesage: "something went wrong", description: err });
        });
    } else {
      await userModel
        .find({})
        .then((result) => {
          return res.status(200).json({ message: "data fetched succesfully", data: result });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ mesage: "something went wrong", description: err });
        });
    }
  }
};
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  console.log(id, "hii");
  let user;
  try {
    console.log(id);
    user = await userModel.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No Product Id Found" });
  }
  return res.status(200).json({ user });
};

const UpdateUser = async (req, res) => {
  const _id = req.params.id;
  try {
    if (_id) {
      const data = req.body;
      await userDataService.updateUser(data, _id);

      return res.status(200).json({ message: "user updated " });
      // return successResponseWithData(res, 'user updated', user_resp)
    } else return successResponse(res, "sorry user couldnt be updated");
  } catch (ex) {
    ErrorResponse(res, "something went wrong " + ex.message);
  }
};
const addUser = async (req, res) => {
  console.log(req.body);
  const { name, email, department, position, role, password } = req.body;
  console.log(name, email, password);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);
  const userExist = await userModel.findOne({ email: email });

  try {
    if (userExist) {
      return res.status(422).json({ message: "Email already exists! " });
    }
    const mailResp = await sendMailNodemailer(name, email, password);
    console.log("mailResp$$$%%%%%%%%%", mailResp)
    let user;
    user = new userModel({
      name,
      email,
      department,
      position,
      role,
      password: hashPassword,
    });
    await user.save();

    if (!user) {
      return res.status(500).json({ message: "unable to add" });
    }
    // <EmailSend email={user.email} />
    console.log("haysdyy---------------------", name, email, password);
    // await EmailSend.sendMail(name, email, password)

    return res.status(201).json({ user, message: "User Add Susscesfully" });
  } catch (err) {
    console.log(err, "eorrr");
  }
};
const sendMailNodemailer = async (name, email, password) => {
  console.log("in sendMAil Gufn====", email, password, name);
  await EmailSend.sendMail(name, email, password);
};
const deleteUser = async (req, res, next) => {
  const id = req.params.deleteId;
  console.log(id);
  let user;
  try {
    user = await userModel.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "Unable To Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
  Navigate({ to: "" });
};
// app.post('/', async (req, res) => {
//     console.log("addd userr")
//     const data = req.body;
//     try {
//         if(data) {
//             const user_resp = await userDataService.addUsers(data);
//             return successResponseWithData(res, 'user added', user_resp);
//         } else return successResponse(res, 'user couldnt be added');
//     } catch(ex) {
//         ErrorResponse(res, 'something went wrong '+ex.message);
//     }
// });

app.put("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    if (_id) {
      const data = req.body;
      const user_resp = await userDataService.updateUser(data, _id);

      return successResponseWithData(res, "user updated", user_resp);
    } else return successResponse(res, "sorry user couldnt be updated");
  } catch (ex) {
    ErrorResponse(res, "something went wrong " + ex.message);
  }
});
app.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    if (_id) {
      const user_resp = await userDataService.deleteUser(_id);
      return successResponseWithData(res, "user deleted", user_resp);
    } else return successResponse(res, "sorry user couldnt be deleted");
  } catch (ex) {
    ErrorResponse(res, "something went wrong " + ex.message);
  }
});
exports.addUser = addUser;
exports.getAllUserData = getAllUserData;
exports.deleteUser = deleteUser;
exports.getUserById = getUserById;
exports.UpdateUser = UpdateUser;
exports.getUserByStatus = getUserByStatus;

//   module.exports = app;
