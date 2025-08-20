"use client"

import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { router } from "expo-router"
import { Card } from "../../../components/ui/Card"
import { Calendar as CalendarIcon, Clock, Video } from "lucide-react-native"
import dayjs from "dayjs"

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"))

  const upcomingEvents = [
    {
      id: "1",
      title: "Mathematics Live Session",
      type: "live_class",
      date: dayjs().format("YYYY-MM-DD"),
      time: "14:00",
      duration: 60,
      instructor: "Dr. Rajesh Kumar",
      course: "Advanced Mathematics",
    },
    {
      id: "2",
      title: "Physics Assignment Due",
      type: "assignment",
      date: dayjs().add(1, "day").format("YYYY-MM-DD"),
      time: "23:59",
      course: "Physics Fundamentals",
    },
    {
      id: "3",
      title: "Chemistry Mock Test",
      type: "mock_test",
      date: dayjs().add(2, "days").format("YYYY-MM-DD"),
      time: "10:00",
      duration: 120,
      course: "Organic Chemistry",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "live_class":
        return <Video size={20} color="#2563eb" />
      case "assignment":
        return <Clock size={20} color="#f59e0b" />
      case "mock_test":
        return <CalendarIcon size={20} color="#10b981" />
      default:
        return <CalendarIcon size={20} color="#6b7280" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "live_class":
        return "border-l-blue-500"
      case "assignment":
        return "border-l-yellow-500"
      case "mock_test":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const todayEvents = upcomingEvents.filter((event) => event.date === selectedDate)
  const upcomingEventsFiltered = upcomingEvents.filter((event) => dayjs(event.date).isAfter(dayjs(), "day"))

  return (
    <ScrollView className="flex-1 bg-surface-50">
      <View className="px-6 pt-12 pb-6">
        <Text className="text-2xl font-bold text-surface-900 mb-6">Calendar</Text>

        {/* Today's Events */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-surface-900 mb-4">Today's Schedule</Text>
          {todayEvents.length > 0 ? (
            todayEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                onPress={() => {
                  if (event.type === "live_class") {
                    router.push(`/(student)/class-room/${event.id}`)
                  } else if (event.type === "assignment") {
                    router.push("/(student)/assignments/index")
                  } else if (event.type === "mock_test") {
                    router.push("/(student)/mock/index")
                  }
                }}
                className={`border-l-4 ${getEventColor(event.type)} pl-4 py-3 mb-3 last:mb-0`}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      {getEventIcon(event.type)}
                      <Text className="font-semibold text-surface-900 ml-2">{event.title}</Text>
                    </View>
                    <Text className="text-surface-600 text-sm mb-1">{event.course}</Text>
                    <View className="flex-row items-center">
                      <Clock size={14} color="#6b7280" />
                      <Text className="text-surface-600 text-sm ml-1">
                        {dayjs(`${event.date} ${event.time}`).format("h:mm A")}
                        {event.duration && ` (${event.duration} min)`}
                      </Text>
                    </View>
                    {event.instructor && <Text className="text-surface-600 text-sm">with {event.instructor}</Text>}
                  </View>
                  <View className="bg-primary-100 px-3 py-1 rounded-full">
                    <Text className="text-primary-600 text-sm font-medium">
                      {event.type === "live_class" ? "Join" : "View"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="items-center py-8">
              <CalendarIcon size={48} color="#d1d5db" />
              <Text className="text-surface-600 mt-4">No events scheduled for today</Text>
            </View>
          )}
        </Card>

        {/* Upcoming Events */}
        <Card className="mb-6">
          <Text className="text-lg font-semibold text-surface-900 mb-4">Upcoming Events</Text>
          {upcomingEventsFiltered.map((event) => (
            <TouchableOpacity
              key={event.id}
              onPress={() => {
                if (event.type === "live_class") {
                  router.push(`/(student)/class-room/${event.id}`)
                } else if (event.type === "assignment") {
                  router.push("/(student)/assignments/index")
                } else if (event.type === "mock_test") {
                  router.push("/(student)/mock/index")
                }
              }}
              className="py-3 border-b border-surface-100 last:border-b-0"
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    {getEventIcon(event.type)}
                    <Text className="font-semibold text-surface-900 ml-2">{event.title}</Text>
                  </View>
                  <Text className="text-surface-600 text-sm mb-1">{event.course}</Text>
                  <Text className="text-surface-600 text-sm">
                    {dayjs(event.date).format("MMM D, YYYY")} at {dayjs(`${event.date} ${event.time}`).format("h:mm A")}
                  </Text>
                </View>
                <Text className="text-surface-400 text-sm">{dayjs(event.date).fromNow()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Quick Actions */}
        <View className="flex-row justify-between">
          <TouchableOpacity onPress={() => router.push("/(student)/mock/index")} className="flex-1 mr-2">
            <Card className="items-center py-6">
              <CalendarIcon size={32} color="#10b981" />
              <Text className="text-surface-900 font-medium mt-2">Schedule Mock</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(student)/assignments/index")} className="flex-1 ml-2">
            <Card className="items-center py-6">
              <Clock size={32} color="#f59e0b" />
              <Text className="text-surface-900 font-medium mt-2">View Deadlines</Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
