import { BrowserRouter as Router } from "react-router-dom";
import { Router as Routes } from "../Routes/Routes";
import axios from "axios";
// require('dotenv').config();

function App() {
  // console.log(process.env.REACT_APP_BASE_URL)
  axios.defaults.baseURL = window.origin.includes("localhost")
    ? "http://localhost:8000"
    : "http://3.231.202.28:8000/";

  // axios.defaults.baseURL=process.env.REACT_APP_BASE_URL
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
