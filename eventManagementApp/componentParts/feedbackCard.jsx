import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';


const FeedbackCard = ({feed}) => {
  const [userName,setUserName]=useState('')
  const baseAddress='http://13.126.182.254:8080';
  useEffect(()=>{
     fetch(`${baseAddress}/profile/${feed.userId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
     
         setUserName(data.name)
    })
   
  },[])
  return (
    <View style={{padding:10,backgroundColor:"white",marginHorizontal:10,borderRadius:20,borderTopLeftRadius:0,marginBottom:20}}>
       <Text style={{fontWeight:"bold",fontSize:20}}>{userName}</Text>
       <View style={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:'center',marginVertical:10
       }}>
       <AntDesign name={feed.feedbackStars>=1?'star':'staro'} size={38} color="black" />
       <AntDesign name={feed.feedbackStars>=2?'star':'staro'} size={38} color="black" />
       <AntDesign name={feed.feedbackStars>=3?'star':'staro'} size={38} color="black" />
       <AntDesign name={feed.feedbackStars>=4?'star':'staro'} size={38} color="black" />
       <AntDesign name={feed.feedbackStars==5?'star':'staro'} size={38} color="black" />
       </View>

       <Text style={{fontWeight:'light',fontSize:18,textAlign:'center'}}>
       {feed.feedbackText}
       </Text>
    </View>
  )
}

export default FeedbackCard