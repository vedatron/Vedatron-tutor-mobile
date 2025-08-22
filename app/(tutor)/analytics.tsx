"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Analytics() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const analyticsData = {
    monthly: {
      totalClasses: 45,
      totalStudents: 125,
      avgAttendance: 87,
      avgRating: 4.8,
      completionRate: 92,
    },
    weekly: {
      totalClasses: 12,
      totalStudents: 125,
      avgAttendance: 89,
      avgRating: 4.9,
      completionRate: 95,
    },
  }

  const subjectPerformance = [
    { subject: "Mathematics", students: 45, avgScore: 85, attendance: 92 },
    { subject: "Physics", students: 38, avgScore: 78, attendance: 88 },
    { subject: "Chemistry", students: 42, avgScore: 82, attendance: 85 },
  ]

  const recentFeedback = [
    { id: 1, student: "John Doe", rating: 5, comment: "Excellent teaching method!", date: "2024-01-19" },
    { id: 2, student: "Sarah Wilson", rating: 4, comment: "Very helpful explanations", date: "2024-01-18" },
    { id: 3, student: "Mike Johnson", rating: 5, comment: "Great interactive sessions", date: "2024-01-17" },
  ]

  const periods = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
  ]

  const currentData = analyticsData[selectedPeriod as keyof typeof analyticsData]

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Analytics & Reports</Typography>
          <Typography className="text-[--nav-text-color] text-base">Track your teaching performance</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Period Selector */}
          <View className="flex-row bg-[--field-background-color] rounded-xl p-1">
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                onPress={() => setSelectedPeriod(period.id)}
                className={`flex-1 py-2 rounded-lg ${selectedPeriod === period.id ? "bg-[--primary-color]" : ""}`}
              >
                <Typography
                  className={`text-center text-sm ${
                    selectedPeriod === period.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
                  }`}
                >
                  {period.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>

          {/* Key Metrics */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Key Metrics</Typography>
            <View className="gap-3">
              <View className="flex-row gap-3">
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Classes Taught</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {currentData.totalClasses}
                  </Typography>
                </View>
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Total Students</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {currentData.totalStudents}
                  </Typography>
                </View>
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Avg Attendance</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {currentData.avgAttendance}%
                  </Typography>
                </View>
                <View className="flex-1 bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                  <Typography className="text-[--nav-text-color] text-base">Avg Rating</Typography>
                  <Typography className="text-[--text-color] text-2xl font-poppins-bold">
                    {currentData.avgRating}
                  </Typography>
                </View>
              </View>
            </View>
          </View>

          {/* Subject Performance */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Subject Performance</Typography>
            <View className="gap-3">
              {subjectPerformance.map((subject, index) => (
                <View
                  key={index}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-3">
                    {subject.subject}
                  </Typography>

                  <View className="flex-row justify-between mb-3">
                    <View className="items-center">
                      <Typography className="text-[--text-color] text-lg font-poppins-bold">
                        {subject.students}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">Students</Typography>
                    </View>
                    <View className="items-center">
                      <Typography className="text-[--text-color] text-lg font-poppins-bold">
                        {subject.avgScore}%
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">Avg Score</Typography>
                    </View>
                    <View className="items-center">
                      <Typography className="text-[--text-color] text-lg font-poppins-bold">
                        {subject.attendance}%
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">Attendance</Typography>
                    </View>
                  </View>

                  <View className="bg-[--field-background-color] p-3 rounded-xl">
                    <View className="flex-row justify-between items-center">
                      <Typography className="text-[--text-color] text-base">Performance</Typography>
                      <Typography className="text-[--text-color] text-base font-poppins-semibold">
                        {subject.avgScore >= 85 ? "Excellent" : subject.avgScore >= 75 ? "Good" : "Average"}
                      </Typography>
                    </View>
                    <View className="bg-gray-200 h-2 rounded-full mt-2">
                      <View
                        className="bg-[--primary-color] h-2 rounded-full"
                        style={{ width: `${subject.avgScore}%` }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Recent Feedback */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Recent Student Feedback</Typography>
            <View className="gap-3">
              {recentFeedback.map((feedback) => (
                <View
                  key={feedback.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                      {feedback.student}
                    </Typography>
                    <View className="flex-row items-center gap-1">
                      <Typography className="text-[--text-color] text-base font-poppins-bold">
                        {feedback.rating}
                      </Typography>
                      <Typography className="text-yellow-500 text-base">★</Typography>
                    </View>
                  </View>
                  <Typography className="text-[--nav-text-color] text-base mb-2">"{feedback.comment}"</Typography>
                  <Typography className="text-[--nav-text-color] text-sm">{feedback.date}</Typography>
                </View>
              ))}
            </View>
          </View>

          {/* Export Reports */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">Export Reports</Typography>
            <View className="gap-3">
              <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                <Typography className="text-white text-center font-poppins-semibold">
                  Download Monthly Report
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity className="border border-(--primary-color) py-3 rounded-xl">
                <Typography className="text-[--primary-color] text-center font-poppins-semibold">
                  Download Student Performance Report
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
