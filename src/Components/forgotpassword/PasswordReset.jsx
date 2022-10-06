import { Typography, Button, Box } from '@mui/material'
// import { fontSize } from '@mui/system';
import React, {useState} from 'react'
import { ToastContainer } from 'react-bootstrap';
// import { ToastContainer } from 'react-toastify';
import {toast } from 'react-toastify';
// import axios from 'axios';
import { server } from "../../Services/Server";


const PasswordReset = () => {

    const [email,setEmail] = useState("");
    const [message, setMessage] = useState("");
    const setVal = (e) => {
        setEmail (e.target.value)

    }

    const sendLink = async (e) => {
        e.preventDefault();

        const res = await server("POST","/sendpasswordlink",JSON.stringify({ email }));

        //  const data = await response.json();

        if(res.status === 201){
            setEmail("");
            setMessage(true)
        }else{
            toast.error("Invalid User")
        }


    }

  return (
    
    <section>
        <div className="form_data">
            <Box>
                <Typography style={{textAlign: "center", fontWeight: "bold", fontSize: 30, marginTop: 40}}>Enter Your Email</Typography>
            

            {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
            <form>
                <div className="form_input"  >
                    <label htmlFor="email" style={{marginLeft: 500, marginTop: 40}}>Email</label> <br/>
                    <input  style={{marginLeft: 500, marginTop:10, width: 400, height: 40}} type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                </div>


                {/* <Button className='btn' style={{width: 200, marginLeft: 500}} onClick={sendLink}>Send</Button> */}
                <Button className='btn' variant="contained" style={{width: 400, marginLeft: 500,marginTop: 50, height: 40}}  onClick={sendLink}>Send</Button>
            </form> 
            <ToastContainer />
            </Box>
        </div>
    </section>

  )
}

export default PasswordReset;



