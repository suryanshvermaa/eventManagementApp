const express = require("express");
const { signupController, otpVerificationController, loginController, getUserDetails } = require("../controllers/authConroller");
const authRouter=express.Router();

authRouter
.post('/signup',signupController)
.post("/signup/verfication",otpVerificationController)
.post('/login',loginController)
.get('/profile/:userId',getUserDetails)

module.exports=authRouter;