const mongoose = require('mongoose')

const registrationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    company_college:{
        type:String,
        required:true
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
})

const Registration=mongoose.model('Registration',registrationSchema)
module.exports=Registration;
