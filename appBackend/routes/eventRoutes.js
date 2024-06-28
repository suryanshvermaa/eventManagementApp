const express = require("express");
const eventRouter=express.Router();
const {createEventController,updateEventController,deleteEventController, getEventController, searchEventsController, myEventsController,getEventByIdController} =require('../controllers/eventController.js');
const { createCommentController, updateCommentController, deleteCommentController, getCommentController } = require("../controllers/commentConroller.js");
const { createFeedbackController, updateFeedbackController, deleteFeedbackController, getFeedbackController } = require("../controllers/feedbackController.js");

eventRouter
.get('/my-events/:userId',myEventsController)
.get('/search-events',searchEventsController)
.get('/events/:page',getEventController)
.get('/event/:eventId',getEventByIdController)
.post('/create-event/:userId',createEventController)
.patch('/update-event/:userId/:eventId',updateEventController)
.delete('/delete-event/:userId/:eventId',deleteEventController)
.get('/comments/:eventId/:page',getCommentController)
.post('/create-comment/:userId/:eventId',createCommentController)
.patch('/update-comment/:userId/:commentId',updateCommentController)
.delete('/delete-comment/:userId/:commentId',deleteCommentController)
.get('/feedbacks/:eventId/:page',getFeedbackController)
.post('/create-feedback/:userId/:eventId',createFeedbackController)
.patch('/update-feedback/:userId/:feedbackId',updateFeedbackController)
.delete('/delete-feedback/:userId/:feedbackId',deleteFeedbackController)


module.exports=eventRouter;