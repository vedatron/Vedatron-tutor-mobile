import { View, Text, ScrollView } from "react-native"
import { Card } from "../../../components/ui/Card"
import { TrendingUp, Users, DollarSign, Star, BarChart3, PieChart } from "lucide-react-native"

export default function TeacherAnalyticsScreen() {
  const overviewStats = [
    { label: "Total Revenue", value: "₹1,25,000", change: "+12%", icon: DollarSign, color: "text-green-600" },
    { label: "Active Students", value: "156", change: "+8%", icon: Users, color: "text-blue-600" },
    { label: "Course Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-yellow-600" },
    { label: "Completion Rate", value: "78%", change: "+5%", icon: TrendingUp, color: "text-purple-600" },
  ]

  const coursePerformance = [
    { course: "Advanced Mathematics", students: 156, revenue: 45000, rating: 4.8, completion: 85 },
    { course: "Physics Fundamentals", students: 89, revenue: 28000, rating: 4.6, completion: 78 },
    { course: "Chemistry Basics", students: 67, revenue: 22000, rating: 4.9, completion: 92 },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 15000, students: 45 },
    { month: "Feb", revenue: 18000, students: 52 },
    { month: "Mar", revenue: 22000, students: 67 },
    { month: "Apr", revenue: 28000, students: 89 },
    { month: "May", revenue: 35000, students: 124 },
    { month: "Jun", revenue: 42000, students: 156 },
  ]

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-surface-900 mb-6">Analytics</Text>

        {/* Overview Stats */}
        <View className="grid grid-cols-2 gap-4 mb-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="p-4">
              <View className="flex-row items-center justify-between mb-2">
                <stat.icon size={20} className={stat.color} />
                <Text className="text-green-600 text-sm font-medium">{stat.change}</Text>
              </View>
              <Text className={`text-2xl font-bold ${stat.color}`}>{stat.value}</Text>
              <Text className="text-surface-600 text-sm">{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Monthly Growth Chart */}
        <Card className="mb-6 p-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-surface-900">Monthly Growth</Text>
            <BarChart3 size={20} color="#6b7280" />
          </View>
          <View className="space-y-3">
            {monthlyData.slice(-3).map((data, index) => (
              <View key={index} className="flex-row items-center justify-between">
                <Text className="text-surface-900 font-medium">{data.month}</Text>
                <View className="flex-1 mx-4">
                  <View className="bg-surface-200 rounded-full h-2">
                    <View
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 50000) * 100}%` }}
                    />
                  </View>
                </View>
                <Text className="text-green-600 font-semibold">₹{data.revenue.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Course Performance */}
        <Card className="mb-6 p-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-semibold text-surface-900">Course Performance</Text>
            <PieChart size={20} color="#6b7280" />
          </View>
          <View className="space-y-4">
            {coursePerformance.map((course, index) => (
              <View key={index} className="border-b border-surface-100 pb-4 last:border-b-0">
                <Text className="font-semibold text-surface-900 mb-2">{course.course}</Text>
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text className="text-surface-600 text-sm">{course.students} students</Text>
                    <Text className="text-green-600 font-medium">₹{course.revenue.toLocaleString()}</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-surface-600 text-sm">Rating</Text>
                    <Text className="text-yellow-600 font-medium">★ {course.rating}</Text>
                  </View>
                  <View className="flex-1 items-end">
                    <Text className="text-surface-600 text-sm">Completion</Text>
                    <Text className="text-blue-600 font-medium">{course.completion}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card>

        {/* Student Engagement */}
        <Card className="p-6">
          <Text className="text-lg font-semibold text-surface-900 mb-4">Student Engagement</Text>
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-surface-600">Average Watch Time</Text>
              <Text className="text-surface-900 font-medium">45 min/session</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-surface-600">Assignment Submission Rate</Text>
              <Text className="text-surface-900 font-medium">89%</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-surface-600">Live Class Attendance</Text>
              <Text className="text-surface-900 font-medium">76%</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-surface-600">Student Satisfaction</Text>
              <Text className="text-surface-900 font-medium">4.7/5.0</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}
