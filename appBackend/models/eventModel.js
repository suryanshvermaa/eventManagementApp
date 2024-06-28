const mongoose=require('mongoose');


const eventSchema=new mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    organiserName:{
        type:String,
        required:true
    },
    organiserContact:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    comments:[{commentId:{
        type:mongoose.Schema.Types.ObjectId
    }}],
    feedbacks:[{feedbackId:{
        type:mongoose.Schema.Types.ObjectId
    }}],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
       
    },
    commentCount:{
        type:Number,
        required:true
    },
    feedbackCount:{
        type:Number,
        required:true
    },
    registrationCount:{
        type:Number,
        required:true
    }

})
const Event=mongoose.model("Event",eventSchema);
module.exports=Event;