"use client"

import type React from "react"

import { View, SafeAreaView, TouchableOpacity } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"
import BottomTabNavigation from "./BottomTabNavigation"
import DrawerNavigation from "./DrawerNavigation"

// Import all tutor screens
import Dashboard from "../screens/tutor/Dashboard"
import MyClasses from "../screens/tutor/MyClasses"
import Students from "../screens/tutor/Students"
import Assignments from "../screens/tutor/Assignments"
import Profile from "../screens/tutor/Profile"
import Schedule from "../screens/tutor/Schedule"
import Messages from "../screens/tutor/Messages"
import Analytics from "../screens/tutor/Analytics"
import Earnings from "../screens/tutor/Earnings"
import Help from "../screens/tutor/Help"

export default function TutorNavigation() {
  const [activeScreen, setActiveScreen] = useState("dashboard")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const renderScreen = () => {
    switch (activeScreen) {
      case "dashboard":
        return <Dashboard />
      case "classes":
        return <MyClasses />
      case "students":
        return <Students />
      case "assignments":
        return <Assignments />
      case "profile":
        return <Profile />
      case "schedule":
        return <Schedule />
      case "messages":
        return <Messages />
      case "analytics":
        return <Analytics />
      case "earnings":
        return <Earnings />
      case "help":
        return <Help />
      default:
        return <Dashboard />
    }
  }

  const getScreenTitle = () => {
    const titles = {
      dashboard: "Dashboard",
      classes: "My Classes",
      students: "Students",
      assignments: "Assignments",
      profile: "Profile",
      schedule: "Schedule",
      messages: "Messages",
      analytics: "Analytics",
      earnings: "Earnings",
      help: "Help & Support",
    }
    return titles[activeScreen as keyof typeof titles] || "Dashboard"
  }

  const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <SafeAreaView className="flex-1 bg-(--background-color)">
        {/* Custom Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <View className="flex-row items-center justify-between">
            <TouchableOpacity onPress={() => setIsDrawerOpen(true)} className="p-2 -ml-2">
              <Typography className="text-[--text-color] text-2xl">☰</Typography>
            </TouchableOpacity>

            <View className="flex-1 items-center">
              <Typography className="text-[--text-color] text-xl font-poppins-semibold">{getScreenTitle()}</Typography>
            </View>

            <View className="w-10" />
          </View>
        </View>

        {/* Screen Content */}
        <View className="flex-1">{children}</View>
      </SafeAreaView>
    )
  }

  return (
    <View className="flex-1 bg-(--background-color)">
      <ScreenWrapper>{renderScreen()}</ScreenWrapper>

      {/* Bottom Tab Navigation */}
      <BottomTabNavigation activeTab={activeScreen} onTabChange={setActiveScreen} />

      {/* Drawer Navigation */}
      <DrawerNavigation
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={setActiveScreen}
        activeScreen={activeScreen}
      />
    </View>
  )
}
