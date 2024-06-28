import { View, Text ,Image,TextInput,ScrollView,Pressable,SafeAreaView,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
import {jwtDecode} from 'jwt-decode'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router'

export default function UpdateEventComponent({eventId}){
    const baseAddress='http://13.126.182.254:8080';
    const asyncStorage=useAsyncStorage('authToken');
    const [userName,setUserName]=useState('');
    const [userId,setUserId]=useState('');
   
    const [eventName,setEventName]=useState('');
    const [date,setDate]=useState('');
    const [time,setTime]=useState('');
    const [description,setDescription]=useState('');
    const [organiserName,setOrganiserName]=useState('');
    const [organiserContact,setOrganiserContact]=useState('');
    const [category,setCategory]=useState('');
    const [location,setLocation]=useState('');
    const [imageUrl,setImageUrl]=useState('');
    const router=useRouter()
   

    const images=[
        {
          _id:1,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image1.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image1.jpg'
        },
        {
          _id:2,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image2.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image2.jpg'
        },
        {
          _id:3,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image3.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image3.jpg'
        },
        {
          _id:4,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image4.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image4.jpg'
        },
        {
          _id:5,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image5.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image5.jpg'
        },
        {
          _id:6,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image6.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image6.jpg'
        },
        {
          _id:7,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image7.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image7.jpg'
        },
        {
          _id:8,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image8.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image8.jpg'
        },
        {
          _id:9,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image9.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image9.jpg'
        },
        {
          _id:10,
          urlforShowing:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image10.jpg',
          url:'https://s3.ap-south-1.amazonaws.com/testingsuryansh.bucket/images/image10.jpg'
        }
      ]

      

  useEffect(()=>{
    async function getCookie(){
     const token=await asyncStorage.getItem();
     console.log(token);
     if(token){
       const decodedToken= jwtDecode(String(token));
       if(decodedToken?.userId){
         setUserName(decodedToken?.name);
         setUserId(decodedToken?.userId)
         console.log(decodedToken?.userId);
       }else{
          router.push('/(auth)')
       }
     }else{
       router.push('/(auth)')
     }
    }
     getCookie()
 
    },[])

    const updateEventHandler=async()=>{
        const dataObj={eventName,date,time,description,organiserContact,organiserName,category,location,imageUrl}
        console.log(dataObj);
        try {
          const res=await fetch(`${baseAddress}/update-event/${userId}/${eventId}`,{
            method:"PATCH",
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify(dataObj)
           })
           const result=await res.json();
           if(result){
            console.log("success");
           router.push('/(tabs)/myevents')
           }

        } catch (error) {
          console.log(error);
        }
      }
    



    return (
        <>
        <Image source={require('../assets/images/eventCreate.jpg')} style={{height:190,width:'100%'}}/>
      <View style={{padding:20, backgroundColor:'white',display:'flex',flexDirection:"column"}}>
      
       
            
      <View>
      <Text  style={{marginVertical:8}}>Event Name</Text>
      <TextInput placeholder='event name..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}} onChangeText={(text)=>setEventName(text)} />
      </View>
       


        <View>
        <Text  style={{marginVertical:8}}>Description</Text>
        <TextInput placeholder='description..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}} onChangeText={(text)=>setDescription(text)}/>
        </View>
     
         
          
            <View style={{marginVertical:10}}>
            <Text style={{fontSize:16,fontWeight:"normal"}}>Select Image for your event</Text>
            <ScrollView horizontal style={{marginVertical:10}}>
              
            
            {
              images && images.map((image)=>
              <Pressable key={image._id} onPress={()=>setImageUrl(image.url)}  ><View style={imageUrl==image.url && {position:'absolute',backgroundColor:'black',height:'100%',width:'100%',borderRadius:20,zIndex:100,opacity:0.4,display:"flex",alignItems:"center",justifyContent:"center",flexDirection:'column'}}><AntDesign name="checkcircle" size={imageUrl==image.url&& 40} color="white" /><Text style={{color:'white',fontWeight:'bold',fontSize:30}}>{imageUrl==image.url&& 'Selected'}</Text></View><Image source={{uri:image.urlforShowing}} style={{height:200,width:260,borderRadius:20,backgroundColor:"black"}} /></Pressable>
               
              )
            }
             </ScrollView>
            </View>

         
         

       <View>
       <Text  style={{marginVertical:8}}>Organiser Name</Text>
         <TextInput placeholder='organiser name..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}} onChangeText={(text)=>setOrganiserName(text)}/>

       </View>

        <View style={{display:'flex',flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{width:'48%'}}>
          <Text  style={{marginVertical:8}}>Date</Text>
           <TextInput placeholder='date..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:18,borderRadius:10}} onChangeText={(text)=>setDate(text)}/>
          </View>
          <View style={{width:"48%"}}>
          <Text  style={{marginVertical:8}}>Time</Text>
          <TextInput placeholder='time..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:18,borderRadius:10}} onChangeText={(text)=>setTime(text)}/>
          </View>

        </View>

        <View>
        <Text  style={{marginVertical:8}}>Contact</Text>
        <TextInput placeholder='contact..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:18,borderRadius:10}} onChangeText={(text)=>setOrganiserContact(text)}/>
        </View>

       <View>
       <Text  style={{marginVertical:8}}>Location</Text>
       <TextInput placeholder='loaction..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:18,borderRadius:10}} onChangeText={(text)=>setLocation(text)}/>
       </View>

       <View>
       <Text  style={{marginVertical:8}}>Category</Text>
      <TextInput placeholder='Category..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:18,borderRadius:10}} onChangeText={(text)=>setCategory(text)}/>

       </View>
   
      <Pressable style={{backgroundColor:'#7186f1',padding:16,borderRadius:10,display:'flex',flexDirection:"row",justifyContent:"center",marginTop:20,marginBottom:70}} onPress={updateEventHandler} > 
        <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>update</Text>
         </Pressable>
        
      
      
       </View>
       </>

    )
}