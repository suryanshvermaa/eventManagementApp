import { SafeAreaView, Text, View, Image,ScrollView, Pressable } from "react-native";
import { useState,useEffect } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import EventCard from "@/componentParts/event.jsx";
import EventListCard from "@/componentParts/eventListCard.jsx";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
import moment from "moment";


export default function HomeScreen() {
  const baseAddress='http://13.126.182.254:8080';
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [events,setEvents]=useState([]);
  const [todayEvents,setTodayEvents]=useState('');
  const [upcomingEvents,setUpcomingEvents]=useState('')
  const router=useRouter()
  const asyncStorage=useAsyncStorage('authToken');
  const [currentDate,setCurrentDate]=useState(moment().format('DD/MM/YYYY'))
  const [logoutModal,setLogoutModal]=useState(false)

  

  async function handleLogout(){
    asyncStorage.removeItem()
    router.push('/(auth)')
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
      }else{
         router.push('/(auth)')
      }
    }else{
      router.push('/(auth)')
    }
   }
    getCookie()

   },[])
   useEffect(()=>{
    async function fetchEvents(){
      const res=await fetch(`${baseAddress}/events/1`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      });
      const result=await res.json();
      setEvents(result);
      console.log(result);
    }
    fetchEvents()
   },[])


   

  return (
    <ScrollView>
      <View style={{ padding: 20, backgroundColor: "white",marginBottom:70 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop:20
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "#4a4949",
                opacity: 45,
              }}
            >
              Hello {userName.split(' ')[0]}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "light", color: "gray" }}>
              welcome to app
            </Text>
          </View>
          <Image
          source={require('../../assets/images/profilepic1.jpeg')}
            style={{
              height: 65,
              width: 65,
              borderRadius: 50,
              backgroundColor: "#d9d9d9",
            }}
          />
        </View>
        <Pressable
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 15,
            marginVertical: 30,
            backgroundColor: "#d9d9d9",
            borderRadius: 50,
            alignItems: "center",
          }}
          onPress={()=>router.push('/searchscreen')}
        
        >
          <AntDesign name="search1" size={24} color="gray" />
          <Text style={{ color: "gray", marginLeft: 12 }}>
            Browse all events..
          </Text>
        </Pressable>
        <Pressable style={{backgroundColor:'gray',borderRadius:50,padding:10,margin:10,paddingHorizontal:20,justifyContent:"center",alignItems:"center"}} onPress={()=>setLogoutModal(true)}>
              <Text style={{fontWeight:"bold",fontSize:24}}>Logout</Text>
            </Pressable>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: "#4a4949",
            opacity: 45,
          }}
        >
          Today's Events
        </Text>
        
        <View style={{display:'flex',flexDirection:'row'}}>
          
          <ScrollView  horizontal >
            
          {
              events && events.map((event)=>{
                if(event.date==currentDate &&event.userId!=userId){
                   return (
                    <EventCard key={event._id} event={event} myEvent={false}/>
                   )
                }
              }
              )
            }
            

            
         
          

          </ScrollView>
        </View>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: "#4a4949",
            opacity: 45,
            marginTop:10
          }}
        >
          Upcoming Events
        </Text>
        <ScrollView >
            {
              events && events?.map((event)=>{
                if(event.date!=currentDate&&event.userId!=userId){
                   return (
                    <EventListCard key={event._id} event={event} myEvent={false}/>
                   )
                }
              }
              )
            }
          
          </ScrollView>
      </View>

      {
    logoutModal &&
    <View style={{position:'absolute',height:'100%',width:'100%',display:'flex',alignItems:"center"}}>
        <View style={{position:'absolute',width:"80%",backgroundColor:"#d9d9d9",borderRadius:20,top:340,padding:10}}>
            <Text style={{fontWeight:"bold",fontSize:33,textAlign:'center'}}>Do you want to Logout!!</Text>
            <View style={{display:'flex',flexDirection:'row',justifyContent:"space-between",marginTop:20}}>
    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
      10,paddingHorizontal:18
    }}
    onPress={()=>setLogoutModal(false)}>
   
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Close</Text>
    </Pressable>

    <Pressable style={{display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'gray',opacity:0.6,borderRadius:20,padding:
    10,paddingHorizontal:18
    }} onPress={handleLogout}>
    
      <Text style={{marginLeft:8,fontSize:28,fontWeight:'semibold'}}>Logout</Text>
    </Pressable>
        </View>
        </View>
    </View>
   }
    </ScrollView>
  );
}
