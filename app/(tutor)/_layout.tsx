"use client"
import { useEffect } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"






export default function RootLayout() {





  return (
  
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="dashboard" />

           
          </Stack>
      
  )
}
