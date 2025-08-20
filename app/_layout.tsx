"use client"

import { useEffect } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Toast from "react-native-toast-message"
import { useAuthStore } from "../lib/stores/auth"
import * as SecureStore from "expo-secure-store"


import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";





import "../global.css"
import { View } from "react-native"

const queryClient = new QueryClient()

export default function RootLayout() {
  const { setUser } = useAuthStore()


  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })


  useEffect(() => {
    // Check for stored auth token on app start
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("auth-token")
        if (token) {
          // In a real app, validate token and get user data
          // For now, we'll use the persisted user from Zustand
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      }
    }

    checkAuth()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <View className="flex-1 light">
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: 'Home' }} />
            <Stack.Screen name="(auth)" />
            {/* <Stack.Screen name="(public)" /> */}
            <Stack.Screen name="(student)" />
            <Stack.Screen name="(tutor)" />
            {/* <Stack.Screen name="(org)" /> */}
            {/* <Stack.Screen name="(common)" /> */}
          </Stack>
          /<StatusBar style="auto" />
          <Toast />
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}
