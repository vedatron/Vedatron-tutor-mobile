"use client"

import { useState } from "react"
import { View, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, Modal, TextInput } from "react-native"
import { Typography } from "@/components/Typography"

export default function StudentManagement() {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      avatar: "👨‍🎓",
      enrolledClasses: ["Advanced Math", "Physics"],
      totalClasses: 24,
      attendedClasses: 22,
      averageScore: 87,
      lastActive: "2 hours ago",
      status: "active",
      joinDate: "2024-01-15",
      performance: "excellent",
      assignments: { completed: 18, total: 20 },
      tests: { passed: 8, total: 10 },
    },
    {
      id: 2,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      avatar: "👩‍🎓",
      enrolledClasses: ["Chemistry", "Biology"],
      totalClasses: 18,
      attendedClasses: 16,
      averageScore: 92,
      lastActive: "1 day ago",
      status: "active",
      joinDate: "2024-02-01",
      performance: "excellent",
      assignments: { completed: 15, total: 16 },
      tests: { passed: 7, total: 8 },
    },
    {
      id: 3,
      name: "David Chen",
      email: "david.chen@email.com",
      avatar: "👨‍🎓",
      enrolledClasses: ["Programming", "Math"],
      totalClasses: 20,
      attendedClasses: 15,
      averageScore: 78,
      lastActive: "3 days ago",
      status: "inactive",
      joinDate: "2024-01-20",
      performance: "good",
      assignments: { completed: 12, total: 18 },
      tests: { passed: 6, total: 9 },
    },
  ]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || student.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "average":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-6">
        <Typography className="text-2xl font-bold text-foreground mb-6">Student Management</Typography>

        {/* Search and Filter */}
        <View className="mb-6">
          <TextInput
            className="bg-card border border-border rounded-lg px-4 py-3 text-foreground mb-4"
            placeholder="Search students..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
            {[
              { key: "all", label: "All Students" },
              { key: "active", label: "Active" },
              { key: "inactive", label: "Inactive" },
              { key: "excellent", label: "Top Performers" },
              { key: "poor", label: "Need Attention" },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                className={`px-4 py-2 rounded-full ${selectedFilter === filter.key ? "bg-primary" : "bg-muted"}`}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Typography
                  className={`text-sm font-medium ${
                    selectedFilter === filter.key ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {filter.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Overview */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-card p-4 rounded-xl border border-border">
            <Typography className="text-2xl font-bold text-foreground">{students.length}</Typography>
            <Typography className="text-sm text-muted-foreground">Total Students</Typography>
          </View>
          <View className="flex-1 bg-card p-4 rounded-xl border border-border">
            <Typography className="text-2xl font-bold text-green-600">
              {students.filter((s) => s.status === "active").length}
            </Typography>
            <Typography className="text-sm text-muted-foreground">Active</Typography>
          </View>
          <View className="flex-1 bg-card p-4 rounded-xl border border-border">
            <Typography className="text-2xl font-bold text-foreground">
              {Math.round(students.reduce((acc, s) => acc + s.averageScore, 0) / students.length)}%
            </Typography>
            <Typography className="text-sm text-muted-foreground">Avg Score</Typography>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredStudents.map((student) => (
          <TouchableOpacity
            key={student.id}
            className="bg-card p-4 rounded-xl border border-border mb-4"
            onPress={() => {
              setSelectedStudent(student)
              setShowStudentModal(true)
            }}
          >
            <View className="flex-row items-start">
              <View className="w-12 h-12 bg-muted rounded-full items-center justify-center mr-4">
                <Typography className="text-2xl">{student.avatar}</Typography>
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-start mb-2">
                  <View>
                    <Typography className="text-lg font-semibold text-foreground">{student.name}</Typography>
                    <Typography className="text-sm text-muted-foreground">{student.email}</Typography>
                  </View>
                  <View className={`px-2 py-1 rounded-full ${getStatusColor(student.status)}`}>
                    <Typography className="text-xs font-medium">{student.status}</Typography>
                  </View>
                </View>

                <View className="flex-row justify-between items-center mb-3">
                  <Typography className="text-sm text-muted-foreground">
                    {student.enrolledClasses.join(", ")}
                  </Typography>
                  <Typography className={`text-sm font-medium ${getPerformanceColor(student.performance)}`}>
                    {student.averageScore}% avg
                  </Typography>
                </View>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row gap-4">
                    <View>
                      <Typography className="text-xs text-muted-foreground">Attendance</Typography>
                      <Typography className="text-sm font-medium text-foreground">
                        {student.attendedClasses}/{student.totalClasses}
                      </Typography>
                    </View>
                    <View>
                      <Typography className="text-xs text-muted-foreground">Assignments</Typography>
                      <Typography className="text-sm font-medium text-foreground">
                        {student.assignments.completed}/{student.assignments.total}
                      </Typography>
                    </View>
                    <View>
                      <Typography className="text-xs text-muted-foreground">Tests</Typography>
                      <Typography className="text-sm font-medium text-foreground">
                        {student.tests.passed}/{student.tests.total}
                      </Typography>
                    </View>
                  </View>
                  <Typography className="text-xs text-muted-foreground">{student.lastActive}</Typography>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Student Detail Modal */}
      <Modal visible={showStudentModal} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-card rounded-t-3xl p-6 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Typography className="text-xl font-semibold text-foreground">Student Details</Typography>
              <TouchableOpacity onPress={() => setShowStudentModal(false)}>
                <Typography className="text-primary">Close</Typography>
              </TouchableOpacity>
            </View>

            {selectedStudent && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Student Header */}
                <View className="flex-row items-center mb-6">
                  <View className="w-16 h-16 bg-muted rounded-full items-center justify-center mr-4">
                    <Typography className="text-3xl">{selectedStudent.avatar}</Typography>
                  </View>
                  <View className="flex-1">
                    <Typography className="text-xl font-bold text-foreground">{selectedStudent.name}</Typography>
                    <Typography className="text-sm text-muted-foreground">{selectedStudent.email}</Typography>
                    <Typography className="text-xs text-muted-foreground mt-1">
                      Joined {selectedStudent.joinDate}
                    </Typography>
                  </View>
                </View>

                {/* Performance Metrics */}
                <View className="bg-muted p-4 rounded-xl mb-6">
                  <Typography className="text-lg font-semibold text-foreground mb-4">Performance Overview</Typography>
                  <View className="flex-row justify-between mb-4">
                    <View className="items-center">
                      <Typography className="text-2xl font-bold text-foreground">
                        {selectedStudent.averageScore}%
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">Average Score</Typography>
                    </View>
                    <View className="items-center">
                      <Typography className="text-2xl font-bold text-foreground">
                        {Math.round((selectedStudent.attendedClasses / selectedStudent.totalClasses) * 100)}%
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">Attendance</Typography>
                    </View>
                    <View className="items-center">
                      <Typography className="text-2xl font-bold text-foreground">
                        {Math.round((selectedStudent.assignments.completed / selectedStudent.assignments.total) * 100)}%
                      </Typography>
                      <Typography className="text-xs text-muted-foreground">Assignments</Typography>
                    </View>
                  </View>

                  {/* Progress Bars */}
                  <View className="gap-3">
                    <View>
                      <View className="flex-row justify-between mb-1">
                        <Typography className="text-xs text-muted-foreground">Class Attendance</Typography>
                        <Typography className="text-xs text-muted-foreground">
                          {selectedStudent.attendedClasses}/{selectedStudent.totalClasses}
                        </Typography>
                      </View>
                      <View className="h-2 bg-border rounded-full">
                        <View
                          className="h-2 bg-green-500 rounded-full"
                          style={{
                            width: `${(selectedStudent.attendedClasses / selectedStudent.totalClasses) * 100}%`,
                          }}
                        />
                      </View>
                    </View>

                    <View>
                      <View className="flex-row justify-between mb-1">
                        <Typography className="text-xs text-muted-foreground">Assignment Completion</Typography>
                        <Typography className="text-xs text-muted-foreground">
                          {selectedStudent.assignments.completed}/{selectedStudent.assignments.total}
                        </Typography>
                      </View>
                      <View className="h-2 bg-border rounded-full">
                        <View
                          className="h-2 bg-blue-500 rounded-full"
                          style={{
                            width: `${(selectedStudent.assignments.completed / selectedStudent.assignments.total) * 100}%`,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* Enrolled Classes */}
                <View className="mb-6">
                  <Typography className="text-lg font-semibold text-foreground mb-3">Enrolled Classes</Typography>
                  {selectedStudent.enrolledClasses.map((className: string, index: number) => (
                    <View key={index} className="bg-muted p-3 rounded-lg mb-2">
                      <Typography className="text-sm font-medium text-foreground">{className}</Typography>
                    </View>
                  ))}
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg">
                    <Typography className="text-center text-primary-foreground font-medium">Send Message</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-muted py-3 rounded-lg">
                    <Typography className="text-center text-foreground font-medium">View Progress</Typography>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
