
import {Text,SafeAreaView,View,Image,ScrollView} from 'react-native';
import EventListCard from '@/componentParts/eventListCard';
import { useState ,useEffect} from 'react';
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {useAsyncStorage} from '@react-native-async-storage/async-storage'





export default function MyEvents (id) { 

  const [userId,setUserId]=useState('');
  const [userName, setUserName] = useState('');
  const router=useRouter()
  const [events,setEvents]=useState([]);
  const asyncStorage=useAsyncStorage('authToken');
  const baseAddress='http://13.126.182.254:8080';


  function fetchEvents(id){

          
    fetch(`${baseAddress}/my-events/${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      setEvents(data);
      console.log(data);
    })
    
   
   
   }
  
  useEffect(()=>{
  async function getCookie(){
   const token=await asyncStorage.getItem();
   console.log(token);
   if(token){
     const decodedToken= jwtDecode(String(token));
     if(decodedToken?.userId){
       setUserName(decodedToken?.name);
       setUserId(decodedToken?.userId)
       console.log(decodedToken.userId);
       fetchEvents(decodedToken.userId)
     }else{
        router.push('/(auth)')
     }
   }else{
     router.push('/(auth)')
   }
  }

  
   
   getCookie()
   
   
     
     
   
   

  },[])


  



  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={require('../../assets/images/eventCreate.jpg')} style={{height:190,width:'100%'}}/>



     <View style={{padding:20,backgroundColor:"white",marginBottom:70}} >
      <View  >

        <Text style={{fontWeight:'bold',fontSize:28,marginVertical:20}}>
          My Events
          </Text>
        <View>
       

          
         {
          events ? events.map((event)=>( <EventListCard event={event} key={event._id} myEvent={true}/>)
          ) : <Text>loading ...</Text>
         }

        </View>
 
      </View>
       
     </View>
     </ScrollView>
    </SafeAreaView>
  );
}