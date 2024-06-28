import { View, Text,SafeAreaView, TextInput ,ScrollView,StatusBar, Pressable,Animated} from 'react-native'
import React, { useState } from 'react'
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import EventListCard from '@/componentParts/eventListCard';

const SearchScreen = () => {
  const baseAddress='http://13.126.182.254:8080';

    const [searchBy,setSearchBy]=useState('eventName')
    const [select,setSelect]=useState(false)
    const [events,setEvents]=useState('')
    const [saerchInput,setSearchInput]=useState('')

    async function handleSearchCategory(category){
      setSearchBy(category);
      setSelect(false)
    }

    async function handleSearch(text){
     if(String(text).length>=3){
      console.log(text);
      try {
        const res=await fetch(`${baseAddress}/search-events/?${searchBy}=${text}&search=${searchBy}`,{
          method:"GET",
          headers:{
            "Accept":"application/json",
            "Content-Type":"application/json"
          }
         })
         const result=await res.json();
         console.log(result);
         setSearchInput(text)
        setEvents(result)
  
      } catch (error) {
        console.log(error);
      }
     }
    }
  return (
    
    <ScrollView>
    <SafeAreaView>
        <View style={{padding:20,backgroundColor:'white',minHeight:1000}}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            padding: 15,
            marginVertical: 30,
            backgroundColor: "#f4f4f4",
            borderRadius: 50,
            alignItems: "center",
            justifyContent:"space-between",
      
          }}
        >
          <AntDesign name="search1" size={24} color="gray" />
          <TextInput style={{ color: "gray", marginLeft: 12,width:'80%' }} placeholder={`search by ${searchBy}`} onChangeText={(text)=>handleSearch(text)}/>
          <AntDesign name={select?'closecircleo':'bars'} size={26} color="gray" onPress={()=>setSelect(!select)}/>

        </View>
       
        

        <Text style={{fontSize:24,fontWeight:"bold",marginBottom:16}}>Events</Text>

        
         <View>
           
           {
            events && typeof(events)=='object' &&
             events.map((event)=>(<EventListCard event={event} key={event._id} myEvent={false}/>))
           }


         </View>

    </View>

    {
                select && 
                    
                <View style={{width:'70%',backgroundColor:'#f4f4f4',position:'absolute',top:105,left:'23%',borderBottomRightRadius:20,borderBottomLeftRadius:20,paddingHorizontal:15,paddingVertical:10,borderWidth:1.5,borderColor:'#d9d9d9'}}>
                    <Text style={{fontWeight:"bold",fontSize:22}}>Search by</Text>
                   <Pressable style={{display:'flex',flexDirection:"row",alignItems:"center",padding:10,marginTop:10}} onPress={()=>handleSearchCategory('category')}>
                   <MaterialIcons name="category" size={24} color="black" />
                   <Text style={{fontSize:20,marginLeft:20}}>Category</Text>
                   </Pressable>

                   <Pressable style={{display:'flex',flexDirection:"row",alignItems:"center",padding:10,marginTop:10}} onPress={()=>handleSearchCategory('eventName')}>
                   <FontAwesome name="pencil" size={24} color="black" />
                   <Text style={{fontSize:20,marginLeft:20}}>Event name</Text>
                   </Pressable>

                   <Pressable style={{display:'flex',flexDirection:"row",alignItems:"center",padding:10,marginTop:10}} onPress={()=>handleSearchCategory('location')}>
                   <FontAwesome name="map-marker" size={24} color="black" />
                   <Text style={{fontSize:20,marginLeft:20}}>Location</Text>
                   </Pressable>

                   <Pressable style={{display:'flex',flexDirection:"row",alignItems:"center",padding:10,marginTop:10}} onPress={()=>handleSearchCategory('date')}>
                   <Fontisto name="date" size={24} color="black" />
                   <Text style={{fontSize:20,marginLeft:20}}>Date</Text>
                   </Pressable>

                </View>
            }
    </SafeAreaView>
    </ScrollView>
  )
}

export default SearchScreen