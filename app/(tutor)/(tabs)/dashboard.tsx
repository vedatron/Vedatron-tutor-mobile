"use client"

import { useState } from "react"
import { View, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, Modal } from "react-native"
import { Typography } from "@/components/Typography"

export default function TutorDashboard() {
  const [refreshing, setRefreshing] = useState(false)
  const [userType, setUserType] = useState<"tutor" | "institute">("tutor")
  const [showQuickActions, setShowQuickActions] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const stats =
    userType === "tutor"
      ? [
          { label: "Active Classes", value: "12", change: "+2", color: "text-blue-600" },
          { label: "Total Students", value: "156", change: "+8", color: "text-green-600" },
          { label: "Monthly Revenue", value: "₹45,200", change: "+12%", color: "text-purple-600" },
          { label: "Rating", value: "4.8", change: "+0.2", color: "text-yellow-600" },
        ]
      : [
          { label: "Active Tutors", value: "24", change: "+3", color: "text-blue-600" },
          { label: "Total Students", value: "1,240", change: "+45", color: "text-green-600" },
          { label: "Monthly Revenue", value: "₹3,85,000", change: "+18%", color: "text-purple-600" },
          { label: "Institute Rating", value: "4.6", change: "+0.1", color: "text-yellow-600" },
        ]

  const upcomingClasses = [
    {
      id: 1,
      subject: "Advanced Mathematics",
      time: "10:00 AM",
      students: 25,
      type: "live",
      tutor: userType === "institute" ? "Dr. Sarah Wilson" : null,
    },
    {
      id: 2,
      subject: "Physics Fundamentals",
      time: "2:00 PM",
      students: 18,
      type: "live",
      tutor: userType === "institute" ? "Prof. John Smith" : null,
    },
    {
      id: 3,
      subject: "Chemistry Lab",
      time: "4:30 PM",
      students: 12,
      type: "recorded",
      tutor: userType === "institute" ? "Dr. Emily Brown" : null,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New student enrolled",
      details: "Alex Johnson joined Advanced Math",
      time: "2 hours ago",
      type: "enrollment",
    },
    {
      id: 2,
      action: "Class completed",
      details: "Physics Fundamentals - 18 students attended",
      time: "4 hours ago",
      type: "class",
    },
    {
      id: 3,
      action: "Payment received",
      details: "₹2,500 from monthly subscriptions",
      time: "6 hours ago",
      type: "payment",
    },
    { id: 4, action: "New review", details: "5-star rating from Maria Garcia", time: "1 day ago", type: "review" },
  ]

  const quickActions = [
    { id: 1, title: "Create Live Class", icon: "📹", action: () => {} },
    { id: 2, title: "Upload Content", icon: "📚", action: () => {} },
    { id: 3, title: "View Analytics", icon: "📊", action: () => {} },
    { id: 4, title: "Manage Students", icon: "👥", action: () => {} },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center py-6">
          <View>
            <Typography className="text-2xl font-bold text-foreground">
              {userType === "tutor" ? "Tutor Dashboard" : "Institute Dashboard"}
            </Typography>
            <Typography className="text-sm text-muted-foreground mt-1">
              Welcome back, {userType === "tutor" ? "Dr. Smith" : "EduTech Institute"}
            </Typography>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`px-3 py-1 rounded-full ${userType === "tutor" ? "bg-primary" : "bg-muted"}`}
              onPress={() => setUserType("tutor")}
            >
              <Typography
                className={`text-xs ${userType === "tutor" ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                Tutor
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              className={`px-3 py-1 rounded-full ${userType === "institute" ? "bg-primary" : "bg-muted"}`}
              onPress={() => setUserType("institute")}
            >
              <Typography
                className={`text-xs ${userType === "institute" ? "text-primary-foreground" : "text-muted-foreground"}`}
              >
                Institute
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          {stats.map((stat, index) => (
            <View key={index} className="flex-1 min-w-[45%] bg-card p-4 rounded-xl border border-border">
              <Typography className="text-sm text-muted-foreground">{stat.label}</Typography>
              <Typography className="text-2xl font-bold text-foreground mt-1">{stat.value}</Typography>
              <Typography className={`text-xs mt-1 ${stat.color}`}>{stat.change}</Typography>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Typography className="text-lg font-semibold text-foreground">Quick Actions</Typography>
            <TouchableOpacity onPress={() => setShowQuickActions(true)}>
              <Typography className="text-sm text-primary">View All</Typography>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-3">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-card p-4 rounded-xl border border-border w-32 items-center"
                onPress={action.action}
              >
                <Typography className="text-2xl mb-2">{action.icon}</Typography>
                <Typography className="text-xs text-center text-foreground font-medium">{action.title}</Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Classes */}
        <View className="mb-6">
          <Typography className="text-lg font-semibold text-foreground mb-4">Today's Classes</Typography>
          {upcomingClasses.map((classItem) => (
            <View key={classItem.id} className="bg-card p-4 rounded-xl border border-border mb-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Typography className="text-base font-semibold text-foreground">{classItem.subject}</Typography>
                  {classItem.tutor && (
                    <Typography className="text-sm text-muted-foreground mt-1">by {classItem.tutor}</Typography>
                  )}
                  <View className="flex-row items-center mt-2">
                    <Typography className="text-sm text-muted-foreground">
                      {classItem.time} • {classItem.students} students
                    </Typography>
                    <View
                      className={`ml-2 px-2 py-1 rounded-full ${classItem.type === "live" ? "bg-green-100" : "bg-blue-100"}`}
                    >
                      <Typography
                        className={`text-xs ${classItem.type === "live" ? "text-green-700" : "text-blue-700"}`}
                      >
                        {classItem.type}
                      </Typography>
                    </View>
                  </View>
                </View>
                <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg">
                  <Typography className="text-sm font-medium text-primary-foreground">
                    {classItem.type === "live" ? "Join" : "View"}
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Activities */}
        <View className="mb-6">
          <Typography className="text-lg font-semibold text-foreground mb-4">Recent Activities</Typography>
          {recentActivities.map((activity) => (
            <View key={activity.id} className="bg-card p-4 rounded-xl border border-border mb-3">
              <View className="flex-row items-start">
                <View
                  className={`w-3 h-3 rounded-full mt-1 mr-3 ${
                    activity.type === "enrollment"
                      ? "bg-green-500"
                      : activity.type === "class"
                        ? "bg-blue-500"
                        : activity.type === "payment"
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                  }`}
                />
                <View className="flex-1">
                  <Typography className="text-sm font-medium text-foreground">{activity.action}</Typography>
                  <Typography className="text-xs text-muted-foreground mt-1">{activity.details}</Typography>
                  <Typography className="text-xs text-muted-foreground mt-1">{activity.time}</Typography>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Performance Chart Placeholder */}
        <View className="bg-card p-4 rounded-xl border border-border mb-6">
          <Typography className="text-lg font-semibold text-foreground mb-4">Performance Overview</Typography>
          <View className="h-40 bg-muted rounded-lg items-center justify-center">
            <Typography className="text-muted-foreground">📊 Chart will be rendered here</Typography>
            <Typography className="text-xs text-muted-foreground mt-2">Revenue & Student Growth</Typography>
          </View>
        </View>
      </ScrollView>

      {/* Quick Actions Modal */}
      <Modal visible={showQuickActions} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-card rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Typography className="text-lg font-semibold text-foreground">All Actions</Typography>
              <TouchableOpacity onPress={() => setShowQuickActions(false)}>
                <Typography className="text-primary">Close</Typography>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap gap-3">
              {quickActions
                .concat([
                  { id: 5, title: "Schedule Class", icon: "📅", action: () => {} },
                  { id: 6, title: "Send Message", icon: "💬", action: () => {} },
                  { id: 7, title: "Generate Report", icon: "📋", action: () => {} },
                  { id: 8, title: "Settings", icon: "⚙️", action: () => {} },
                ])
                .map((action) => (
                  <TouchableOpacity
                    key={action.id}
                    className="bg-muted p-4 rounded-xl w-[48%] items-center"
                    onPress={() => {
                      action.action()
                      setShowQuickActions(false)
                    }}
                  >
                    <Typography className="text-2xl mb-2">{action.icon}</Typography>
                    <Typography className="text-xs text-center text-foreground font-medium">{action.title}</Typography>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
