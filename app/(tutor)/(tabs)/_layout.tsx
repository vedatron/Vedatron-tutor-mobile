"use client"

import { Tabs } from "expo-router"
import { View, Text, TouchableOpacity } from "react-native"
import { useState } from "react"
import DrawerNavigation from "@/components/DrawerNavigation"

// Tab Bar Icons (you can replace with actual icons)
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => (
  <View className="items-center justify-center">
    <Text className={`text-xs ${focused ? "text-blue-600" : "text-gray-500"}`}>{name}</Text>
  </View>
)

export default function TabLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#6b7280",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#e5e7eb",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
          },
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 18,
            color: "#1f2937",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => setDrawerOpen(true)} className="ml-4 p-2">
              <View className="w-6 h-6 justify-between">
                <View className="w-full h-0.5 bg-gray-700" />
                <View className="w-full h-0.5 bg-gray-700" />
                <View className="w-full h-0.5 bg-gray-700" />
              </View>
            </TouchableOpacity>
          ),
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ focused }) => <TabIcon name="📊" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="classes"
          options={{
            title: "My Classes",
            tabBarIcon: ({ focused }) => <TabIcon name="📚" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="students"
          options={{
            title: "Students",
            tabBarIcon: ({ focused }) => <TabIcon name="👥" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="assignments"
          options={{
            title: "Assignments",
            tabBarIcon: ({ focused }) => <TabIcon name="📝" focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => <TabIcon name="👤" focused={focused} />,
          }}
        />
      </Tabs>

      <DrawerNavigation isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
