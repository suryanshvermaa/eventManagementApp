import { Stack } from 'expo-router';
import React from 'react';
;
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function StackLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Register',
          headerShown:false
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
          headerShown:false
        }}
      />
    </Stack>
  );
}
