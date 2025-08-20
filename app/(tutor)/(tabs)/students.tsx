import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { Card } from "../../../components/ui/Card"
import { Search, Filter, Users, TrendingUp, MessageCircle } from "lucide-react-native"

export default function TeacherStudentsScreen() {
  const students = [
    {
      id: "1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      courses: ["Advanced Mathematics", "Physics"],
      progress: 85,
      lastActive: "2 hours ago",
      avatar: "https://via.placeholder.com/40x40",
    },
    {
      id: "2",
      name: "Priya Patel",
      email: "priya@example.com",
      courses: ["Chemistry", "Biology"],
      progress: 92,
      lastActive: "1 day ago",
      avatar: "https://via.placeholder.com/40x40",
    },
    {
      id: "3",
      name: "Amit Kumar",
      email: "amit@example.com",
      courses: ["Mathematics"],
      progress: 67,
      lastActive: "3 days ago",
      avatar: "https://via.placeholder.com/40x40",
    },
  ]

  const stats = [
    { label: "Total Students", value: "156", icon: Users, color: "text-blue-600" },
    { label: "Active This Week", value: "89", icon: TrendingUp, color: "text-green-600" },
    { label: "Avg Progress", value: "78%", icon: TrendingUp, color: "text-yellow-600" },
  ]

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-surface-900 mb-6">Students</Text>

        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="flex-1 mx-1 items-center py-4">
              <stat.icon size={24} className={stat.color} />
              <Text className={`text-xl font-bold ${stat.color} mt-2`}>{stat.value}</Text>
              <Text className="text-surface-600 text-sm text-center">{stat.label}</Text>
            </Card>
          ))}
        </View>

        {/* Search and Filter */}
        <View className="flex-row mb-6">
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 mr-3 border border-surface-200">
            <Search size={20} color="#6b7280" />
            <TextInput
              placeholder="Search students..."
              className="flex-1 ml-3 text-surface-900"
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity className="bg-green-600 rounded-xl px-4 py-3">
            <Filter size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Students List */}
        <View>
          {students.map((student) => (
            <Card key={student.id} className="mb-4">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-surface-200 rounded-full mr-4" />
                <View className="flex-1">
                  <Text className="font-semibold text-surface-900">{student.name}</Text>
                  <Text className="text-surface-600 text-sm mb-1">{student.email}</Text>
                  <Text className="text-surface-600 text-sm">{student.courses.join(", ")}</Text>

                  {/* Progress Bar */}
                  <View className="flex-row items-center mt-2">
                    <View className="flex-1 bg-surface-200 rounded-full h-2 mr-3">
                      <View className="bg-green-600 h-2 rounded-full" style={{ width: `${student.progress}%` }} />
                    </View>
                    <Text className="text-surface-600 text-sm">{student.progress}%</Text>
                  </View>
                </View>
                <TouchableOpacity className="bg-green-100 p-2 rounded-full">
                  <MessageCircle size={16} color="#10b981" />
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
