import { View, Text, SafeAreaView, TextInput, Pressable, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useAsyncStorage} from '@react-native-async-storage/async-storage'
import {Link, useRouter} from 'expo-router'
import { jwtDecode } from "jwt-decode";


export default function Register () {

  const baseAddress='http://13.126.182.254:8080';



  const [screen,setScreen]=useState('register');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const [otp,setOtp]=useState('');

  const router = useRouter();



  ///ruyergyeorh;er
  


  const asyncStorage=useAsyncStorage('authToken');

  
     useEffect(()=>{
     async function getCookie(){
      const token=await asyncStorage.getItem();
      console.log(token);
      if(token){
        const decodedToken= jwtDecode(String(token));
        console.log(decodedToken);
      if(decodedToken.userId){
          router.push('/(tabs)')
      }
      }
     }
     getCookie()
      
     },[])
  


  const registerSubmit=async()=>{
    const registerObj={
      name,
      email,
      password
    }

    fetch(`${baseAddress}/signup`,{
      method:"POST",
      headers:{
        "Accept": 'application/json',
        "Content-Type":"application/json"
      },
      body:JSON.stringify(registerObj)
    }).then((res)=>{
      return res.json()
    }).then((data)=>{

      setScreen('otpScreen')
    }).catch((err)=>console.log(err))
    // const result=await response.json();
    // if(result=='user created'){
    //   setScreen('otpScreen')
    // }
  }

  const otpSubmit=async()=>{
   const otpObj={
    email,
    otp
   }
    fetch(`${baseAddress}/signup/verfication`,{
      method:"POST",
      headers:{
        "Accept": 'application/json',
        "Content-Type":"application/json"
      },
      body:JSON.stringify(otpObj)
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
      
      const authToken=data.token;
     if(authToken){
      asyncStorage.setItem(authToken)
      alert('sign success')
      router.push('/(tabs)')
     }
    })
   
    
  }
 

  return (




  <View style={{display:'flex',flexDirection:'column',padding:20

  }}>
         {
          screen=='register' && 
          <View style={{marginTop:80}}>
          <Text style={{fontWeight:'bold',fontSize:28,textAlign:'center'}}>Signup</Text>
          <Text style={{textAlign:'center'}}>Welcome to our app</Text>
         <View style={{marginTop:80}}>
             <Text style={{marginLeft:3}}>Name</Text>
             <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='Enter your Name here' onChangeText={(text)=>setName(text)}/>
         </View>
         <View style={{marginTop:10}}>
             <Text style={{marginLeft:3}}>Email Address</Text>
             <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='Enter your Email here'  onChangeText={(text)=>setEmail(text)}/>
         </View>
          


          
         <View style={{marginTop:10}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <Text style={{marginLeft:3}}>Password</Text>
            <Text style={{color:'blue'}}>Forgot Password</Text>
            </View>
             <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='Enter your Password Here' secureTextEntry  onChangeText={(text)=>setPassword(text)}/>
         </View>
         <Pressable style={{backgroundColor:'blue',padding:12,display:'flex',alignItems:'center',borderRadius:10,marginTop:100}} onPress={registerSubmit}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Signup</Text>
         </Pressable>
        
          <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
               <Text>Already have an account</Text><TouchableOpacity onPress={()=>router.push('login')}><Text style={{color:'blue'}}>Login</Text></TouchableOpacity>
               </View>
          
        </View>
         }

        {
          screen=='otpScreen' &&
          <View >
          <View style={{marginTop:200}}>
                <Text style={{fontSize:38,textAlign:'center',fontWeight:'medium',fontFamily:'serif'}}>Verify you OTP</Text>
                <Text style={{textAlign:'center',fontWeight:'light',marginTop:8,fontFamily:'serif'}}>Check Your Email</Text>
          </View>
           <View style={{marginTop:20}}>
           <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='OTP'  onChangeText={(text)=>setOtp(text)}/>
          </View>
          <Pressable style={{backgroundColor:'blue',padding:12,display:'flex',alignItems:'center',borderRadius:10,marginTop:50}} onPress={otpSubmit}>
          <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Verify</Text>
         </Pressable>
          </View>
        }

  </View>

  )
}

