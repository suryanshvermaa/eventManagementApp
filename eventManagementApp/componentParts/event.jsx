import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Feather from "@expo/vector-icons/Feather";
import { Text, View, Image ,Pressable} from "react-native";
import { useRouter } from "expo-router";
import moment from "moment";

export default function EventCard({event,myEvent}){
  const baseAddress='http://localhost:8080';
  const router=useRouter()
  let description=String(event.description);
  if(description.lenght>45){
      description=description.slice(0,45);
  }
  let eventName=String(event.eventName);
  if(eventName.length>16){
    eventName=eventName.slice(0,16)
  }

   return (
    
    <>
    <Pressable
    style={{
      marginVertical: 10,
      padding: 10,
      backgroundColor: "#f4f4f4",
      display: "flex",
      flexDirection: "column",
      borderRadius: 20,
      width: 220,
      marginHorizontal:10,
      
    }}
    onPress={()=>router.push(`/eventPreview?eventId=${event._id}&myEvent=${myEvent}`)}
  >
    <Image
      source={{uri:event.imageUrl}}
      style={{
        height: 130,
        width: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    ></Image>
    <View >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text
          style={{ fontSize: 13, fontWeight: "light", color: "gray" }}
        >
          {event.date}
        </Text>
        <View style={{ display: "flex", flexDirection: "row",alignItems:"center" }}>
          <SimpleLineIcons name="badge" size={14} color="black" />
          <Text
            style={{ fontSize: 14, fontWeight: "light", color: "gray" ,marginLeft:5}}
          >
            {event.category}
          </Text>
        </View>
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 20, opacity: 0.8 }}>
        {eventName}..
      </Text>
      <Text
        style={{ fontSize: 13, fontWeight: "light", color: "gray" }}
      >
        {description}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row",alignItems:"center" }}>
          <Feather name="map-pin" size={14} color="gray" />
          <Text
            style={{ fontSize: 14, fontWeight: "light", color: "gray",marginLeft:5 }}
          >
            {String(event.location).slice(0,6)}...
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row",alignItems:'center' }}>
          <AntDesign name="star" size={14} color="gray" />
          <Text
            style={{ fontSize: 14, fontWeight: "light", color: "gray" ,marginLeft:5}}
          >
            {event.feedbackCount}
          </Text>
        </View>
      </View>
    </View>
    </Pressable>
    </>
    
   )
}