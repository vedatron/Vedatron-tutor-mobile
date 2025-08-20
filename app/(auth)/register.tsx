"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { useAuthStore } from "../../lib/stores/auth"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Card } from "../../components/ui/Card"

export default function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "STUDENT" as "STUDENT" | "TEACHER" | "INSTITUTE_ADMIN",
  })
  const { register, isLoading } = useAuthStore()

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await register(formData)

      // Navigate based on role
      switch (formData.role) {
        case "STUDENT":
          router.replace("/(student)/(tabs)/dashboard")
          break
        case "TEACHER":
          router.replace("/(teacher)/(tabs)/dashboard")
          break
        case "INSTITUTE_ADMIN":
          router.replace("/(org)/(tabs)/dashboard")
          break
      }
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  const roles = [
    { key: "STUDENT", label: "Student" },
    { key: "TEACHER", label: "Teacher" },
    { key: "INSTITUTE_ADMIN", label: "Institute Admin" },
  ]

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="flex-1 px-6 py-12">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-surface-900 mb-2">Create Account</Text>
          <Text className="text-surface-600 text-center">Join the Vedatron community</Text>
        </View>

        <Card className="mb-6">
          <Text className="text-lg font-semibold mb-4 text-surface-900">Select Your Role</Text>
          <View className="flex-row justify-between mb-6">
            {roles.map((role) => (
              <TouchableOpacity
                key={role.key}
                onPress={() => setFormData({ ...formData, role: role.key as any })}
                className={`flex-1 mx-1 py-3 px-4 rounded-xl border-2 ${
                  formData.role === role.key ? "border-primary-600 bg-primary-50" : "border-surface-200 bg-white"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    formData.role === role.key ? "text-primary-600" : "text-surface-600"
                  }`}
                >
                  {role.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

          <Input
            label="Phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />

          <Input
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
          />

          <Button title="Create Account" onPress={handleRegister} loading={isLoading} className="mb-4" />
        </Card>

        <TouchableOpacity onPress={() => router.push("/(auth)/login")} className="py-3">
          <Text className="text-surface-600 text-center">
            Already have an account? <Text className="text-primary-600 font-semibold">Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
