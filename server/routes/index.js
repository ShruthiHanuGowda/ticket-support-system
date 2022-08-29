const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { User } = require('../models/login')

/* GET home page. */
router.get('/', (req, res) => res.send('Hello World'))
router.post('/user', userController.addUser)
router.get('/user',userController.getAllUserData)
router.post('/login', async (req, res) => {
  const email = req.body.userName
  const password = req.body.password

  const userLoginData = await User.findOne({ email: email }).then(
    (userLoginData) => {
      console.log(userLoginData)

      if (userLoginData) {
        if (password === userLoginData.password) {
          return res
            .status(200)
            .json({ message: 'login sucess', userLoginData })
        } else {
          return res.json({ message: 'wrong credentials' })
        }
      } else {
        return res.status(404).json({ message: 'not register' })
      }
    },
  )

  if (!userLoginData) {
    return res.status(400).json({ msg: 'Username does not match' })
  }
})

module.exports = router
