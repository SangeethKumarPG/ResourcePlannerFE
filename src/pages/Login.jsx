import React from "react";
import loginPageImage from "../assets/login-screen-image.png";
import "./Login.css";
import { useState } from "react";
import { loginAPI } from "../services/allAPI";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({setIsLoggedIn}) {
  const [userDetails, setUserDetails] = useState({
    username:"",
    password:""
  });
  const navigate = useNavigate();
  const handleLogin = async ()=>{
    if(!userDetails.username || !userDetails.password){
      toast.error("Please enter all fields",{
        position: "top-center"
        });
    }else{
      const response = await loginAPI(userDetails);
      if(response.status === 200){
        toast.success("Login successful",{
          position: "top-center"
        });
        console.log(response.data);
        sessionStorage.setItem("userData",JSON.stringify(response.data));
        setIsLoggedIn(true);
        navigate("/home");
      }else{
        toast.error("Invalid username or password",{
          position: "top-center"
        })
      }
    }
  }
  return (
    <>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-5 mb-5">
        <div className="card">
          <img
            src={loginPageImage}
            className="card-img-top login-image"
            alt="Login Page"
          />
        </div>
        <div className="card bg-primary login-card d-flex flex-column p-3 justify-content-center align-items-center text-white text-center ms-0">
          <h2 className="text-white mt-2">Login</h2>
          <div className="input-container">
            <TextField
              type="text"
              variant="outlined"
              className="mb-1 input-field"
              placeholder="Enter the user name"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              fullWidth
              onChange={(e)=>setUserDetails({...userDetails, username:e.target.value})}
            />
            <TextField
              type="password"
              variant="outlined"
              className="mb-2 input-field"
              placeholder="Enter the password"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              fullWidth
              onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})}
            />
            <Button
              variant="outlined"
              color="success"
              className="mt-3 mb-2 form-control login-button"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
