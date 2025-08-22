"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, TextInput } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Messages() {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const conversations = [
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Thank you for the assignment feedback!",
      time: "2 hours ago",
      unread: 2,
      avatar: "JD",
      type: "student",
    },
    {
      id: 2,
      name: "Mathematics Group",
      lastMessage: "Class starts in 30 minutes",
      time: "4 hours ago",
      unread: 0,
      avatar: "MG",
      type: "group",
    },
    {
      id: 3,
      name: "Sarah Wilson",
      lastMessage: "Could you explain the physics concept again?",
      time: "1 day ago",
      unread: 1,
      avatar: "SW",
      type: "student",
    },
    {
      id: 4,
      name: "Physics Lab Group",
      lastMessage: "Lab report submission deadline extended",
      time: "2 days ago",
      unread: 0,
      avatar: "PG",
      type: "group",
    },
  ]

  const tabs = [
    { id: "all", label: "All" },
    { id: "students", label: "Students" },
    { id: "groups", label: "Groups" },
  ]

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "students" && conv.type === "student") ||
      (activeTab === "groups" && conv.type === "group")
    return matchesSearch && matchesTab
  })

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Messages</Typography>
          <Typography className="text-[--nav-text-color] text-base">
            {conversations.filter((c) => c.unread > 0).length} unread conversations
          </Typography>
        </View>

        <View className="p-4 gap-4">
          {/* Search Bar */}
          <View className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md">
            <TextInput
              className="p-4 text-[--text-color] text-base"
              placeholder="Search conversations..."
              placeholderTextColor="var(--nav-text-color)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Tabs */}
          <View className="flex-row bg-[--field-background-color] rounded-xl p-1">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg ${activeTab === tab.id ? "bg-[--primary-color]" : ""}`}
              >
                <Typography
                  className={`text-center text-sm ${
                    activeTab === tab.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
                  }`}
                >
                  {tab.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
              <Typography className="text-white text-center font-poppins-semibold">+ New Message</Typography>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 border border-(--primary-color) py-3 rounded-xl">
              <Typography className="text-[--primary-color] text-center font-poppins-semibold">Create Group</Typography>
            </TouchableOpacity>
          </View>

          {/* Conversations List */}
          <View className="gap-3">
            {filteredConversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
              >
                <View className="flex-row items-center gap-4">
                  <View className="relative">
                    <View className="w-12 h-12 bg-[--primary-color] rounded-full items-center justify-center">
                      <Typography className="text-white font-poppins-semibold">{conversation.avatar}</Typography>
                    </View>
                    {conversation.unread > 0 && (
                      <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                        <Typography className="text-white text-xs">{conversation.unread}</Typography>
                      </View>
                    )}
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        {conversation.name}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-sm">{conversation.time}</Typography>
                    </View>
                    <Typography
                      className={`text-base ${
                        conversation.unread > 0 ? "text-[--text-color] font-poppins-medium" : "text-[--nav-text-color]"
                      }`}
                      numberOfLines={1}
                    >
                      {conversation.lastMessage}
                    </Typography>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Announcements */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">
              Send Announcement
            </Typography>
            <View className="gap-3">
              <TouchableOpacity className="bg-[--field-background-color] p-3 rounded-xl">
                <Typography className="text-[--text-color] font-poppins-semibold">All Students</Typography>
                <Typography className="text-[--nav-text-color] text-sm">
                  Send message to all enrolled students
                </Typography>
              </TouchableOpacity>
              <TouchableOpacity className="bg-[--field-background-color] p-3 rounded-xl">
                <Typography className="text-[--text-color] font-poppins-semibold">Subject Groups</Typography>
                <Typography className="text-[--nav-text-color] text-sm">Send to specific subject groups</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
