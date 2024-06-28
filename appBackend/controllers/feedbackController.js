const Feedback=require('../models/feedbackModel.js')
const User=require('../models/userModel.js')
const Event=require('../models/eventModel.js')






exports.getFeedbackController=async(req,res)=>{
    const eventId=req.params.eventId;
    const page=req.params.page;
    const skipNumber=Number(8*(page-1))
    try {
        const feedbacks=await Feedback.find({eventId}).skip(skipNumber).limit(8);
        res.json(feedbacks);
    } catch (error) {
        res.json('error in getting feedbacks').status(400);
    }

}


exports.createFeedbackController=async(req,res)=>{
    const userId=req.params.userId;
    const eventId=req.params.eventId;
    const {feedbackText,feedbackStars}=req.body;
    try {
        const feedback=new Feedback({
            userId,
            eventId,
            feedbackText,
            feedbackStars
        })
        await feedback.save()
        const event=await Event.findOne({_id:eventId});
        event.feedbacks.push({feedbackId:feedback._id})
        const fCount=event.feedbackCount;
        const count=fCount+1;
        event.feedbackCount=count;
        await event.save()
        res.json('feedback saved');
    } catch (error) {
        res.json('error in feedback to save').status(400);
    }
}
exports.updateFeedbackController=async(req,res)=>{
    const userId=req.params.userId;
    const feedbackId=req.params.eventId;
    const {feedbackText,feedbackStars}=req.body;
    try {
        const user=await User.findOne({_id:userId})
        if(user){
            const feedback=await Feedback.findOne({_id:feedbackId})
        feedback.feedbackStars=feedbackStars;
        feedback.feedbackText=feedbackText;
        await feedback.save();
         return res.json('feedback updated');
        }
        res.json('error in feedback to update').status(400);
    } catch (error) {
        res.json('error in feedback to update').status(400);
    }
}

exports.deleteFeedbackController=async(req,res)=>{
    const userId=req.params.userId;
    const feedbackId=req.params.eventId;
    try {
        const user=await User.findOne({_id:userId})
        if(user){
            const feedback=await Feedback.findByIdAndDelete(feedbackId)
            const event=await Event.findOne({_id:eventId});
            const fCount=event.feedbackCount;
            const count=fCount-1;
            event.feedbackCount=count;
            await event.save()
            return res.json('feedback deleted');
        }
       return  res.json('error in feedback to delete').status(400);
        
    } catch (error) {
        return  res.json('error in feedback to delete').status(400);
    }
}