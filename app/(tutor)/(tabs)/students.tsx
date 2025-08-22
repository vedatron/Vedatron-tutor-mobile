"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, TextInput } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Students() {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const students = [
    {
      id: 1,
      name: "John Doe",
      course: "Mathematics",
      attendance: 85,
      performance: "Excellent",
      lastActive: "2 hours ago",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      course: "Physics",
      attendance: 92,
      performance: "Good",
      lastActive: "1 day ago",
      avatar: "SW",
    },
    {
      id: 3,
      name: "Mike Johnson",
      course: "Chemistry",
      attendance: 78,
      performance: "Average",
      lastActive: "3 hours ago",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Emily Davis",
      course: "Mathematics",
      attendance: 95,
      performance: "Excellent",
      lastActive: "30 minutes ago",
      avatar: "ED",
    },
  ]

  const filters = [
    { id: "all", label: "All Students" },
    { id: "mathematics", label: "Mathematics" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
  ]

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return "bg-green-100 text-green-600"
      case "Good":
        return "bg-blue-100 text-blue-600"
      case "Average":
        return "bg-yellow-100 text-yellow-600"
      case "Poor":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600"
    if (attendance >= 75) return "text-blue-600"
    if (attendance >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || student.course.toLowerCase() === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Students</Typography>
          <Typography className="text-[--nav-text-color] text-base">{students.length} enrolled students</Typography>
        </View>

        <View className="p-4 gap-4">
          {/* Search Bar */}
          <View className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md">
            <TextInput
              className="p-4 text-[--text-color] text-base"
              placeholder="Search students..."
              placeholderTextColor="var(--nav-text-color)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
            <View className="flex-row gap-2">
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.id}
                  onPress={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-xl ${
                    selectedFilter === filter.id
                      ? "bg-[--primary-color]"
                      : "bg-[--card-background-color] border border-[--card-border-color]"
                  }`}
                >
                  <Typography
                    className={`text-sm ${
                      selectedFilter === filter.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
                    }`}
                  >
                    {filter.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Students List */}
          <View className="gap-3">
            {filteredStudents.map((student) => (
              <View
                key={student.id}
                className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
              >
                <View className="flex-row items-center gap-4 mb-3">
                  <View className="w-12 h-12 bg-[--primary-color] rounded-full items-center justify-center">
                    <Typography className="text-white font-poppins-semibold">{student.avatar}</Typography>
                  </View>
                  <View className="flex-1">
                    <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                      {student.name}
                    </Typography>
                    <Typography className="text-[--nav-text-color] text-base">{student.course}</Typography>
                    <Typography className="text-[--nav-text-color] text-sm">
                      Last active: {student.lastActive}
                    </Typography>
                  </View>
                  <View className={`px-3 py-1 rounded-xl ${getPerformanceColor(student.performance)}`}>
                    <Typography className="text-sm">{student.performance}</Typography>
                  </View>
                </View>

                <View className="bg-[--field-background-color] p-3 rounded-xl mb-3">
                  <View className="flex-row justify-between items-center">
                    <Typography className="text-[--text-color] text-base">Attendance</Typography>
                    <Typography className={`text-base font-poppins-semibold ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}%
                    </Typography>
                  </View>
                  <View className="bg-gray-200 h-2 rounded-full mt-2">
                    <View
                      className={`h-2 rounded-full ${student.attendance >= 90 ? "bg-green-500" : student.attendance >= 75 ? "bg-blue-500" : student.attendance >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: `${student.attendance}%` }}
                    />
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                    <Typography className="text-white text-center font-poppins-semibold">View Profile</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                    <Typography className="text-[--text-color] text-center">Message</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
