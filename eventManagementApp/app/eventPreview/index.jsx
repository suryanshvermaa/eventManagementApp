import React, { useEffect, useState } from "react";
import { ScrollView,Text } from "react-native";
import EventPreview from '../../componentParts/fulleventView.jsx' 
import { useLocalSearchParams } from "expo-router";



export default function FullEvent(){


    const queryParameter=useLocalSearchParams()
    const [eventId,setEventId]=useState(queryParameter.eventId);
    const [event,setEvent]=useState('')
    const [myEvent,setMyEvent]=useState(queryParameter.myEvent);
    const baseAddress='http://13.126.182.254:8080';
    
   
    

    useEffect(()=>{
       
       if(eventId){
        async function getEvent(){
            const res=await fetch(`${baseAddress}/event/${eventId}`,{
                method:"GET",
                headers:{
                    "Content-Type":"applicetion/json"
                }
            })
            const result=await res.json();
            console.log(result);
            setEvent(result)
           
        }
        getEvent();
        
       }
    },[])


    
        return (
            <ScrollView>
           {
            event ? <EventPreview event={event} myEvent={myEvent}/> : <Text style={{fontWeight:'bold',fontSize:35,textAlign:'center',marginTop:20}}>Loading...</Text>
           }
           </ScrollView>
        )
    }
