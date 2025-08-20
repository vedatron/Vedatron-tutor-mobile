"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000)
  }

  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", teacher: "Dr. Smith" },
    { id: 2, subject: "Physics", time: "2:00 PM", teacher: "Prof. Johnson" },
    { id: 3, subject: "Chemistry", time: "4:00 PM", teacher: "Dr. Brown" },
  ]

  const enrolledEducators = [
    { id: 1, name: "Dr. Smith", subject: "Math", avatar: "👨‍🏫" },
    { id: 2, name: "Prof. Johnson", subject: "Physics", avatar: "👩‍🏫" },
    { id: 3, name: "Dr. Brown", subject: "Chemistry", avatar: "👨‍🔬" },
  ]

  return (
    <SafeAreaView className="flex-1 mt-12  bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-[--primary-color] rounded-2xl items-center justify-center">
              <Typography className="text-white text-lg">S</Typography>
            </View>
            <View className="flex-1">
              <Typography className="text-[--text-color] text-lg">Good Morning!</Typography>
              <Typography className="text-[--text-color] text-base">Ready to learn today?</Typography>
            </View>
          </View>
        </View>

        <View className="p-4 gap-6">
          {/* Upcoming Classes */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Upcoming Classes</Typography>
            <View className="gap-3">
              {upcomingClasses.map((classItem) => (
                <View
                  key={classItem.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg">{classItem.subject}</Typography>
                      <Typography className="text-[--text-color] text-base">
                        {classItem.time} • {classItem.teacher}
                      </Typography>
                    </View>
                    <TouchableOpacity className="bg-[--primary-color] px-4 py-2 rounded-xl">
                      <Typography className="text-white">Join</Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Enrolled Educators */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Your Educators</Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {enrolledEducators.map((educator) => (
                  <View
                    key={educator.id}
                    className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md w-32"
                  >
                    <View className="items-center gap-2">
                      <Typography className="text-3xl">{educator.avatar}</Typography>
                      <Typography className="text-[--text-color] text-base text-center">{educator.name}</Typography>
                      <Typography className="text-[--text-color] text-sm text-center">{educator.subject}</Typography>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Progress Stats */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Your Progress</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="items-center gap-4">
                <View className="w-full h-32 bg-gray-100 rounded-xl items-center justify-center">
                  <Typography className="text-gray-500">📊 Progress Chart</Typography>
                </View>
                <View className="flex-row justify-between w-full">
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">85%</Typography>
                    <Typography className="text-[--text-color] text-sm">Completion</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">12</Typography>
                    <Typography className="text-[--text-color] text-sm">Classes</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">A+</Typography>
                    <Typography className="text-[--text-color] text-sm">Grade</Typography>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
