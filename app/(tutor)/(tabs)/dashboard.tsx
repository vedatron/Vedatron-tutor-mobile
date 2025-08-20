import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "../../../lib/stores/auth"
import { Card } from "../../../components/ui/Card"

export default function TeacherDashboard() {
  const { user, logout } = useAuthStore()

  const stats = [
    { label: "Total Students", value: "156", color: "text-green-600", icon: "people-outline" },
    { label: "Active Courses", value: "8", color: "text-blue-600", icon: "book-outline" },
    { label: "This Month Revenue", value: "₹45,000", color: "text-yellow-600", icon: "card-outline" },
    { label: "Avg Rating", value: "4.8", color: "text-purple-600", icon: "star-outline" },
  ]

  const recentActivities = [
    { title: "New student enrolled in Math Course", time: "2 hours ago", type: "enrollment" },
    { title: "Assignment submitted by 15 students", time: "4 hours ago", type: "assignment" },
    { title: "Live class completed - Physics", time: "1 day ago", type: "class" },
  ]

  const upcomingClasses = [
    { title: "Advanced Mathematics", time: "Today at 2:00 PM", students: 25 },
    { title: "Physics Lab Session", time: "Tomorrow at 10:00 AM", students: 18 },
    { title: "Chemistry Revision", time: "Friday at 3:00 PM", students: 22 },
  ]

  const quickActions = [
    { title: "Create Course", icon: "add-circle-outline", color: "bg-green-100", iconColor: "text-green-600" },
    { title: "Start Live Class", icon: "videocam-outline", color: "bg-red-100", iconColor: "text-red-600" },
    { title: "Grade Assignments", icon: "document-text-outline", color: "bg-blue-100", iconColor: "text-blue-600" },
    { title: "View Analytics", icon: "bar-chart-outline", color: "bg-purple-100", iconColor: "text-purple-600" },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-green-600 px-6 py-8">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg">Welcome Back!</Text>
              <Text className="text-white text-2xl font-bold">{user?.name || "Teacher"}</Text>
            </View>
            <TouchableOpacity onPress={logout} className="bg-white/20 p-3 rounded-full">
              <Ionicons name="log-out-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-6">
          {/* Stats Grid */}
          <View className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-4 items-center">
                <Ionicons name={stat.icon as any} size={24} color="#6B7280" className="mb-2" />
                <Text className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</Text>
                <Text className="text-gray-600 text-sm text-center">{stat.label}</Text>
              </Card>
            ))}
          </View>

          {/* Upcoming Classes */}
          <Card className="mb-6 p-6">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-900">Upcoming Classes</Text>
              <TouchableOpacity>
                <Text className="text-green-600 font-medium">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-3">
              {upcomingClasses.map((classItem, index) => (
                <View key={index} className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="font-medium text-gray-900">{classItem.title}</Text>
                    <Text className="text-gray-600 text-sm">{classItem.time}</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-green-600 font-medium">{classItem.students} students</Text>
                    <TouchableOpacity className="bg-green-100 px-3 py-1 rounded-full mt-1">
                      <Text className="text-green-600 text-sm font-medium">Start</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Recent Activities */}
          <Card className="mb-6 p-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</Text>
            <View className="space-y-3">
              {recentActivities.map((activity, index) => (
                <View key={index} className="flex-row items-start">
                  <View className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3" />
                  <View className="flex-1">
                    <Text className="text-gray-900 font-medium">{activity.title}</Text>
                    <Text className="text-gray-600 text-sm">{activity.time}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Quick Actions */}
          <Text className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</Text>
          <View className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index}>
                <Card className="p-6 items-center">
                  <View className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mb-3`}>
                    <Ionicons name={action.icon as any} size={24} className={action.iconColor} />
                  </View>
                  <Text className="text-gray-900 font-medium text-center">{action.title}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
