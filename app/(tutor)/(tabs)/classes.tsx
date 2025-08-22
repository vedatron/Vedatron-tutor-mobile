"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function MyClasses() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("live")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const liveClasses = [
    {
      id: 1,
      subject: "Advanced Mathematics",
      time: "10:00 AM - 11:30 AM",
      date: "Today",
      students: 25,
      status: "upcoming",
    },
    { id: 2, subject: "Physics Fundamentals", time: "2:00 PM - 3:30 PM", date: "Today", students: 18, status: "live" },
    { id: 3, subject: "Chemistry Lab", time: "4:00 PM - 5:30 PM", date: "Tomorrow", students: 12, status: "upcoming" },
  ]

  const resources = [
    { id: 1, title: "Calculus Notes - Chapter 5", type: "PDF", size: "2.5 MB", uploadDate: "2024-01-15" },
    { id: 2, title: "Physics Lab Manual", type: "PDF", size: "5.2 MB", uploadDate: "2024-01-14" },
    { id: 3, title: "Chemistry Presentation", type: "PPT", size: "8.1 MB", uploadDate: "2024-01-13" },
  ]

  const recordings = [
    { id: 1, title: "Mathematics - Derivatives", duration: "1h 25m", date: "2024-01-14", views: 45 },
    { id: 2, title: "Physics - Motion Laws", duration: "1h 15m", date: "2024-01-13", views: 32 },
    { id: 3, title: "Chemistry - Atomic Structure", duration: "1h 35m", date: "2024-01-12", views: 28 },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-100 text-red-600"
      case "upcoming":
        return "bg-blue-100 text-blue-600"
      case "completed":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const tabs = [
    { id: "live", label: "Live Classes" },
    { id: "resources", label: "Resources" },
    { id: "recordings", label: "Recordings" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">My Classes</Typography>
        </View>

        {/* Tabs */}
        <View className="bg-[--card-background-color] px-4 pb-4 border-b border-[--card-border-color]">
          <View className="flex-row border-[--card-border-color] bg-[--field-background-color] rounded-xl p-1">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg ${activeTab === tab.id ? "bg-[--primary-color]" : ""}`}
              >
                <Typography
                  className={`text-center text-sm ${
                    activeTab === tab.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
                  }`}
                >
                  {tab.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="p-4">
          {/* Live Classes Tab */}
          {activeTab === "live" && (
            <View className="gap-3">
              {liveClasses.map((classItem) => (
                <View
                  key={classItem.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {classItem.subject}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">{classItem.time}</Typography>
                      <Typography className="text-[--nav-text-color] text-base">
                        {classItem.date} • {classItem.students} students
                      </Typography>
                    </View>
                    <View className={`px-3 py-1 rounded-xl ${getStatusColor(classItem.status)}`}>
                      <Typography className="text-sm capitalize">{classItem.status}</Typography>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                      <Typography className="text-white text-center font-poppins-semibold">
                        {classItem.status === "live" ? "Join Now" : "Start Class"}
                      </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                      <Typography className="text-[--text-color] text-center">View Details</Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Resources Tab */}
          {activeTab === "resources" && (
            <View className="gap-3">
              <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl mb-3">
                <Typography className="text-white text-center font-poppins-semibold">+ Upload New Resource</Typography>
              </TouchableOpacity>

              {resources.map((resource) => (
                <View
                  key={resource.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {resource.title}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">
                        {resource.type} • {resource.size}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">
                        Uploaded: {resource.uploadDate}
                      </Typography>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                      <Typography className="text-white text-center">Download</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                      <Typography className="text-[--text-color] text-center">Share</Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Recordings Tab */}
          {activeTab === "recordings" && (
            <View className="gap-3">
              {recordings.map((recording) => (
                <View
                  key={recording.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {recording.title}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">
                        Duration: {recording.duration}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">
                        {recording.date} • {recording.views} views
                      </Typography>
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                      <Typography className="text-white text-center">Play</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                      <Typography className="text-[--text-color] text-center">Share</Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
