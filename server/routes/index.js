const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { userModel } = require("../models/userSchema");
const ticketController = require("../controllers/ticketController");
const bcrypt = require("bcrypt");
// const nodemailer = require("noadmailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const checkUserAuth = require("../middlewares/tokenMiddlewares");
const multer = require("multer");
const { uploadFiles, deleteFile } = require("../services/cloudinary");
router.use(express.static(__dirname));
const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, path.join(__dirname, "../../src/Assets/UploadDocument//"));
  // },
  // filename: (req, file, cb) => {
  //   cb(
  //     null,
  //     new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
  //   );
  // },
});
const upload = multer({ storage });
// router.use()
/* GET home page. */
router.get("/", (req, res) => res.send("Hello World"));
router.post("/user", userController.addUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.UpdateUser);
router.post("/getDataByFilter", ticketController.getTicketByStatus);
router.get('/search/:searchText', ticketController.searchUser);
router.post("/ticket", ticketController.addTicket);

router.get("/getSingleTicket/:id", ticketController.getTIcketById);
router.get("/getImageUrl/:id", ticketController.getImageById);
router.put("/ticket/Update-ticket/:id", ticketController.UpdateTicket);
router.get("/getUser/:role?", checkUserAuth, userController.getAllUserData);
router.post("/ticketid", ticketController.ticketId);
router.get("/deleteImageIncloudy/:id", ticketController.DeleteAttechment);


router.post('/email-send', userController.emailSend);
router.post('/change-password', userController.changePassword);


// const transporter = nodemailer.createTransport({
//   service:"gmail",
//   auth:{
//     user:"dtthakur2197@gmail.com",
//     pass:"1234567"
//   }

// })
// ******for Upload Ticket File*************
router.post("/upload", upload.any(), async function (req, res, next) {
  console.log("body received", req.files[0]);
  console.log("upload api called");
  let tempArr = [];
  for (let i of req.files) {
    let response = await uploadFiles(i);
    console.log("data : ", response);
    tempArr.push({ imageID: response.public_id, imageName: i.originalname });
  }
  res
    .status(200)
    .json({ message: "file upload successfully!!!", data: tempArr });
});
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
