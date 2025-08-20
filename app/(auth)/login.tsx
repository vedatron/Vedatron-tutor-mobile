"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { useAuthStore } from "../../lib/stores/auth"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "TUTOR">("STUDENT")
  const { login, isLoading } = useAuthStore()

  const handleLogin = async () => {
    try {
      await login(email, password, selectedRole)

      // Navigate based on role
      switch (selectedRole) {
        case "STUDENT":
          router.replace("/(student)/(tabs)/dashboard")
          break
        case "TUTOR":
          router.replace("/(teacher)/(tabs)/dashboard")
          break
      }
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const roles = [
    { key: "STUDENT", label: "Student", icon: "school" },
    { key: "TUTOR", label: "Tutor", icon: "person" },
  ]

  return (
    <View className="light bg-[--card-background-color] h-full ">


      <ScrollView
        className="flex-1 "
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="mb-12 items-center">
            <View className="w-20 h-20 bg-[--card-background-color] rounded-full items-center justify-center mb-6 shadow-lg">
              <MaterialIcons name="auto-stories" size={36} className="text-[--text-color]" />
            </View>
            <Text className="text-4xl font-bold text-center text-[--text-color] mb-2">Vedatron</Text>
            {/* <Text className="text-white/80 text-center text-lg">Your learning journey starts here</Text> */}
          </View>

          {/* Role Selection */}
          <View className="mb-8">
            <Text className="text-[--nav-text-color] text-lg font-semibold mb-4 text-center">I am a...</Text>
            <View className="flex-row justify-center gap-4">
              {roles.map((role) => (
                <TouchableOpacity
                  key={role.key}
                  onPress={() => setSelectedRole(role.key as any)}
                  activeOpacity={0.7}
                  className={`flex-1 max-w-[160px] text-[--text-color] py-4 px-6 rounded-2xl border-2 items-center ${selectedRole === role.key
                      ? "border-[--primary-color] bg-[--card-background-color] shadow-md"
                      : "border-[--card-border-color] bg-[--background-color]"
                    }`}
                >
                  <MaterialIcons
                    name={role.icon as any}
                    size={28}
                    className={`${selectedRole==role.key?"text-[--primary-color]":"text-[--text-color]"}`}
                  />
                  <Text
                    className={`text-center text-[--text-color] font-semibold mt-2 ${selectedRole === role.key ? "text-[--text-color]" : "text-[--nav-text-color]"
                      }`}
                  >
                    {role.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Login Form */}
          <View className="">
            <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</Text>

            <View className="space-y-4">
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconLeft={<MaterialIcons name="email" size={20} color="#667eea" />}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                iconLeft={<MaterialIcons name="lock" size={20} color="#667eea" />}
              />

              <Button
                title={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                loading={isLoading}
                className="mt-6"
                disabled={!email || !password}

              />
            </View>

            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              className="mt-4 py-2"
              activeOpacity={0.7}
            >
              <Text className="text-[--primary-color] text-center font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/register")}
            className="mt-8 py-3"
            activeOpacity={0.7}
          >
            <Text className="text-[--nav-text-color] text-center text-lg">
              Don't have an account? <Text className="font-bold underline  text-[--primary-color]">Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}
