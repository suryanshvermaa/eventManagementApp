const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    commentText:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;