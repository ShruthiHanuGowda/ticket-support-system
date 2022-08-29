import {
  Box,
  TextField,
  Button,
  styled,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Kadellogo from "../../../Assets/Images/kadellabslogo.png";
import axios from "axios";

const Component = styled(Box)`
  width: 500px;
  height: 542px;
  background: #f4fbff;
  margin-top: 80px;
  margin-left: 440px;
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Heading = styled(Typography)`
  text-align: center;
  font-size: 25px;
  padding: 20px;
`;

const Detail = styled(Typography)`
  text-align: center;
  font-size: 30px;
`;

const Wrapper = styled(Box)`
  padding: 20px 30px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 15px;
  }
`;

const LoginButton = styled(Button)`
  width: 120px;
  height: 25px;
  padding: 20px;

  margin-left: 150px;
`;

const Forgot = styled(Typography)`
  margin-left: 295px;
`;

const Fields = styled(TextField)`
  background: #fff;
`;

export const Login = ({setIsLoggedin}) => {
  const navigate =useNavigate();
  const [data, setData] = useState({
    userName: '',    
    password: '',   
  })
  const checkValidation = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })  
  }
    const onsubmit = async(e) =>{     
      e.preventDefault();
      console.log(data);
      try {        
        console.log(data);
       const url='http://localhost:8000/login';
        const { data: res }= await axios.post(url, data);
     console.log(res)
        if(res.userLoginData.role === 'admin'){
          navigate("/");
            console.log("dash")   
            setIsLoggedin(true);     
        }else if(res.userLoginData.role==="client"){
          navigate("/manage-client");
          console.log("client")
          setIsLoggedin(true);
        }else if(res.userLoginData.role==="user" ){
          navigate("/create-ticket");
          console.log("user")
          setIsLoggedin(true);
        }else{
          navigate('/login')
        }  
       
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
        ) {
            console.log(error.response.data.message);
        }

    }
      // const getUser = async (request,response)=>{
      //   let user = await User.findOne({ username: request.body.username });
      //   if (!user) {
      //       return response.status(400).json({ msg: 'Username does not match'});
      //   }
      //   try {           
      //       console.log(user);
      //   }catch (error) {
      //       return response.status(500).json({ msg: 'Errror while login in user'});
      //   }
      // }
      
     
    }

  return (
    <Component>
      <Box>
        <AppBar sx={{ background: "#F4FBFF", boxShadow: "none" }}>
          <Toolbar>
            <img src={Kadellogo} />
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Heading>Welcome to Kadel Labs</Heading>
        <Detail>Login</Detail>
        <Wrapper component='form' onSubmit={onsubmit}>
          Username
          <Fields
            id="outlined-basic"
            label="Enter Username"
            variant="outlined"
            name="userName"            
            onChange={checkValidation}         
          />
          <br />
          Password
          <Fields
            htmlFor="outlined-adornment-password"
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            name="password"
            
            onChange={checkValidation}
            
          />
          {/* <Fields hintText="At least 8 characters"floatingLabelText="Enter your password"errorText="Your password is too short"/> */}
          <Forgot>Forgot Password</Forgot>
          <LoginButton variant="contained" type="submit">LOGIN</LoginButton>
          {/* <Button>Create an account</Button> */}
        </Wrapper>
      </Box>
      <Typography style={{ textAlign: "center" }}>
        By clicking Login, you accept the{" "}
      </Typography>
      <Typography style={{ textAlign: "center" }}> Term & Condition</Typography>
    </Component>
  );
};
