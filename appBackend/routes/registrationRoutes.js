const express = require("express");
const registrationRouter=express.Router();
const {getRegistrationController, registrationController}=require('../controllers/registrationController.js')

registrationRouter
.get('/registrations/:eventId',getRegistrationController)
.post('/registration/:eventId',registrationController)

module.exports=registrationRouter;