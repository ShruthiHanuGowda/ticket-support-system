// import { useNavigate } from 'react-router-dom'

const jwt = require('jsonwebtoken')

const { userModel } = require('../models/userSchema')

const checkUserAuth = async (req, res, next) => {
  let token
  const { authorization } = req.headers
  console.log("authorization--------", authorization)
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      // Get Token from header
      token = authorization.split(' ')[1]
      // Verify Token
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, result) => {
        console.log("hhhhhhhhhh33", err)
        console.log("hhhhhhhhhh33", result)
        if (err) {

          return res.json({ status: 'failed', message: 'something went wrong', description: err })
        }
        // res.status(200).send('OK')
        // req.user = await userModel.findById(userID).select('-password')
        next()
      })

      // Get User from Token


      //   next()
    } catch (error) {
      console.log("error", error)
      res.status(401).send({ status: 'failed', message: 'Unauthorized User' })
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: 'failed', message: 'Unauthorized User, No Token' })
  }
}

module.exports = checkUserAuth
// exports.checkUserAuth=checkUserAuth
