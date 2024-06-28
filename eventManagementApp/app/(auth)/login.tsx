import { View, Text, TouchableOpacity,SafeAreaView,TextInput, Pressable } from 'react-native'
import React,{useState} from 'react'
import { useRouter } from 'expo-router';
import {useAsyncStorage} from '@react-native-async-storage/async-storage'

const Login = () => {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router=useRouter();
  const asyncStorage=useAsyncStorage('authToken');

  const baseAddress='http://13.126.182.254:8080';

  const loginSubmit=async()=>{
    const loginObj={
      email,
      password
    }

    fetch(`${baseAddress}/login`,{
      method:"POST",
      headers:{
        "Accept": 'application/json',
        "Content-Type":"application/json"
      },
      body:JSON.stringify(loginObj)
    }).then((res)=>{
      return res.json()
    }).then((data)=>{
          
          asyncStorage.setItem(data.token)
           alert("login successful")
           router.push('/(tabs)')
           console.log(data.token);
      
    }).catch((err)=>console.log(err))
   
  }

  return (
    <SafeAreaView>

    <View style={{display:'flex',flexDirection:'column',padding:20
    }}>
            <View style={{marginTop:120}}>
              <Text style={{fontWeight:'bold',fontSize:28,textAlign:'center'}}>Login</Text>
              <Text style={{textAlign:'center'}}>Welcome back to our app</Text>
             <View style={{marginTop:80}}>
                 <Text style={{marginLeft:3}}>Email Address</Text>
                 <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='Enter your Email here' onChangeText={(text)=>setEmail(text)}/>
             </View>
             <View style={{marginTop:10}}>
                <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{marginLeft:3}}>Password</Text>
                <Text style={{color:'blue'}}>Forgot Password</Text>
                </View>
                 <TextInput style={{padding:10,borderRadius:10,borderColor:'gray',borderWidth:2,marginTop:8,fontSize:16}} placeholder='Enter your Password Here' onChangeText={(text)=>setPassword(text)} secureTextEntry />
             </View>
             <Pressable style={{backgroundColor:'blue',padding:12,display:'flex',alignItems:'center',borderRadius:10,marginTop:100}} onPress={loginSubmit}>
              <Text style={{color:'white',fontWeight:'bold',fontSize:18}}>Login</Text>
             </Pressable>
             <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                 <Text>Create your account</Text><TouchableOpacity onPress={()=>router.back()}><Text style={{color:"blue"}}>Register</Text></TouchableOpacity>
                 </View>

            </View>
    </View>
   </SafeAreaView>
  )
}

export default Login