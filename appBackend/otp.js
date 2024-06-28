const nodemailer=require('nodemailer');
require('dotenv').config();

exports.otpGenAndSend=async(email)=>{
     const transporter=await nodemailer.createTransport({
        service:'gmail',
        auth:{
         user:process.env.MY_EMAIL,
         pass:process.env.MY_PASSWORD
        }
     });

     
   
     const randomNumber=Math.random()*1000000;
     let otp=Math.floor(randomNumber).toString();

     if(otp.length!=6){
      const powerFactor=6-otp.length;
     otp*=Math.pow(10,powerFactor);
     }
    

     

     const info=await transporter.sendMail({
        from:'suryanshverma.nitp@gmail.com',
        to:email,
        subject:"Suryansh' app Verification !!",
        text:"Verification !!",
        html:`<h2 style="text-align:center;">YOUR OTP for verfication on suryansh's app is</h2><h1 style="text-align:center;"><b>${otp}</b></h1>`
     })
     console.log(info);
     return otp;
}