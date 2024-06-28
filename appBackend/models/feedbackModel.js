const mongoose=require('mongoose');

const feedbackSchema=new mongoose.Schema({
    feedbackText:{
        type:String,
        required:true
    },
    feedbackStars:{
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
const Feedback=mongoose.model('Feedback',feedbackSchema);
module.exports=Feedback;