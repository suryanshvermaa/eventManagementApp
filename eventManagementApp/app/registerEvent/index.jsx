import { View, Text,SafeAreaView,ScrollView,TextInput ,Image,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'

const RegisterEvent = () => {
  const params=useLocalSearchParams()
  const [eventId,setEventId]=useState(params.eventId)
  const [name,setName]=useState('')
  const [contact,setContact]=useState('')
  const [age,setage]=useState('')
  const [bio,setBio]=useState('')
  const [company_college,setCompany_college]=useState('')
  const router=useRouter()
  const baseAddress='http://13.126.182.254:8080';

  async function handleRegister(){
    const dataObj={name,contact,age,bio,company_college}
    console.log(dataObj);
    try {
      const res=await fetch(`${baseAddress}/registration/${eventId}`,{
        method:"POST",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body:JSON.stringify(dataObj)
       })
       const result=await res.json();
      if(result){
        router.push('/(tabs)')
      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <SafeAreaView>
        <ScrollView>
        <View>
        <View>
      <Image source={require('../../assets/images/eventCreate.jpg')} style={{height:190,width:'100%'}}/>
      <View style={{padding:20, backgroundColor:'white',display:'flex',flexDirection:"column"}}>
      
         <Text style={{fontWeight:"bold",fontSize:28,textAlign:"center"}}>Registration</Text>
            
       <Text  style={{marginVertical:8}}>Name</Text>
         <TextInput placeholder='enter your name..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}}onChangeText={(text)=>setName(text)}/>
       


         <Text  style={{marginVertical:8}}>Bio</Text>
         <TextInput placeholder='enter you biography in short..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}}onChangeText={(text)=>setBio(text)}/>

        <Text  style={{marginVertical:8}}>Contact</Text>
         <TextInput placeholder='enter your contact..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}}onChangeText={(text)=>setContact(text)}/>
         
         <Text  style={{marginVertical:8}}>Age</Text>
         <TextInput placeholder='enter your age..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}}onChangeText={(text)=>setage(text)}/>

         <Text  style={{marginVertical:8}}>Company/College</Text>
         <TextInput placeholder='enter your company/college..' style={{fontSize:15,color:'gray',backgroundColor:'#d9d9d9',padding:16,borderRadius:10}}onChangeText={(text)=>setCompany_college(text)}/>
          
         <Pressable style={{ backgroundColor:'#ED0800',borderRadius:50,padding:15,display:'flex',justifyContent:"center",alignItems:"center",marginVertical:17}} onPress={handleRegister}>
      <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
        Register
        </Text>
    </Pressable>


           </View>
           </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default RegisterEvent