const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', (req, res) => res.send("Hello World"));
router.use('/user', userController);


module.exports = router;
