"use client"

import React, { useState } from "react"
import { View, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity, TextInput, Image } from "react-native"
import { Typography } from "@/components/Typography"

export default function CourseExplore() {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFilter, setSelectedFilter] = useState("Popular")

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  const categories = ["All", "Mathematics", "Science", "English", "History", "Programming"]
  const filters = ["Popular", "Latest", "Rating", "Price"]

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      rating: 4.8,
      students: 1250,
      price: 299,
      duration: "12 weeks",
      level: "Advanced",
      image: "/mathematics-course.png",
      category: "Mathematics",
      progress: 0,
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Michael Chen",
      rating: 4.9,
      students: 980,
      price: 249,
      duration: "10 weeks",
      level: "Intermediate",
      image: "/physics-course.png",
      category: "Science",
      progress: 35,
    },
    {
      id: 3,
      title: "Creative Writing",
      instructor: "Emma Thompson",
      rating: 4.7,
      students: 750,
      price: 199,
      duration: "8 weeks",
      level: "Beginner",
      image: "/writing-course.png",
      category: "English",
      progress: 0,
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      instructor: "Alex Rodriguez",
      rating: 4.9,
      students: 2100,
      price: 399,
      duration: "16 weeks",
      level: "Intermediate",
      image: "/programming-course.png",
      category: "Programming",
      progress: 0,
    },
  ]

  const featuredCourses = courses.slice(0, 2)
  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Header */}
        <View className="bg-[--card-background-color]  border-b border-[--card-border-color] px-6 py-4">
          <Typography className="mt-8 text-[--text-color] text-2xl font-bold mb-2">
            Explore Courses
          </Typography>
          <Typography className="text-[--text-color] opacity-70">
            Discover new skills and advance your learning
          </Typography>
        </View>

        {/* Search Bar */}
        <View className="px-6 py-4">
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-xl px-4 py-3 flex-row items-center">
            <Typography className="text-[--text-color] opacity-50 mr-3">
              🔍
            </Typography>
            <TextInput
              placeholder="Search courses..."
              placeholderTextColor="rgba(var(--text-color), 0.5)"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-[--text-color]"
            />
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 mb-4">
          <Typography className="text-[--text-color] text-lg font-semibold mb-3">
            Categories
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "bg-[--primary-color] border-[--primary-color]"
                      : "bg-[--card-background-color] border-[--card-border-color]"
                  }`}
                >
                  <Typography
                    className={selectedCategory === category ? "text-white" : "text-[--text-color]"}
                  >
                    {category}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Courses */}
        <View className="px-6 mb-6">
          <Typography className="text-[--text-color] text-lg font-semibold mb-3">
            Featured Courses
          </Typography>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-4">
              {featuredCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md w-80"
                >
                  <Image source={{ uri: course.image }} className="w-full h-32 rounded-t-2xl" resizeMode="cover" />
                  <View className="p-4">
                    <Typography className="text-[--text-color] text-lg font-semibold mb-2">
                      {course.title}
                    </Typography>
                    <Typography className="text-[--text-color] opacity-70 mb-2">
                      by {course.instructor}
                    </Typography>
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center">
                        <Typography className="text-yellow-500 mr-1 text-sm">
                          ⭐ {course.rating}
                        </Typography>
                        <Typography className="text-[--text-color] opacity-50 text-sm">
                          ({course.students} students)
                        </Typography>
                      </View>
                      <Typography className="text-[--primary-color] text-lg font-semibold">
                        ${course.price}
                      </Typography>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Typography className="text-[--text-color] opacity-70 text-sm">
                        {course.duration} • {course.level}
                      </Typography>
                      {course.progress > 0 && (
                        <Typography className="text-green-500 text-sm">
                          {course.progress}% Complete
                        </Typography>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Filters */}
        <View className="px-6 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Typography className="text-[--text-color] text-lg font-semibold">
              All Courses
            </Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-full ${
                      selectedFilter === filter
                        ? "bg-[--primary-color]"
                        : "bg-[--card-background-color] border border-[--card-border-color]"
                    }`}
                  >
                    <Typography
                      className={`text-sm ${selectedFilter === filter ? "text-white" : "text-[--text-color]"}`}
                    >
                      {filter}
                    </Typography>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Course Grid */}
        <View className="px-6 pb-6">
          <View className="flex-row flex-wrap justify-between">
            {filteredCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md w-[48%] mb-4"
              >
                <Image source={{ uri: course.image }} className="w-full h-24 rounded-t-2xl" resizeMode="cover" />
                <View className="p-3">
                  <Typography className="text-[--text-color] mb-1">
                    {course.title}
                  </Typography>
                  <Typography className="text-[--text-color] opacity-70 mb-2 text-sm">
                    {course.instructor}
                  </Typography>
                  <View className="flex-row items-center justify-between mb-2">
                    <Typography className="text-yellow-500 text-sm">
                      ⭐ {course.rating}
                    </Typography>
                    <Typography className="text-[--primary-color] text-sm">
                      ${course.price}
                    </Typography>
                  </View>
                  {course.progress > 0 && (
                    <View className="bg-gray-200 rounded-full h-1 mb-2">
                      <View
                        className="bg-[--primary-color] h-1 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </View>
                  )}
                  <Typography className="text-[--text-color] opacity-50 text-sm">
                    {course.duration} • {course.level}
                  </Typography>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
