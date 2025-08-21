"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "@/components/ui/Card"

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Mathematics", "Physics", "Chemistry", "Biology", "English"]

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 1234,
      price: "₹2,999",
      thumbnail: "📐",
      category: "Mathematics",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Michael Chen",
      rating: 4.9,
      students: 856,
      price: "₹3,499",
      thumbnail: "⚛️",
      category: "Physics",
    },
    {
      id: 3,
      title: "Organic Chemistry",
      instructor: "Dr. Emily Davis",
      rating: 4.7,
      students: 642,
      price: "₹2,799",
      thumbnail: "🧪",
      category: "Chemistry",
    },
    {
      id: 4,
      title: "Cell Biology",
      instructor: "Dr. Robert Wilson",
      rating: 4.6,
      students: 789,
      price: "₹2,599",
      thumbnail: "🔬",
      category: "Biology",
    },
  ]

  const nearbyTutors = [
    {
      id: 1,
      name: "Rajesh Kumar",
      subject: "Mathematics",
      rating: 4.9,
      distance: "0.5 km",
      price: "₹500/hr",
      avatar: "👨‍🏫",
    },
    {
      id: 2,
      name: "Priya Sharma",
      subject: "Physics",
      rating: 4.8,
      distance: "1.2 km",
      price: "₹600/hr",
      avatar: "👩‍🏫",
    },
  ]

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-6 border-b border-gray-100">
          <Text className="text-2xl font-bold text-gray-900 mb-4">Explore Courses</Text>

          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search courses, tutors..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-gray-900"
            />
          </View>
        </View>

        <View className="p-6">
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-3">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category ? "bg-blue-600" : "bg-white border border-gray-200"
                  }`}
                >
                  <Text className={`font-medium ${selectedCategory === category ? "text-white" : "text-gray-700"}`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Featured Courses */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Featured Courses</Text>
            <View className="space-y-4">
              {filteredCourses.map((course) => (
                <TouchableOpacity key={course.id}>
                  <Card className="p-4">
                    <View className="flex-row">
                      <View className="w-16 h-16 bg-gray-100 rounded-lg items-center justify-center mr-4">
                        <Text className="text-2xl">{course.thumbnail}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold text-gray-900 mb-1">{course.title}</Text>
                        <Text className="text-gray-600 text-sm mb-2">{course.instructor}</Text>
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons name="star" size={16} color="#F59E0B" />
                            <Text className="text-sm text-gray-600 ml-1">{course.rating}</Text>
                            <Text className="text-sm text-gray-500 ml-2">({course.students} students)</Text>
                          </View>
                          <Text className="font-bold text-blue-600">{course.price}</Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Nearby Tutors */}
          <View>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-semibold text-gray-900">Nearby Tutors</Text>
              <TouchableOpacity>
                <Text className="text-blue-600 font-medium">View All</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-3">
              {nearbyTutors.map((tutor) => (
                <TouchableOpacity key={tutor.id}>
                  <Card className="p-4">
                    <View className="flex-row items-center">
                      <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-3">
                        <Text className="text-xl">{tutor.avatar}</Text>
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold text-gray-900">{tutor.name}</Text>
                        <Text className="text-gray-600 text-sm">{tutor.subject}</Text>
                        <View className="flex-row items-center mt-1">
                          <Ionicons name="star" size={14} color="#F59E0B" />
                          <Text className="text-sm text-gray-600 ml-1">{tutor.rating}</Text>
                          <Text className="text-sm text-gray-500 ml-2">• {tutor.distance}</Text>
                        </View>
                      </View>
                      <Text className="font-bold text-blue-600">{tutor.price}</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
