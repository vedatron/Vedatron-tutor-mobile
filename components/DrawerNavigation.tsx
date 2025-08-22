"use client"

import { View, TouchableOpacity, ScrollView } from "react-native"
import { Typography } from "@/components/Typography"
import { router } from "expo-router"

interface DrawerNavigationProps {
  isOpen: boolean
  onClose: () => void
}

export default function DrawerNavigation({ isOpen, onClose }: DrawerNavigationProps) {
  const drawerItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", route: "/(tabs)/dashboard" },
    { id: "classes", label: "My Classes", icon: "📚", route: "/(tabs)/classes" },
    { id: "students", label: "Students", icon: "👥", route: "/(tabs)/students" },
    { id: "assignments", label: "Assignments", icon: "📝", route: "/(tabs)/assignments" },
    { id: "profile", label: "Profile", icon: "👤", route: "/(tabs)/profile" },
    { id: "schedule", label: "Schedule", icon: "📅", route: "/schedule" },
    { id: "messages", label: "Messages", icon: "💬", route: "/messages" },
    { id: "analytics", label: "Analytics", icon: "📈", route: "/analytics" },
    { id: "earnings", label: "Earnings", icon: "💰", route: "/earnings" },
    { id: "help", label: "Help & Support", icon: "❓", route: "/help" },
  ]

  const handleNavigate = (route: string) => {
    router.push(route as any)
    onClose()
  }

  if (!isOpen) return null

  return (
    <View className="absolute inset-0 z-50">
      {/* Overlay */}
      <TouchableOpacity className="absolute inset-0 bg-black/50" onPress={onClose} activeOpacity={1} />

      {/* Drawer */}
      <View className="absolute left-0 top-0 bottom-0 w-80 bg-[--card-background-color] shadow-2xl">
        <ScrollView className="flex-1">
          {/* Header */}
          <View className="p-6 border-b border-[--card-border-color]">
            <View className="flex-row items-center justify-between">
              <View>
                <Typography className="text-[--text-color] text-xl font-poppins-bold">Menu</Typography>
                <Typography className="text-[--nav-text-color] text-base">Navigate to any section</Typography>
              </View>
              <TouchableOpacity onPress={onClose} className="p-2">
                <Typography className="text-[--nav-text-color] text-2xl">✕</Typography>
              </TouchableOpacity>
            </View>
          </View>

          {/* Navigation Items */}
          <View className="p-4">
            {drawerItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleNavigate(item.route)}
                className="flex-row items-center p-4 rounded-xl mb-2 bg-[--field-background-color]"
              >
                <Typography className="text-2xl mr-4">{item.icon}</Typography>
                <Typography className="text-base text-[--text-color]">{item.label}</Typography>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View className="p-4 border-t border-[--card-border-color] mt-4">
            <TouchableOpacity className="bg-red-500 py-3 rounded-xl">
              <Typography className="text-white text-center font-poppins-semibold">Logout</Typography>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
