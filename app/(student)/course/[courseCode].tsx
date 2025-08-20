import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card } from "../../../components/ui/Card"
import { Button } from "../../../components/ui/Button"
import { ArrowLeft, Play, Download, Star, Clock, Users } from "lucide-react-native"

export default function CourseDetailScreen() {
  const { courseCode } = useLocalSearchParams()

  const courseData = {
    id: courseCode,
    title: "Advanced Mathematics",
    instructor: "Dr. Rajesh Kumar",
    rating: 4.8,
    students: 1250,
    duration: "40 hours",
    lessons: 24,
    description: "Master advanced mathematical concepts with comprehensive lessons and practical examples.",
    price: 2999,
    enrolled: true,
    progress: 75,
  }

  const lessons = [
    { id: "1", title: "Introduction to Calculus", duration: "45 min", completed: true },
    { id: "2", title: "Derivatives and Applications", duration: "60 min", completed: true },
    { id: "3", title: "Integration Techniques", duration: "55 min", completed: false },
    { id: "4", title: "Differential Equations", duration: "50 min", completed: false },
  ]

  return (
    <SafeAreaView className="flex-1 bg-surface-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-primary-600 px-6 py-6">
          <View className="flex-row items-center mb-4">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">Course Details</Text>
          </View>

          <View className="bg-white/10 rounded-2xl p-6">
            <Text className="text-white text-2xl font-bold mb-2">{courseData.title}</Text>
            <Text className="text-white/80 mb-4">by {courseData.instructor}</Text>

            <View className="flex-row items-center mb-4">
              <View className="flex-row items-center mr-6">
                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                <Text className="text-white ml-1">{courseData.rating}</Text>
              </View>
              <View className="flex-row items-center mr-6">
                <Users size={16} color="white" />
                <Text className="text-white ml-1">{courseData.students}</Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={16} color="white" />
                <Text className="text-white ml-1">{courseData.duration}</Text>
              </View>
            </View>

            {courseData.enrolled && (
              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-white">Progress</Text>
                  <Text className="text-white">{courseData.progress}%</Text>
                </View>
                <View className="bg-white/20 rounded-full h-2">
                  <View className="bg-white h-2 rounded-full" style={{ width: `${courseData.progress}%` }} />
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="px-6 py-6">
          {/* Description */}
          <Card className="mb-6 p-6">
            <Text className="text-lg font-semibold text-surface-900 mb-3">About this course</Text>
            <Text className="text-surface-600 leading-relaxed">{courseData.description}</Text>
          </Card>

          {/* Lessons */}
          <Card className="mb-6 p-6">
            <Text className="text-lg font-semibold text-surface-900 mb-4">Course Content</Text>
            <View className="space-y-3">
              {lessons.map((lesson, index) => (
                <TouchableOpacity
                  key={lesson.id}
                  onPress={() => router.push(`/(student)/play/${lesson.id}`)}
                  className="flex-row items-center justify-between py-3 border-b border-surface-100 last:border-b-0"
                >
                  <View className="flex-row items-center flex-1">
                    <View
                      className={`w-8 h-8 rounded-full items-center justify-center mr-3 ${
                        lesson.completed ? "bg-green-100" : "bg-surface-100"
                      }`}
                    >
                      {lesson.completed ? (
                        <Text className="text-green-600 text-sm">✓</Text>
                      ) : (
                        <Text className="text-surface-600 text-sm">{index + 1}</Text>
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-surface-900">{lesson.title}</Text>
                      <Text className="text-surface-600 text-sm">{lesson.duration}</Text>
                    </View>
                  </View>
                  <Play size={16} color="#6b7280" />
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Actions */}
          {courseData.enrolled ? (
            <View className="flex-row space-x-4">
              <Button
                title="Continue Learning"
                onPress={() => router.push(`/(student)/play/${lessons.find((l) => !l.completed)?.id || lessons[0].id}`)}
                className="flex-1"
              />
              <TouchableOpacity className="bg-surface-100 p-3 rounded-xl">
                <Download size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          ) : (
            <Button title={`Enroll Now - ₹${courseData.price}`} onPress={() => {}} className="w-full" />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
