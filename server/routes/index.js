const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { User } = require('../models/login')

/* GET home page. */
router.get('/', (req, res) => res.send('Hello World'))
router.use('/user', userController)

router.post('/login', async (req, res) => {
  const email = req.body.userName;
  const password = req.body.password;
//   const {email,password} =req.body;
 
  const userLoginData = await User.findOne({ email: email }).then(
    (userLoginData) => {
		console.log(userLoginData)
		
		if(userLoginData){
				   if(password === userLoginData.password){
					return res.status(200).json({message:"login sucess",userLoginData});
					// res.setHeader('Content-Type', 'application/json');		
					//    res.send({message:"login sucess", user:userLoginData})
				   }else{
					   
					   return res.json({message:'wrong credentials'})
				   }
				}else{
					return res.status(404).json({message:'not register'})
					// res.send("not register")
				}	  
     },
  )
 
  if (!userLoginData) {
    return res.status(400).json({ msg: 'Username does not match' })
  }
// await User.findone({email:email},(err,user)=>{

// 	if(user){
// 	   if(password === user.password){
// 		   res.send({message:"login sucess",user:user})
// 	   }else{
// 		   res.send({message:"wrong credentials"})
// 	   }
// 	}else{
// 		res.send("not register")
// 	}
// })
  // try {
  //     //  let match = await bcrypt.compare(request.body.password, user.password);
  //     if (match) {
  //         const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
  //         const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

  //         const newToken = new Token({ token: refreshToken})
  //         await newToken.save();

  //         return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username });
  //     }else {
  //          return response.status(400).json({ msg: 'Password does not match'});
  //     }
  // }catch (error) {
  //     return response.status(500).json({ msg: 'Errror while login in user'});
  // }
})

//   router.post("/", async (req, res) => {
//     try {
//         const { error } = validate(req.body);
//         if (error)
//             return res.status(400).send({ message: error.details[0].message });
//         const user = await User.findOne({ email: req.body.email });
//         if (!user)
//             return res.status(401).send({ message: "Invalid Email or Password" });
//         const validPassword = await bcrypt.compare(
//             req.body.password,
//             user.password
//         );
//         if (!validPassword)
//             return res.status(401).send({ message: "Invalid Email or Password" });
//         const token = user.generateAuthToken();
//         res.status(200).send({ data: token, message: "logged in successfully" });
//     } catch (error) {
//         res.status(500).send({ message: "Internal Server Error" });
//     }

// });
module.exports = router
