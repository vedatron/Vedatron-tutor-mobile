"use client"
import { useEffect, useState } from "react"
import { Image } from "expo-image"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Link, router } from "expo-router"
import { MaterialIcons } from "@expo/vector-icons"
import { useAuthStore } from "@/lib/stores/auth"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Typography } from "@/components/Typography"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<"STUDENT" | "TUTOR">("TUTOR")
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
          router.replace("/(tutor)/(tabs)/dashboard")
          break
      }
    } catch (error) {
      // console.error("Login failed:", error)
    }
  }

  const roles = [
    { key: "STUDENT", label: "Student", icon: "school" },
    { key: "TUTOR", label: "Tutor", icon: "person" },
  ]

  const changeRole = (role: "STUDENT" | "TUTOR") => {
    console.log("Selected role:", role)
    setSelectedRole(role)
  }

  return (
    <View className="light bg-[--background-color] h-full ">


      <ScrollView
        className="flex-1 "
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* Header */}
          <View className="mb-6 items-center">
            <View className="w-20 h-20 bg-[--card-background-color] rounded-full items-center justify-center mb-2 shadow-lg">
              <Image source={
                 require("@/assets/images/icon.png")
              }
                contentFit="contain"
                transition={1000}
                alt="Vedatron Logo"
                className="w-16 h-16 overflow-hidden "
                style={{ width: 64, height: 64 }}
              />
            </View>
            <Typography className="text-4xl font-bold text-center text-[--text-color] mb-2">Vedatron</Typography>
            {/* <Typography className="text-white/80 text-center text-lg">Your learning journey starts here</Text> */}
          </View>



          {/* Role Selection */}

          <View className="flex-row w-full justify-center bg-[--card-background-color] rounded-2xl p-1 mb-6 shadow">
            {roles.map((role) => (
              <TouchableOpacity
                key={role.key}
                onPress={() => changeRole(role.key as any)}
                className={`flex-1 m-auto max-w-[170px] py-3 px-6  rounded-2xl  items-center ${selectedRole === role.key ? "border-[--primary-color] bg-[--primary-color]" : "border-gray-900/50 bg-[--card-backgound-color]"
                  }`}


              >
                {/* <MaterialIcons
                  name={role.icon as any}
                  size={28}
                  color={selectedRole === role.key ? "white" : "#6b7280"}
                /> */}
                <Typography
                  className={`text-center text-[15px] font-bold  ${selectedRole === role.key ? "text-white" : "text-[--nav-text-color]"
                    }`}
                >
                  {role.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>



          {/* Login Form */}
          <View className="mt-4">
            <Typography className="text-[--nav-text-color] mb-6 text-center">Sign in as {selectedRole}</Typography>

            <View className="space-y-4">
              <Input
                inputClassName="py-4"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                iconLeft={<MaterialIcons name="email" size={20} color="#667eea" />}
              />

              <Input
                label="Password"
                inputClassName="py-4"

                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                iconLeft={<MaterialIcons name="lock" size={20} color="#667eea" />}
              />

              <Button
                title={isLoading ? "Signing In..." : "Sign In"}
                onPress={handleLogin}
                // loading={isLoading}
                className="mt-6"
                disabled={!email || !password}
              />
            </View>

            <TouchableOpacity
              onPress={() => ""}
              className="mt-4 py-2"
              activeOpacity={0.7}
            >
              <Typography className="text-[--primary-color] text-center font-medium">Forgot Password?</Typography>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center mt-8 py-3">
            <Typography className="text-[--nav-text-color] text-lg">
              Don't have an account?{" "}
            </Typography>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Typography className="font-bold underline text-[--primary-color] text-lg">
                  Sign Up
                </Typography>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

