import { Box, TextField, Button, styled, Typography, AppBar, Toolbar, Grid, Alert, AlertTitle, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Kadellogo from "../../../Assets/Images/kadellabslogo.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

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

export const Login = ({ setIsLoggedin }) => {
  const navigate = useNavigate();
  const Location = useLocation();

  const [data, setData] = useState({
    userName: "",
    password: "",
    showPassword: false,
  });
  useEffect(() => {
    console.log(Location);
    if (Location.state) {
      if (Location.state.status === "404") {
        toast.error((t) => (
          <span>
            <Typography variant="h6">Unauthorized</Typography>
            {Location.state.message} — <Button onClick={() => navigate(-1)}>GO BACK</Button>
          </span>
        ));
      }
    }
  }, []);
  const checkValidation = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setData({
      ...data, showPassword: !data.showPassword
    })
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onsubmit = async (e) => {
    e.preventDefault();

    const url = "/login";
    const res = await axios.post(url, data);
    console.log(res)
    const userLogin = res.data.userLoginData;

    const userData = JSON.stringify(userLogin);
    sessionStorage.setItem("userData", userData);
    sessionStorage.setItem("token", res.data.token);

    if (userLogin?.role === "admin") {
      navigate("/dashboard", { state: userLogin });
    } else if (userLogin?.role === "client") {
      navigate("/client-dashboard", { state: userLogin });
    } else if (userLogin?.role === "user") {
      navigate("/create-ticket", { state: userLogin });
    } else {

      navigate("/")
      toast.error(res.data.message)

    }
  };

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

  return (
    <>
      <Box>
        <Toaster />
        <AppBar sx={{ background: "#F4FBFF", boxShadow: "none" }}>
          <Toolbar>
            <img src={Kadellogo} />
          </Toolbar>
        </AppBar>
      </Box>
      <Component className="Component">
        <Heading>Welcome to Kadel Labs</Heading>
        <Detail>Login</Detail>
        <Wrapper component="form" onSubmit={onsubmit}>
          Username
          <Fields id="outlined-basic" label="Enter Username" variant="outlined" name="userName" onChange={checkValidation} />
          <br />
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            onChange={checkValidation}
            type={data.showPassword ? "text" : "password"}
            value={data.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {data.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
          {/* <Fields hintText="At least 8 characters"floatingLabelText="Enter your password"errorText="Your password is too short"/> */}
          <Forgot>Forgot Password</Forgot>
          <LoginButton variant="contained" type="submit">
            LOGIN
          </LoginButton>
          {/* <Button>Create an account</Button> */}
        </Wrapper>
      </Component>
      <Typography style={{ textAlign: "center" }}>By clicking Login, you accept the </Typography>
      <Typography style={{ textAlign: "center" }}> Term & Condition</Typography>
    </>
  );
};
