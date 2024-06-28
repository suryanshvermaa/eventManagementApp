const Event=require('../models/eventModel.js');
const User=require('../models/userModel.js')


exports.getEventByIdController=async(req,res)=>{
    try {
        const eventId=req.params.eventId;
        const event=await Event.findOne({_id:eventId});
        res.json(event);

    } catch (error) {
        res.status(400).json('not found');
    }
}

exports.myEventsController=async(req,res)=>{
    try {
        const userId=req.params.userId;
        const events=await Event.find({userId});
        res.json(events);

    } catch (error) {
        res.status(400).json('not found');
    }
}

exports.searchEventsController=async(req,res)=>{
   const search=req.query.search;
   let pathName='eventName';
   let searchProp;
   if(search=='eventName'){
    searchProp=req.query.eventName
    pathName='eventName'
   }if(search=='category'){
    searchProp=req.query.category
    pathName='category'
   }if(search=='date'){
    searchProp=String(req.query.date)
    pathName='date'
    const arrProp=searchProp.split('-');
    searchProp=arrProp.join('/')
   }if(search=='location'){
    searchProp=req.query.location
    pathName='location'
   }
   console.log(pathName,searchProp);
   try {
    
        const events=await Event.aggregate([
            {
                $search:{
                    index:"events",
                    autocomplete:{
                        query:searchProp,
                        path:pathName,
                        
                        fuzzy:{
                            maxEdits:1,
                        }
                    }
                }
            },
            {
                $limit:15,
            }
        ])
        if(events) return res.json(events);
    
        
    
   } catch (error) {
    res.status(400).json('not found')
   }
 
}

exports.getEventController=async(req,res)=>{
   const page=req.params.page;
   const skipNumber=Number(20*(page-1))

   try {
       const events=await Event.find().skip(skipNumber).limit(20);
       res.json(events);
   } catch (error) {
       res.status(400).json('error in getting events');
   }
}

exports.createEventController=async(req,res)=>{
   const userId=req.params.userId;
   const commentCount=0;
   const feedbackCount=0;
   const registrationCount=0;
   const {eventName,date,time,description,organiserName,organiserContact,category,location,imageUrl}=req.body;
   console.log(eventName,date,time,description,organiserName,organiserContact,category,location);
   try {
    const event=new Event({
        eventName,date,time,description,organiserName,organiserContact,category,location,userId,commentCount,feedbackCount,registrationCount,imageUrl
       });
    
       await event.save();
      return res.json('event created successfully').status(201);
   } catch (error) {
      res.json('failed to created event').status(401);
   }
}

exports.updateEventController=async(req,res)=>{
    const userId=req.params.userId;
    const eventId=req.params.eventId;
    const {eventName,date,time,description,organiserName,organiserContact,category,location,imageUrl}=req.body;
    const event=await Event.findOne({_id:eventId,userId});
    if(event){
        event.eventName=eventName
        event.date=date
        event.time=time,
        event.description=description
        event.organiserName=organiserName
        event.organiserContact=organiserContact
        event.category=category
        event.location=location
        event.imageUrl=imageUrl
        await event.save()
       return res.json('updated successfully')
    }
    res.json('failed to update').status(400);

}
exports.deleteEventController=async(req,res)=>{
    const userId=req.params.userId;
    const eventId=req.params.eventId;
    const user=await User.findOne({_id:userId});
    if(user){
        const deteteEvent=await Event.findByIdAndDelete(eventId);
        if(deteteEvent){
           return res.json('event deleted successfully');
        }
       return res.json('failed to event deletion').status(400)
    }
    res.json('failed to event deletion').status(400)
}