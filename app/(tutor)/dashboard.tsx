import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"

export default function TeacherDashboard() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-green-600 px-6 py-8">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg">Welcome Back!</Text>
              <Text className="text-white text-2xl font-bold">Teacher</Text>
            </View>
            <TouchableOpacity onPress={() => router.replace("/")} className="bg-white/20 p-3 rounded-full">
              <Text className="text-white font-semibold">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-6 py-6">
          <View className="flex-row space-x-4 mb-6">
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-600 text-sm">Students</Text>
              <Text className="text-2xl font-bold text-gray-900">156</Text>
            </View>
            <View className="flex-1 bg-white p-4 rounded-xl shadow-sm">
              <Text className="text-gray-600 text-sm">Courses</Text>
              <Text className="text-2xl font-bold text-green-600">8</Text>
            </View>
          </View>

          {/* Quick Actions */}
          <Text className="text-xl font-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="space-y-3">
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">My Classes</Text>
              <Text className="text-green-600">→</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">Create Course</Text>
              <Text className="text-green-600">→</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white p-4 rounded-xl shadow-sm flex-row justify-between items-center">
              <Text className="text-gray-900 font-semibold">Student Analytics</Text>
              <Text className="text-green-600">→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
