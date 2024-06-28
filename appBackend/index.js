const express = require("express");
const cors=require('cors');
const mongoose=require('mongoose')
const app=express();
require('dotenv').config();
const authRouter =require('./routes/authRoutes.js');
const eventRouter = require("./routes/eventRoutes.js");
const registrationRouter=require('./routes/registrationRoutes.js')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/',authRouter)
app.use('/',eventRouter)
app.use('/',registrationRouter)


const connection=async()=>{
    try {
      await  mongoose.connect(process.env.MONGO_URL);
      console.log('db connected')
    } catch (error) {
      console.error("error in db connection");
    }
  }
  connection();

  
  

  
  
   
  app.listen(8080, () => {
    console.log("server is running on port 8080");
  });