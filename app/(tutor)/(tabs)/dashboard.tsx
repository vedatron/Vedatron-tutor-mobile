"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function TutorDashboard() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const dashboardStats = {
    upcomingClasses: 3,
    studentsEnrolled: 45,
    pendingTasks: 7,
    monthlyEarnings: 85000,
  }

  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", students: 12, type: "Live" },
    { id: 2, subject: "Physics", time: "2:00 PM", students: 8, type: "Live" },
    { id: 3, subject: "Chemistry", time: "4:00 PM", students: 15, type: "Recorded" },
  ]

  const notifications = [
    { id: 1, message: "New student enrolled in Mathematics", time: "2 hours ago", type: "enrollment" },
    { id: 2, message: "Assignment submission from John Doe", time: "4 hours ago", type: "submission" },
    { id: 3, message: "Class reminder: Physics at 2:00 PM", time: "6 hours ago", type: "reminder" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Tutor Dashboard</Typography>
          <Typography className="text-[--nav-text-color] text-base">Welcome back, Professor!</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Stats Cards */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Overview</Typography>
            <View className="gap-3">
              <View className="flex-row gap-3">
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Upcoming Classes</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {dashboardStats.upcomingClasses}
                  </Typography>
                </View>
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Students Enrolled</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {dashboardStats.studentsEnrolled}
                  </Typography>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Pending Tasks</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {dashboardStats.pendingTasks}
                  </Typography>
                </View>
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Monthly Earnings</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    ₹{dashboardStats.monthlyEarnings.toLocaleString()}
                  </Typography>
                </View>
              </View>
            </View>
          </View>

          {/* Upcoming Classes */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Typography className="text-[--text-color] text-xl">Today's Classes</Typography>
              <TouchableOpacity>
                <Typography className="text-[--primary-color] text-base">View All</Typography>
              </TouchableOpacity>
            </View>
            <View className="gap-3">
              {upcomingClasses.map((classItem) => (
                <View
                  key={classItem.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {classItem.subject}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">
                        {classItem.time} • {classItem.students} students
                      </Typography>
                    </View>
                    <View
                      className={`px-3 py-1 rounded-xl ${classItem.type === "Live" ? "bg-green-100" : "bg-blue-100"}`}
                    >
                      <Typography
                        className={`text-sm ${classItem.type === "Live" ? "text-green-600" : "text-blue-600"}`}
                      >
                        {classItem.type}
                      </Typography>
                    </View>
                  </View>
                  <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                    <Typography className="text-white text-center font-poppins-semibold">
                      {classItem.type === "Live" ? "Start Class" : "View Recording"}
                    </Typography>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View>
            <Typography className="text-[--text-color) text-xl mb-4">Quick Actions</Typography>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <Typography className="text-[--text-color] text-center font-poppins-semibold">Create Class</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <Typography className="text-[--text-color] text-center font-poppins-semibold">
                  Upload Resource
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Recent Notifications</Typography>
            <View className="gap-3">
              {notifications.map((notification) => (
                <View
                  key={notification.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <Typography className="text-[--text-color] text-base mb-1">{notification.message}</Typography>
                  <Typography className="text-[--nav-text-color] text-sm">{notification.time}</Typography>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
