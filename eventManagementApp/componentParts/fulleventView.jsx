import { View, Text,ScrollView,SafeAreaView,Image,StatusBar, Pressable, TextInput } from 'react-native'
import React,{useEffect, useState} from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import CommentCard from './commentCard.jsx'
import FeedbackCard from './feedbackCard.jsx'
import { jwtDecode } from "jwt-decode";
import {useAsyncStorage} from '@react-native-async-storage/async-storage'






const EventPreview = ({event,myEvent}) => {
  const baseAddress='http://13.126.182.254:8080';
  const asyncStorage=useAsyncStorage('authToken');
  const [ourEvent,setOurEvent]=useState(false);
  const [deleteModal,setDeleteModal]=useState(false)
  const [bottomScreen,setBottomScreen]=useState('none')
  const [feedbackModal,setFeedbackModal]=useState(false)
  const [selectedStar,setSelectedStar]=useState(0)
  const [feedback,setFeedback]=useState('');
  const [feedbacks,setFeedbacks]=useState('')
  const router=useRouter()
  const [commentText,setCommentText]=useState('')
  const [comments,setComments]=useState('')
  const [userName,setUserName]=useState('')
  const [userId,setUserId]=useState('')
  const [loading,setLoading]=useState(false)
 



  useEffect(()=>{
    
    if(myEvent=='true'){
      setOurEvent(true)}
    async function getCookie(){
     const token=await asyncStorage.getItem();
     console.log(token);
     if(token){
       const decodedToken= jwtDecode(String(token));
       if(decodedToken?.userId){
         setUserName(decodedToken?.name);
         setUserId(decodedToken?.userId)
       }else{
          router.push('/(auth)')
       }
     }else{
       router.push('/(auth)')
     }
    }
     getCookie()
 
    },[])

  async function getFeedbacks(){

    setBottomScreen('feedback') 
    if(!feedbacks){
      const res=await fetch(`${baseAddress}/feedbacks/${event._id}/1`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })
      const result=await res.json()
      console.log(result);
     if(result){
      
      setFeedbacks(result)
      
      
     }
    }
   }

  async function handleFeedback(){
    const res=await fetch(`${baseAddress}/create-feedback/${userId}/${event._id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({feedbackText:feedback,feedbackStars:selectedStar})
    })
    const result=await res.json()
    console.log(result);
    console.log('success');
   if(result){
    event.feedbackCount=event.feedbackCount+1;
    setFeedbacks([...feedbacks,{_id:Date.now(),userId:userId,feedbackText:feedback,feedbackStars:selectedStar}])
   
    setFeedbackModal(false)
   }
  }

 async function deleteEvent(){
  const res=await fetch(`${baseAddress}/delete-event/${userId}/${event._id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    }
  })
  const result=await res.json()
  router.push('/(tabs)/myevents')
 } 

 async function sendComment(){
  
  const res=await fetch(`${baseAddress}/create-comment/${userId}/${event._id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({commentText})
  })
  const result=await res.json()

  console.log(result);
  console.log('comment send');
 if(result){
  event.commentCount=event.commentCount+1;
  setComments([...comments,{_id:Date.now(),userId:userId,commentText:commentText}])
  setCommentText('')
 }
 }


 
 async function getComments(){
  setLoading(true)

  setBottomScreen('comment') 
  if(!comments){
    const res=await fetch(`${baseAddress}/comments/${event._id}/1`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    const result=await res.json()
    console.log(result);
   if(result){
    
    setComments(result)
    
   }
   
  }
  setLoading(false)
 }
  
  return (
    <SafeAreaView>
   
    <ScrollView>
      <Image source={{uri:event.imageUrl}}style={{height:190,width:"100%"}}/>
    <View style={{backgroundColor:'white',padding:20}}>
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "light", color: "gray" }}
        >
         {event.date}
        </Text>
        <View style={{ display: "flex", flexDirection: "row" ,alignItems:"center",justifyContent:"center"}}>
          <SimpleLineIcons name="badge" size={18} color="black" />
          <Text
            style={{ fontSize: 18, fontWeight: "light", color: "gray",marginLeft:4 }}
          >
            {event.category}
          </Text>
        </View>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 30, opacity: 0.8 }}>
        {event.eventName}
      </Text>
      <Text
        style={{ fontSize: 18, fontWeight: "light", color: "gray" }}
      >
       {event.description}
      </Text>


      <Text style={{fontSize:25,fontWeight:'bold',marginTop:10}}>
        Organiser-: {event.organiserName}
        </Text>
      <Text style={{fontSize:25,fontWeight:'bold'}}>
        Contact-: {event.contact}
        </Text>

      <View
        style={{
          display: "flex",
          flexDirection: 'column',
          marginTop: 10,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row",justifyContent:"center",alignItems:'center' }}>
          <Feather name="map-pin" size={28} color="black" />
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "black" ,opacity:0.7,marginLeft:8}}
          >
            {event.location}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row",alignItems:'center',marginTop:10 }}>
          <AntDesign name="star" size={28} color="gray" />
          <Text
            style={{ fontSize: 20, fontWeight: "bold", color: "black",opacity:0.7,marginLeft:8 }}
          >
            {event.feedbackCount}
          </Text>
        </View>
      </View>
    </View>
    

    <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
    <Pressable style={{marginVertical:30,display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#d9d9d9',borderRadius:20,padding:
      10,paddingHorizontal:30
    }} onPress={()=>{if(bottomScreen=='comment'){ setBottomScreen('none')}else{getComments()}}}>
    <FontAwesome name="comment-o" size={38} color="black" />
      <Text style={{marginLeft:8,fontSize:28}}>
        {event.commentCount}
        </Text>
    </Pressable>

    <Pressable style={{marginVertical:30,display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#d9d9d9',borderRadius:20,padding:
    10,paddingHorizontal:30
    }} onPress={()=>{if(bottomScreen=='feedback'){ setBottomScreen('none')}else{getFeedbacks()}}}>
    <MaterialIcons name="feedback" size={38} color="black" />
      <Text style={{marginLeft:8,fontSize:28}}>
        {event.feedbackCount}
        </Text>
    </Pressable>
    </View>


    {
      
        bottomScreen=='comment' && 
      <View style={{display:'flex',flexDirection:'column',backgroundColor:"#d9d9d9"}}>
        <Text style={{fontWeight:"bold",fontSize:25,margin:10}}>Comments</Text>
        {
          comments ?
          comments.map((comment)=>(
            <CommentCard comment={comment} key={comment._id}/>
    
          ))
          :
          <Text style={{fontWeight:"bold",fontSize:30,textAlign:'center',marginTop:15}}>Loading...</Text>
        
          
        }
       <View  style={{backgroundColor:"white",padding:15,marginHorizontal:8,borderRadius:50,display:"flex",flexDirection:"row",alignItems:"center",marginVertical:20,justifyContent:"space-between"}}>
       <TextInput placeholder='comment here...' style={{padding:3,fontSize:16,width:'88%'}}  value={commentText} onChangeText={(text)=>setCommentText(text)} />
       <Pressable style={{paddingHorizontal:10}} onPress={sendComment}><FontAwesome name="send-o" size={24} color="black"  /></Pressable>
       </View>
      </View >
    
       
    }

    {
      bottomScreen=='feedback' && 
      <View style={{display:'flex',flexDirection:'column',backgroundColor:"#d9d9d9"}}>
        <Text style={{fontWeight:"bold",fontSize:25,margin:10}}>
          feedbacks

        </Text>
        {
          feedbacks ? feedbacks.map((feed)=>(<FeedbackCard feed={feed} key={feed._id}/>)) :  <Text style={{fontWeight:"bold",fontSize:30,textAlign:'center',marginTop:15}}>Loading...</Text>
        }
      
      <Pressable style={{marginHorizontal:10,backgroundColor:'green',borderRadius:50,padding:15,display:'flex',justifyContent:'center',alignItems:'center',marginBottom:20}} onPress={()=>setFeedbackModal(true)}><Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Give Feedback</Text></Pressable>
        </View>

    }



   {
    !ourEvent &&
    <Pressable style={{ backgroundColor:'#ED0800',borderRadius:50,padding:15,display:'flex',justifyContent:"center",alignItems:"center"}} onPress={()=>router.push(`/registerEvent?eventId=${event._id}`)}>
    <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
      Register
      </Text>
  </Pressable>
   }
   {
    ourEvent &&
    <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between"}}>
    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#cc3333',borderRadius:20,padding:
      10,paddingHorizontal:40
    }}
    onPress={()=>setDeleteModal(true)}>
   
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>
        Delete
        </Text>
    </Pressable>

    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#00cc00',borderRadius:20,padding:
    10,paddingHorizontal:40
    }} onPress={()=>router.push(`/updateevent?eventId=${event._id}`)}>
    
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>
        Update
        </Text>
    </Pressable>
    </View>
   }


   

   

    </View>

 

    {
    deleteModal &&
    <View style={{position:'absolute',height:'100%',width:'100%',display:'flex',alignItems:"center"}}>
        <View style={{position:'absolute',width:"80%",backgroundColor:"#d9d9d9",borderRadius:20,bottom:300,padding:10}}>
            <Text style={{fontWeight:"bold",fontSize:33,textAlign:'center'}}>Do you want to delete!!</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",marginTop:20}}>
    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
      10,paddingHorizontal:18
    }}
    onPress={()=>setDeleteModal(false)}>
   
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Close</Text>
    </Pressable>

    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
    10,paddingHorizontal:18
    }} onPress={deleteEvent}>
    
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Delete</Text>
    </Pressable>
        </View>
        </View>
    </View>
   }
   {
         feedbackModal &&
       <View style={{position:'absolute',height:'100%',width:'100%',display:'flex',alignItems:"center"}}>
        <View style={{position:'absolute',width:"80%",backgroundColor:"#d9d9d9",borderRadius:20,bottom:300,padding:10}}>
            <Text style={{fontWeight:"bold",fontSize:25,textAlign:'center'}}>Submit your feedback</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:"center",marginVertical:20}}>


            <AntDesign name={selectedStar>=1 ? 'star':'staro'} size={38} color="black" onPress={()=>setSelectedStar(1)}/>
            <AntDesign name={selectedStar>=2 ? 'star':'staro'} size={38} color="black" onPress={()=>setSelectedStar(2)}/>
            <AntDesign name={selectedStar>=3 ? 'star':'staro'} size={38} color="black" onPress={()=>setSelectedStar(3)}/>
            <AntDesign name={selectedStar>=4 ? 'star':'staro'} size={38} color="black" onPress={()=>setSelectedStar(4)}/>
            <AntDesign name={selectedStar==5 ? 'star':'staro'} size={38} color="black" onPress={()=>setSelectedStar(5)}/>


            </View>

            <TextInput placeholder='feedback here....' style={{padding:18,backgroundColor:"#f9f9f9",borderRadius:50,paddingHorizontal:20}} onChangeText={(text)=>setFeedback(text)}/>

            <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",marginTop:20}}>
    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
      10,paddingHorizontal:18
    }}
    onPress={()=>setFeedbackModal(false)}>
   
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Close</Text>
    </Pressable>

    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
    10,paddingHorizontal:18
    }} onPress={handleFeedback}>
    
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Submit</Text>
    </Pressable>
        </View>
        </View>
    </View>
   }
    
   
    </ScrollView>
    

    </SafeAreaView>
  
  )
}

export default EventPreview