"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Schedule() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedDate, setSelectedDate] = useState("2024-01-20")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const weekDays = [
    { date: "2024-01-18", day: "Thu", dayNum: "18" },
    { date: "2024-01-19", day: "Fri", dayNum: "19" },
    { date: "2024-01-20", day: "Sat", dayNum: "20" },
    { date: "2024-01-21", day: "Sun", dayNum: "21" },
    { date: "2024-01-22", day: "Mon", dayNum: "22" },
  ]

  const scheduleData = {
    "2024-01-20": [
      { id: 1, subject: "Mathematics", time: "10:00 AM", duration: "1h 30m", students: 25, type: "live" },
      { id: 2, subject: "Physics", time: "2:00 PM", duration: "1h 15m", students: 18, type: "live" },
      { id: 3, subject: "Chemistry", time: "4:00 PM", duration: "1h 30m", students: 12, type: "recorded" },
    ],
    "2024-01-21": [
      { id: 4, subject: "Mathematics", time: "11:00 AM", duration: "1h 30m", students: 22, type: "live" },
      { id: 5, subject: "Physics Lab", time: "3:00 PM", duration: "2h", students: 15, type: "live" },
    ],
  }

  const todayClasses = scheduleData[selectedDate] || []

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Schedule</Typography>
          <Typography className="text-[--nav-text-color] text-base">Manage your class schedule</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Week Calendar */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">This Week</Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-3">
                {weekDays.map((day) => (
                  <TouchableOpacity
                    key={day.date}
                    onPress={() => setSelectedDate(day.date)}
                    className={`items-center p-3 rounded-xl min-w-16 ${
                      selectedDate === day.date ? "bg-[--primary-color]" : "bg-[--field-background-color]"
                    }`}
                  >
                    <Typography
                      className={`text-sm ${selectedDate === day.date ? "text-white" : "text-[--nav-text-color]"}`}
                    >
                      {day.day}
                    </Typography>
                    <Typography
                      className={`text-lg font-poppins-semibold ${
                        selectedDate === day.date ? "text-white" : "text-[--text-color]"
                      }`}
                    >
                      {day.dayNum}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
              <Typography className="text-white text-center font-poppins-semibold">+ Schedule Class</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-(--primary-color) py-3 rounded-xl">
              <Typography className="text-[--primary-color] text-center font-poppins-semibold">
                View Calendar
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Today's Schedule */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">
              Classes for{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
            </Typography>

            {todayClasses.length > 0 ? (
              <View className="gap-3">
                {todayClasses.map((classItem:any) => (
                  <View
                    key={classItem.id}
                    className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                  >
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                          {classItem.subject}
                        </Typography>
                        <Typography className="text-[--nav-text-color] text-base">
                          {classItem.time} • {classItem.duration}
                        </Typography>
                        <Typography className="text-[--nav-text-color] text-base">
                          {classItem.students} students enrolled
                        </Typography>
                      </View>
                      <View
                        className={`px-3 py-1 rounded-xl ${classItem.type === "live" ? "bg-green-100" : "bg-blue-100"}`}
                      >
                        <Typography
                          className={`text-sm ${classItem.type === "live" ? "text-green-600" : "text-blue-600"}`}
                        >
                          {classItem.type === "live" ? "Live" : "Recorded"}
                        </Typography>
                      </View>
                    </View>

                    <View className="flex-row gap-3">
                      <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                        <Typography className="text-white text-center font-poppins-semibold">
                          {classItem.type === "live" ? "Start Class" : "Upload Recording"}
                        </Typography>
                      </TouchableOpacity>
                      <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                        <Typography className="text-[--text-color] text-center">Edit</Typography>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View className="bg-[--card-background-color] p-6 rounded-2xl border border-[--card-border-color] shadow-md items-center">
                <Typography className="text-[--nav-text-color] text-base text-center">
                  No classes scheduled for this day
                </Typography>
                <TouchableOpacity className="bg-[--primary-color] px-6 py-2 rounded-xl mt-3">
                  <Typography className="text-white font-poppins-semibold">Schedule a Class</Typography>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Weekly Summary */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">Weekly Summary</Typography>
            <View className="flex-row justify-between bg-[--field-background-color] p-3 rounded-xl">
              <View className="items-center">
                <Typography className="text-[--text-color] text-lg font-poppins-bold">12</Typography>
                <Typography className="text-[--nav-text-color] text-sm">Total Classes</Typography>
              </View>
              <View className="items-center">
                <Typography className="text-[--text-color] text-lg font-poppins-bold">18h</Typography>
                <Typography className="text-[--nav-text-color] text-sm">Teaching Hours</Typography>
              </View>
              <View className="items-center">
                <Typography className="text-[--text-color] text-lg font-poppins-bold">85</Typography>
                <Typography className="text-[--nav-text-color] text-sm">Students</Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
