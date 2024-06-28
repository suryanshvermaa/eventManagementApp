const Comment=require('../models/commentModel.js')
const User=require('../models/userModel.js')
const Event=require('../models/eventModel.js')


exports.getCommentController=async(req,res)=>{
    const eventId=req.params.eventId;
    const page=req.params.page;
    const skipNumber=Number(8*(page-1))
    try {
        const comments=await Comment.find({eventId}).skip(skipNumber).limit(8);
        res.json(comments);
    } catch (error) {
        res.json('error in getting comments').status(400);
    }
}

exports.createCommentController=async(req,res)=>{
    const userId=req.params.userId;
    const eventId=req.params.eventId;
    const {commentText}=req.body;
    console.log(userId,eventId,commentText,req.body);
    try {

        const comment=new Comment({userId,eventId,commentText})
      
        await comment.save();
        
        
        const event=await Event.findOne({_id:eventId});
       
        event.comments.push({commentId:comment._id})
       
        const cCount=event.commentCount;
        const count=cCount+1;
        event.commentCount=count;
        await event.save()
        res.json('created comment');
    } catch (error) {
        console.log(error);
        res.json('failed comment creation').status(400);
    }
    
}
exports.updateCommentController=async(req,res)=>{
    const commentId=req.params.commentId;
    const {commentText}=req.body;
    try {
        const comment=await Comment.findOne({_id:commentId})
        comment.commentText=commentText
        await comment.save()
        res.json('comment updated')
    } catch (error) {
        res.json('comment updatation failed').status(400)
        
    }

}
exports.deleteCommentController=async(req,res)=>{
    const userId=req.params.userId;
    const commentId=req.params.commentId;
    try {
        const user=await User.findOne({_id:userId});
        if(user){
            const comment=await Comment.findByIdAndDelete(commentId)
            const event=await Event.findOne({_id:eventId});
            const cCount=event.commentCount;
            const count=cCount-1;
            event.commentCount=count;
            res.json('comment deleted ')
        }
    } catch (error) {
        res.json('error in comment deletion')
    }
}