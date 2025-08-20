import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Card } from "../../../components/ui/Card"
import { Plus, Users, Play, BarChart3, Edit } from "lucide-react-native"

export default function TeacherCoursesScreen() {
  const courses = [
    {
      id: "1",
      title: "Advanced Mathematics",
      students: 156,
      lessons: 24,
      revenue: 45000,
      rating: 4.8,
      status: "active",
      thumbnail: "https://via.placeholder.com/100x60",
    },
    {
      id: "2",
      title: "Physics Fundamentals",
      students: 89,
      lessons: 18,
      revenue: 28000,
      rating: 4.6,
      status: "active",
      thumbnail: "https://via.placeholder.com/100x60",
    },
    {
      id: "3",
      title: "Chemistry Basics",
      students: 67,
      lessons: 15,
      revenue: 22000,
      rating: 4.9,
      status: "draft",
      thumbnail: "https://via.placeholder.com/100x60",
    },
  ]

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="px-6 pt-12 pb-6">
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-surface-900">My Courses</Text>
          <TouchableOpacity
            onPress={() => router.push("/(teacher)/create-course/index")}
            className="bg-green-600 px-4 py-2 rounded-full flex-row items-center"
          >
            <Plus size={16} color="white" />
            <Text className="text-white font-medium ml-1">Create</Text>
          </TouchableOpacity>
        </View>

        {/* Course Stats */}
        <View className="flex-row justify-between mb-6">
          <Card className="flex-1 mr-2 items-center py-4">
            <Text className="text-2xl font-bold text-green-600">{courses.length}</Text>
            <Text className="text-surface-600 text-sm">Total Courses</Text>
          </Card>
          <Card className="flex-1 mx-1 items-center py-4">
            <Text className="text-2xl font-bold text-blue-600">
              {courses.reduce((sum, course) => sum + course.students, 0)}
            </Text>
            <Text className="text-surface-600 text-sm">Total Students</Text>
          </Card>
          <Card className="flex-1 ml-2 items-center py-4">
            <Text className="text-2xl font-bold text-yellow-600">
              ₹{courses.reduce((sum, course) => sum + course.revenue, 0).toLocaleString()}
            </Text>
            <Text className="text-surface-600 text-sm">Total Revenue</Text>
          </Card>
        </View>

        {/* Courses List */}
        <View>
          {courses.map((course) => (
            <TouchableOpacity key={course.id} onPress={() => router.push(`/(teacher)/course/${course.id}`)}>
              <Card className="mb-4">
                <View className="flex-row">
                  <View className="w-20 h-14 bg-surface-200 rounded-lg mr-4" />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="font-semibold text-surface-900 flex-1">{course.title}</Text>
                      <View
                        className={`px-2 py-1 rounded-full ${
                          course.status === "active" ? "bg-green-100" : "bg-yellow-100"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            course.status === "active" ? "text-green-600" : "text-yellow-600"
                          }`}
                        >
                          {course.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center mb-3">
                      <View className="flex-row items-center mr-4">
                        <Users size={14} color="#6b7280" />
                        <Text className="text-surface-600 text-sm ml-1">{course.students} students</Text>
                      </View>
                      <View className="flex-row items-center mr-4">
                        <Play size={14} color="#6b7280" />
                        <Text className="text-surface-600 text-sm ml-1">{course.lessons} lessons</Text>
                      </View>
                      <Text className="text-surface-600 text-sm">★ {course.rating}</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <Text className="font-bold text-green-600">₹{course.revenue.toLocaleString()}</Text>
                      <View className="flex-row">
                        <TouchableOpacity className="bg-surface-100 p-2 rounded-full mr-2">
                          <BarChart3 size={16} color="#6b7280" />
                        </TouchableOpacity>
                        <TouchableOpacity className="bg-green-100 p-2 rounded-full">
                          <Edit size={16} color="#10b981" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
