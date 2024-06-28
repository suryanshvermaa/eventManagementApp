const Registration=require('../models/registrationModel.js')
const Event=require('../models/eventModel.js')

exports.registrationController=async(req,res)=>{
    const eventId=req.params.eventId;
    const {name,contact,age,bio,company_college}=req.body;
    
    const registration=new Registration({
        eventId,name,contact,age,bio,company_college
    })
    
    await registration.save();
    const event=await Event.findOne({_id:eventId});
    const registrationCount=event.registrationCount;
    const count=registrationCount+1;
    event.registrationCount=count;
    await event.save()

    res.json('success');
    
}
exports.getRegistrationController=async(req,res)=>{
    const eventId=req.params.eventId;
    const registrations=await Registration.find({eventId})
    res.json(registrations);
    
}