const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { User } = require('../models/login')

/* GET home page. */
router.get('/', (req, res) => res.send('Hello World'))
router.post('/user', userController.addUser)
router.get('/user/:id',userController.getUserById)
router.put('/user/:id', userController.UpdateUser)
router.get('/user',userController.getAllUserData)
router.post('/login', async (req, res) => {
  const email = req.body.userName
  const password = req.body.password

  const userLoginData = await User.findOne({ email: email }).then(
    (userLoginData) => {
      var token="vjnrvnerzovlzsk";
      console.log(userLoginData);

      if (userLoginData) {
        if (password === userLoginData.password) {
          return res
            .status(200)
            .json({ message: 'login sucess',token, userLoginData })
        } else {
          return res.json({ message: 'Please Login Again! With Correct Email & Password..' })
        }
      } else {
        return res.status(404).json({ message: 'not register' })
      }
    },
  )

  if (!userLoginData) {
    return res.status(400).json({ message: 'Credentials does not match' })
  }
})

router.delete("/user/:deleteId", userController.deleteUser);
module.exports = router
