"use client"

import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native"
import { router } from "expo-router"
import { useAuthStore } from "../../../lib/stores/auth"
import { useUIStore } from "../../../lib/stores/ui"
import { Card } from "../../../components/ui/Card"
import { Button } from "../../../components/ui/Button"
import { User, DollarSign, Award, Settings, Moon, Globe, Bell, HelpCircle } from "lucide-react-native"

export default function TeacherProfileScreen() {
  const { user, logout } = useAuthStore()
  const { theme, language, toggleTheme, setLanguage } = useUIStore()

  const handleLogout = async () => {
    await logout()
    router.replace("/(auth)/login")
  }

  const teacherStats = [
    { label: "Total Students", value: "156" },
    { label: "Courses Created", value: "8" },
    { label: "Total Revenue", value: "₹1,25,000" },
    { label: "Average Rating", value: "4.8" },
  ]

  const menuItems = [
    {
      icon: Settings,
      title: "Account Settings",
      subtitle: "Manage your account details",
      onPress: () => {},
    },
    {
      icon: DollarSign,
      title: "Earnings & Payouts",
      subtitle: "View earnings and payment history",
      onPress: () => {},
    },
    {
      icon: Award,
      title: "Achievements",
      subtitle: "View your teaching milestones",
      onPress: () => {},
    },
    {
      icon: Bell,
      title: "Notifications",
      subtitle: "Manage notification preferences",
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      subtitle: "Get help and contact support",
      onPress: () => {},
    },
  ]

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="px-6 pt-12 pb-6">
        {/* Profile Header */}
        <Card className="mb-6">
          <View className="items-center py-6">
            <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
              <User size={40} color="#10b981" />
            </View>
            <Text className="text-xl font-bold text-surface-900 mb-1">{user?.name}</Text>
            <Text className="text-surface-600 mb-4">{user?.email}</Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-600 font-medium">{user?.role}</Text>
            </View>
          </View>
        </Card>

        {/* Teaching Stats */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-surface-900 mb-4">Teaching Stats</Text>
          <View className="flex-row flex-wrap justify-between">
            {teacherStats.map((stat, index) => (
              <View key={index} className="w-[48%] items-center py-3">
                <Text className="text-2xl font-bold text-green-600">{stat.value}</Text>
                <Text className="text-surface-600 text-sm text-center">{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Settings */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-surface-900 mb-4">Preferences</Text>

          {/* Dark Mode */}
          <View className="flex-row items-center justify-between py-3 border-b border-surface-100">
            <View className="flex-row items-center">
              <Moon size={20} color="#6b7280" />
              <Text className="text-surface-900 ml-3">Dark Mode</Text>
            </View>
            <Switch
              value={theme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ false: "#e5e7eb", true: "#10b981" }}
              thumbColor={theme === "dark" ? "#ffffff" : "#f3f4f6"}
            />
          </View>

          {/* Language */}
          <TouchableOpacity
            onPress={() => setLanguage(language === "en" ? "hi" : "en")}
            className="flex-row items-center justify-between py-3"
          >
            <View className="flex-row items-center">
              <Globe size={20} color="#6b7280" />
              <Text className="text-surface-900 ml-3">Language</Text>
            </View>
            <Text className="text-surface-600">{language === "en" ? "English" : "हिंदी"}</Text>
          </TouchableOpacity>
        </Card>

        {/* Menu Items */}
        <Card className="mb-6">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              className="flex-row items-center py-4 border-b border-surface-100 last:border-b-0"
            >
              <item.icon size={20} color="#6b7280" />
              <View className="flex-1 ml-3">
                <Text className="text-surface-900 font-medium">{item.title}</Text>
                <Text className="text-surface-600 text-sm">{item.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout */}
        <Button title="Sign Out" onPress={handleLogout} variant="outline" className="mb-6 bg-transparent" />

        <Text className="text-center text-surface-400 text-sm">Vedatron Tutor v1.0.0</Text>
      </View>
    </ScrollView>
  )
}
