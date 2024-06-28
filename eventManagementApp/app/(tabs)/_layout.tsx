import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons.js';
import MyTabBar from '../../componentParts/customiseTab.jsx'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    tabBar={props=><MyTabBar {...props}/>}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ focused }) => (
          //   <MaterialIcons name="event" size={24} color={focused ? 'blue' :'grey'} />
            
          // ),
        }}
      />
       <Tabs.Screen
        name="createevent"
        options={{
          title: 'CreateEvent',
          // tabBarIcon: ({  focused }) => (
          //   <MaterialIcons name="event" size={24} color={focused ? 'blue' :'grey'} />
          // ),
        }}
      />
      <Tabs.Screen
        name="myevents"
        options={{
          title: 'MyEvents',
          // tabBarIcon: ({  focused }) => (
          //   <MaterialIcons name="event" size={24} color={focused ? 'blue' :'grey'} />
          // ),
        }}
      />
     
    </Tabs>
  );
}
