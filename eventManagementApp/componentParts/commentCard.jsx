import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

const CommentCard = ({comment}) => {
  const baseAddress='http://13.126.182.254:8080';
  const [userName,setUserName]=useState('')
  useEffect(()=>{
     fetch(`${baseAddress}/profile/${comment.userId}`,{
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
    <View style={{backgroundColor:"white",borderRadius:20,borderTopLeftRadius:0,marginVertical:10,padding:10,marginHorizontal:5}}>
       <Text style={{fontWeight:"bold",fontSize:20}}>{userName}</Text>
       <Text style={{fontWeight:'light',fontSize:16}}>
       {comment.commentText}
       </Text>
    </View>
  )
}

export default CommentCard