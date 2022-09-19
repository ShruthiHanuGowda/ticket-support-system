const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userModel } = require("../models/userSchema");
const ticketController = require("../controllers/ticketController");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const checkUserAuth = require("../middlewares/tokenMiddlewares")

// router.use()
/* GET home page. */
router.get("/", (req, res) => res.send("Hello World"));
router.post("/user", userController.addUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.UpdateUser);
router.post("/getDataByFilter", ticketController.getTicketByStatus);
router.get('/search/:searchText', ticketController.searchUser);
router.post("/ticket", ticketController.addTicket);
router.get("/getTicket", ticketController.getAllTIcketData);
router.get("/getUser/:role?", checkUserAuth, userController.getAllUserData);
router.post("/login", async (req, res) => {
  const email = req.body.userName;
  const password = req.body.password;
  const userLoginData = await userModel.findOne({ email: email }).then(async (userLoginData) => {
    // var token = "vjnrvnerzovlzsk";
    console.log("userLogin data =====", userLoginData)
    if (userLoginData) {
      const isMatch = await bcrypt.compare(password, userLoginData.password);
      if (isMatch) {
        // Generate JWT Token
        const token = jwt.sign({ _id: userLoginData._id }, process.env.JWT_SECRET_KEY, { expiresIn: '6h' })
        console.log(token)
        return res.status(200).json({ message: "login sucess", token, userLoginData });
      } else {
        return res.json({
          message: "Please Login Again! With Correct Email & Password..",
        });
      }
    } else {
      return res.status(404).json({ message: "not register" });
    }
  });

  if (!userLoginData) {
    return res.status(400).json({ message: "Credentials does not match" });
  }
});

router.delete("/user/:deleteId", userController.deleteUser);
module.exports = router;
