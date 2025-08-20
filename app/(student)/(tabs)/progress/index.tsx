"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function ProgressTracking() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const studySuggestions = [
    {
      id: 1,
      title: "Focus on Calculus",
      description: "You need more practice with derivatives",
      icon: "📊",
      priority: "High",
    },
    {
      id: 2,
      title: "Review Physics Laws",
      description: "Strengthen your understanding of Newton's laws",
      icon: "⚡",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Chemistry Formulas",
      description: "Practice organic chemistry reactions",
      icon: "🧪",
      priority: "Low",
    },
  ]

  const weeklyStats = [
    { subject: "Mathematics", hours: 12, progress: 85 },
    { subject: "Physics", hours: 8, progress: 72 },
    { subject: "Chemistry", hours: 6, progress: 68 },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600"
      case "Medium":
        return "bg-yellow-100 text-yellow-600"
      case "Low":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className=" text-[--text-color] mt-8 text-xl">Progress Tracking</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Overall Progress Chart */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Overall Progress</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="items-center gap-4">
                <View className="w-full h-40 bg-gray-100 rounded-xl items-center justify-center">
                  <Typography className="text-gray-500 text-lg">📈 Progress Chart</Typography>
                  <Typography className="text-gray-400 text-sm mt-2">Weekly Performance</Typography>
                </View>
                <View className="flex-row justify-between w-full">
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">78%</Typography>
                    <Typography className="text-[--text-color] text-sm">Overall</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">26h</Typography>
                    <Typography className="text-[--text-color] text-sm">This Week</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">+12%</Typography>
                    <Typography className="text-[--text-color] text-sm">Improvement</Typography>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Weekly Stats */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Weekly Stats</Typography>
            <View className="gap-3">
              {weeklyStats.map((stat, index) => (
                <View
                  key={index}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <Typography className="text-[--text-color] text-lg">{stat.subject}</Typography>
                    <Typography className="text-[--text-color] text-base">{stat.hours}h studied</Typography>
                  </View>
                  <View className="gap-2">
                    <View className="flex-row justify-between">
                      <Typography className="text-[--text-color] text-sm">Progress</Typography>
                      <Typography className="text-[--text-color] text-sm">{stat.progress}%</Typography>
                    </View>
                    <View className="w-full h-2 bg-gray-200 rounded-full">
                      <View className="h-2 bg-[--primary-color] rounded-full" style={{ width: `${stat.progress}%` }} />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* AI Study Suggestions */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">AI Study Suggestions</Typography>
            <View className="gap-3">
              {studySuggestions.map((suggestion) => (
                <View
                  key={suggestion.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-start gap-3">
                    <Typography className="text-2xl">{suggestion.icon}</Typography>
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-2">
                        <Typography className="text-[--text-color] text-lg">{suggestion.title}</Typography>
                        <View className={`px-2 py-1 rounded-md ${getPriorityColor(suggestion.priority)}`}>
                          <Typography className="text-xs">{suggestion.priority}</Typography>
                        </View>
                      </View>
                      <Typography className="text-[--text-color] text-base mb-3">{suggestion.description}</Typography>
                      <TouchableOpacity className="bg-[--primary-color] py-2 px-4 rounded-xl self-start">
                        <Typography className="text-white">Start Practice</Typography>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Monthly Comparison */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Monthly Comparison</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="items-center gap-4">
                <View className="w-full h-32 bg-gray-100 rounded-xl items-center justify-center">
                  <Typography className="text-gray-500 text-lg">📊 Bar Chart</Typography>
                  <Typography className="text-gray-400 text-sm mt-2">Monthly Performance</Typography>
                </View>
                <View className="flex-row justify-between w-full">
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">Last Month</Typography>
                    <Typography className="text-[--text-color] text-base">72%</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-[--text-color] text-lg">This Month</Typography>
                    <Typography className="text-[--text-color] text-base">78%</Typography>
                  </View>
                  <View className="items-center">
                    <Typography className="text-green-600 text-lg">+6%</Typography>
                    <Typography className="text-[--text-color] text-base">Growth</Typography>
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
