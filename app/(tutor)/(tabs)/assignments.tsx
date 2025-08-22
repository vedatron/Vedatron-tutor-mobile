"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Assignments() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("create")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const assignments = [
    {
      id: 1,
      title: "Calculus Problem Set 1",
      subject: "Mathematics",
      dueDate: "2024-01-20",
      submissions: 15,
      totalStudents: 25,
      status: "active",
    },
    {
      id: 2,
      title: "Physics Lab Report",
      subject: "Physics",
      dueDate: "2024-01-18",
      submissions: 12,
      totalStudents: 18,
      status: "grading",
    },
    {
      id: 3,
      title: "Chemistry Quiz 2",
      subject: "Chemistry",
      dueDate: "2024-01-15",
      submissions: 12,
      totalStudents: 12,
      status: "completed",
    },
  ]

  const submissions = [
    {
      id: 1,
      studentName: "John Doe",
      assignment: "Calculus Problem Set 1",
      submittedAt: "2024-01-19 10:30 AM",
      status: "pending",
      score: null,
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      assignment: "Physics Lab Report",
      submittedAt: "2024-01-18 2:15 PM",
      status: "graded",
      score: 85,
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      assignment: "Chemistry Quiz 2",
      submittedAt: "2024-01-15 11:45 AM",
      status: "graded",
      score: 92,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-600"
      case "grading":
        return "bg-yellow-100 text-yellow-600"
      case "completed":
        return "bg-green-100 text-green-600"
      case "pending":
        return "bg-orange-100 text-orange-600"
      case "graded":
        return "bg-green-100 text-green-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const tabs = [
    { id: "create", label: "Create" },
    { id: "assignments", label: "My Assignments" },
    { id: "submissions", label: "Submissions" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Assignments</Typography>
        </View>

        {/* Tabs */}
        <View className="bg-[--card-background-color] px-4 pb-4 border-b border-[--card-border-color]">
          <View className="flex-row bg-[--field-background-color] rounded-xl p-1">
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
          {/* Create Tab */}
          {activeTab === "create" && (
            <View className="gap-4">
              <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">
                  Create New Assignment
                </Typography>

                <View className="gap-4">
                  <TouchableOpacity className="bg-[--primary-color] py-4 rounded-xl flex-row items-center justify-center gap-2">
                    <Typography className="text-white text-lg font-poppins-semibold">+ Create Assignment</Typography>
                  </TouchableOpacity>

                  <TouchableOpacity className="border border-(--primary-color) py-4 rounded-xl flex-row items-center justify-center gap-2">
                    <Typography className="text-[--primary-color] text-lg font-poppins-semibold">
                      + Create Quiz
                    </Typography>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">
                  Quick Templates
                </Typography>

                <View className="gap-3">
                  <TouchableOpacity className="bg-[--field-background-color] p-3 rounded-xl">
                    <Typography className="text-[--text-color] font-poppins-semibold">Multiple Choice Quiz</Typography>
                    <Typography className="text-[--nav-text-color] text-sm">Auto-graded quiz template</Typography>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-[--field-background-color] p-3 rounded-xl">
                    <Typography className="text-[--text-color] font-poppins-semibold">Essay Assignment</Typography>
                    <Typography className="text-[--nav-text-color] text-sm">Long-form writing assignment</Typography>
                  </TouchableOpacity>

                  <TouchableOpacity className="bg-[--field-background-color] p-3 rounded-xl">
                    <Typography className="text-[--text-color] font-poppins-semibold">Problem Set</Typography>
                    <Typography className="text-[--nav-text-color] text-sm">Math/Science problem collection</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Assignments Tab */}
          {activeTab === "assignments" && (
            <View className="gap-3">
              {assignments.map((assignment) => (
                <View
                  key={assignment.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {assignment.title}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">{assignment.subject}</Typography>
                      <Typography className="text-[--nav-text-color] text-sm">Due: {assignment.dueDate}</Typography>
                    </View>
                    <View className={`px-3 py-1 rounded-xl ${getStatusColor(assignment.status)}`}>
                      <Typography className="text-sm capitalize">{assignment.status}</Typography>
                    </View>
                  </View>

                  <View className="bg-[--field-background-color] p-3 rounded-xl mb-3">
                    <View className="flex-row justify-between">
                      <Typography className="text-[--text-color] text-base">Submissions</Typography>
                      <Typography className="text-[--text-color] text-base font-poppins-semibold">
                        {assignment.submissions}/{assignment.totalStudents}
                      </Typography>
                    </View>
                    <View className="bg-gray-200 h-2 rounded-full mt-2">
                      <View
                        className="bg-[--primary-color] h-2 rounded-full"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      />
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                      <Typography className="text-white text-center font-poppins-semibold">View Details</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                      <Typography className="text-[--text-color] text-center">Edit</Typography>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Submissions Tab */}
          {activeTab === "submissions" && (
            <View className="gap-3">
              {submissions.map((submission) => (
                <View
                  key={submission.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {submission.studentName}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">{submission.assignment}</Typography>
                      <Typography className="text-[--nav-text-color] text-sm">
                        Submitted: {submission.submittedAt}
                      </Typography>
                    </View>
                    <View className="items-end">
                      <View className={`px-3 py-1 rounded-xl ${getStatusColor(submission.status)}`}>
                        <Typography className="text-sm capitalize">{submission.status}</Typography>
                      </View>
                      {submission.score && (
                        <Typography className="text-[--text-color] text-lg font-poppins-bold mt-1">
                          {submission.score}/100
                        </Typography>
                      )}
                    </View>
                  </View>

                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                      <Typography className="text-white text-center font-poppins-semibold">
                        {submission.status === "pending" ? "Grade Now" : "View Submission"}
                      </Typography>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                      <Typography className="text-[--text-color] text-center">Download</Typography>
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
