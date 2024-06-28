import { View,Text ,Image,Pressable} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";


export default function EventListCard({event,myEvent}){
  const baseAddress='http://localhost:8080';
  
  let eventName=String(event.eventName);
  if(eventName.length>18){
    eventName=eventName.slice(0,18)
  }

  const router=useRouter()
  let description=String(event.description);
  if(description.length>70){
      description=description.slice(0,70);
  }

    return (
        <Pressable style={{backgroundColor: "#f4f4f4",borderRadius:20,padding:10,marginVertical:8,display:'flex',flexDirection:'row',width:'100%'}} onPress={()=>router.push(`/eventPreview?eventId=${event._id}&myEvent=${myEvent}`)}>
            <Image source={{uri:event.imageUrl}} style={{height:100,width:90,borderRadius:20}}></Image>
          <View style={{marginLeft:6}}>

          <View
        style={{
          display: "flex",
          flexDirection: "row",
          
          
         
        }}
      >
        <Text
          style={{ fontSize: 14, fontWeight: "light", color: "gray" }}
        >
          {event.date}
        </Text>
        <View style={{ display: "flex", flexDirection: "row",marginHorizontal:100}}>
          <SimpleLineIcons name="badge" size={14} color="black" />
          <Text
            style={{ fontSize: 10, fontWeight: "light", color: "gray" }}
          >
            {event.category}
          </Text>
        </View>
        </View>

        <Text style={{ fontWeight: "bold", fontSize: 20, opacity: 0.8 }}>
        {eventName}..
        
      </Text>
      <Text
        style={{ fontSize: 13, fontWeight: "light", color: "gray",width:'55%' }}
      >
        {description}...
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Feather name="map-pin" size={14} color="gray" />
          <Text
            style={{ fontSize: 14, fontWeight: "light", color: "gray",marginLeft:3 }}
          >
           {String(event.location).slice(0,6)}...
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" ,alignItems:'center',justifyContent:"center"}}>
          <AntDesign name="star" size={18} color="gray" />
          <Text
            style={{ fontSize: 10, fontWeight: "light", color: "gray" }}
          >
            {event.feedbackCount}
          </Text>
        </View>
        </View>
          </View>
        
            
        </Pressable>
    )
}