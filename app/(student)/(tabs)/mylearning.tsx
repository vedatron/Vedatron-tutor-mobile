"use client"

import { useState } from "react"
import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { Typography } from "@/components/Typography"

export default function ClassManagement() {
  const [activeTab, setActiveTab] = useState("Live")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const liveClasses = [
    { id: 1, title: "Advanced Calculus", subject: "Mathematics", time: "10:00 AM", status: "live" },
    { id: 2, title: "Quantum Physics", subject: "Physics", time: "2:00 PM", status: "upcoming" },
  ]

  const recordedClasses = [
    { id: 1, title: "Organic Chemistry Basics", subject: "Chemistry", duration: "45 min" },
    { id: 2, title: "Linear Algebra", subject: "Mathematics", duration: "60 min" },
  ]

  const resources = [
    { id: 1, title: "Mathematics Formula Sheet", type: "PDF", size: "2.5 MB" },
    { id: 2, title: "Physics Lab Notes", type: "DOC", size: "1.8 MB" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "Live":
        return (
          <View className="gap-3">
            {liveClasses.map((classItem) => (
              <View
                key={classItem.id}
                className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Typography className="text-[--text-color] text-lg">{classItem.title}</Typography>
                    <Typography className="text-[--text-color] text-base">
                      {classItem.subject} • {classItem.time}
                    </Typography>
                    <View className="mt-2">
                      <View
                        className={`px-2 py-1 rounded-md self-start ${classItem.status === "live" ? "bg-red-100" : "bg-blue-100"}`}
                      >
                        <Typography
                          className={`text-sm ${classItem.status === "live" ? "text-red-600" : "text-blue-600"}`}
                        >
                          {classItem.status === "live" ? "🔴 Live" : "⏰ Upcoming"}
                        </Typography>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-[--primary-color] px-4 py-2 rounded-xl">
                    <Typography className="text-white">
                      {classItem.status === "live" ? "Join" : "Set Reminder"}
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )
      case "Recorded":
        return (
          <View className="gap-3">
            {recordedClasses.map((classItem) => (
              <View
                key={classItem.id}
                className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Typography className="text-[--text-color] text-lg">{classItem.title}</Typography>
                    <Typography className="text-[--text-color] text-base">
                      {classItem.subject} • {classItem.duration}
                    </Typography>
                  </View>
                  <TouchableOpacity className="bg-[--primary-color] px-4 py-2 rounded-xl">
                    <Typography className="text-white">Watch</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )
      case "Resources":
        return (
          <View className="gap-3">
            {resources.map((resource) => (
              <View
                key={resource.id}
                className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Typography className="text-[--text-color] text-lg">{resource.title}</Typography>
                    <Typography className="text-[--text-color] text-base">
                      {resource.type} • {resource.size}
                    </Typography>
                  </View>
                  <TouchableOpacity className="bg-[--primary-color] px-4 py-2 rounded-xl">
                    <Typography className="text-white">Download</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )
      default:
        return null
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <View className="flex-1 bg-[--background-color]">
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Class Management</Typography>
        </View>

        {/* Tabs */}
        <View className="bg-[--card-background-color] px-4 py-2 border-b border-[--card-border-color]">
          <View className="flex-row gap-4">
            {["Live", "Recorded", "Resources"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl ${activeTab === tab ? "bg-[--primary-color]" : "bg-gray-100"}`}
              >
                <Typography className={`${activeTab === tab ? "text-white" : "text-[--text-color]"}`}>{tab}</Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        <ScrollView
          className="flex-1 p-4"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {renderTabContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
