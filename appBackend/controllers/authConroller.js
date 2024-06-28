const User=require('../models/userModel.js')
const {otpGenAndSend}=require('../otp.js')
const jwt=require('jsonwebtoken')

exports.getUserDetails=async(req,res)=>{
  const userId=req.params.userId;
  const user=await User.findOne({_id:userId})
  res.json(user);
}
exports.signupController=async(req,res)=>{
    const {name,email,password}=req.body;
    const user=new User({
        name,
      email,
      password
    })
    const otp=await otpGenAndSend(email);
    user.otp=otp;
    await user.save();
    res.json("user created");
  }

exports.otpVerificationController=async (req, res) => {
   
    const otp=(req.body.otp).toString();
    const email=req.body.email;
    console.log(email)
    const user=await User.findOne({email});
    console.log(user)
    console.log(otp)
    const userOTP=user.otp;
    console.log(userOTP)
    if(userOTP==otp){
      user.verified=true
      await user.save();
      const token=await jwt.sign({userId:user._id,name:user.name},'suryansh0987654321')
      if(token){
        return res.json({token});
      }
      
    }
   res.status(404).json({wrong:'wrong'});
  }


  exports.loginController=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    const pass=user.password;
    if(password==pass){
      const token=await jwt.sign({userId:user._id,name:user.name},"suryansh0987654321");
     return res.json({token});
    }
    res.json('failed').status(400);
  }