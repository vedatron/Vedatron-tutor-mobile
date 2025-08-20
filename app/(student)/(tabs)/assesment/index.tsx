"use client"

import { useState } from "react"
import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { Typography } from "@/components/Typography"

export default function Assessments() {
  const [activeTab, setActiveTab] = useState("Quizzes")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const quizzes = [
    { id: 1, title: "Algebra Quiz", subject: "Mathematics", difficulty: "Medium", status: "Pending", questions: 15 },
    {
      id: 2,
      title: "Thermodynamics Test",
      subject: "Physics",
      difficulty: "Hard",
      status: "Completed",
      questions: 20,
      score: 85,
    },
  ]

  const mockTests = [
    {
      id: 1,
      title: "JEE Main Mock Test 1",
      subject: "All Subjects",
      difficulty: "Hard",
      status: "Pending",
      duration: "3 hours",
    },
    {
      id: 2,
      title: "NEET Practice Test",
      subject: "Biology, Chemistry, Physics",
      difficulty: "Hard",
      status: "Completed",
      duration: "3 hours",
      score: 78,
    },
  ]

  const previousPapers = [
    { id: 1, title: "JEE Advanced 2023", subject: "All Subjects", year: "2023", status: "Completed", score: 92 },
    { id: 2, title: "CBSE Board 2023 - Math", subject: "Mathematics", year: "2023", status: "Pending" },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-600"
      case "Medium":
        return "bg-yellow-100 text-yellow-600"
      case "Hard":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const renderTabContent = () => {
    let items:any[]= []
    switch (activeTab) {
      case "Quizzes":
        items = quizzes
        break
      case "Mock Tests":
        items = mockTests
        break
      case "Previous Papers":
        items = previousPapers
        break
      default:
        items = []
    }

    return (
      <View className="gap-3">
        {items.map((item) => (
          <View
            key={item.id}
            className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
          >
            <View className="gap-3">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Typography className="text-[--text-color] text-lg">{item.title}</Typography>
                  <Typography className="text-[--text-color] text-base">{item.subject}</Typography>
                </View>
                <View
                  className={`px-2 py-1 rounded-md ${item.status === "Completed" ? "bg-green-100" : "bg-blue-100"}`}
                >
                  <Typography className={`text-sm ${item.status === "Completed" ? "text-green-600" : "text-blue-600"}`}>
                    {item.status}
                  </Typography>
                </View>
              </View>

              <View className="flex-row items-center gap-4">
                {item.difficulty && (
                  <View className={`px-2 py-1 rounded-md ${getDifficultyColor(item.difficulty)}`}>
                    <Typography className="text-sm">{item.difficulty}</Typography>
                  </View>
                )}
                {item.questions && (
                  <Typography className="text-[--text-color] text-sm">{item.questions} questions</Typography>
                )}
                {item.duration && <Typography className="text-[--text-color] text-sm">{item.duration}</Typography>}
                {item.year && <Typography className="text-[--text-color] text-sm">{item.year}</Typography>}
              </View>

              {item.score && (
                <View className="bg-gray-50 p-2 rounded-xl">
                  <Typography className="text-[--text-color] text-sm">
                    Score: <Typography className="text-sm">{item.score}%</Typography>
                  </Typography>
                </View>
              )}

              <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                <Typography className="text-white text-center">
                  {item.status === "Completed" ? "Review" : "Start"}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    )
  }

  
  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <View className="flex-1 bg-[--background-color]">
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Assessments</Typography>
        </View>

        {/* Tabs */}
        <View className="bg-[--card-background-color] px-4 py-2 border-b border-[--card-border-color]">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {["Quizzes", "Mock Tests", "Previous Papers"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl ${activeTab === tab ? "bg-[--primary-color]" : "bg-gray-100"}`}
                >
                  <Typography className={`${activeTab === tab ? "text-white" : "text-[--text-color]"}`}>
                    {tab}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
