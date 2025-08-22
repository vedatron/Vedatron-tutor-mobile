"use client"

import { View, TouchableOpacity } from "react-native"
import { Typography } from "@/components/Typography"

interface BottomTabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomTabNavigation({ activeTab, onTabChange }: BottomTabNavigationProps) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "classes", label: "My Classes", icon: "📚" },
    { id: "students", label: "Students", icon: "👥" },
    { id: "assignments", label: "Assignments", icon: "📝" },
    { id: "profile", label: "Profile", icon: "👤" },
  ]

  return (
    <View className="bg-[--card-background-color] border-t border-[--card-border-color] px-2 py-2 safe-area-bottom">
      <View className="flex-row justify-around">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => onTabChange(tab.id)}
            className={`flex-1 items-center py-2 px-1 rounded-xl mx-1 ${
              activeTab === tab.id ? "bg-[--primary-color]" : ""
            }`}
          >
            <Typography className="text-lg mb-1">{tab.icon}</Typography>
            <Typography
              className={`text-xs text-center ${
                activeTab === tab.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
              }`}
              numberOfLines={1}
            >
              {tab.label}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
