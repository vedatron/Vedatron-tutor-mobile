"use client"

import React, { useState } from "react"
import { View, ScrollView, SafeAreaView, RefreshControl, TouchableOpacity, TextInput, Image, Alert } from "react-native"
import { Typography } from "@/components/Typography"

export default function Profile() {
  const [refreshing, setRefreshing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordSection, setShowPasswordSection] = useState(false)

  // User data state
  const [userInfo, setUserInfo] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    section: "Grade 12 - Science",
    studentId: "VT2024001",
    joinDate: "September 2023",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  const achievements = [
    { id: 1, title: "Top Performer", description: "Scored 95%+ in 5 subjects", icon: "🏆", color: "bg-yellow-500" },
    { id: 2, title: "Perfect Attendance", description: "30 days streak", icon: "📅", color: "bg-green-500" },
    { id: 3, title: "Quick Learner", description: "Completed 10 courses", icon: "⚡", color: "bg-blue-500" },
    { id: 4, title: "Team Player", description: "Helped 20+ classmates", icon: "🤝", color: "bg-purple-500" },
  ]

  const stats = [
    { label: "Current Rank", value: "#3", subtext: "in your section" },
    { label: "Total Points", value: "2,450", subtext: "this semester" },
    { label: "Courses Completed", value: "12", subtext: "out of 15" },
    { label: "Average Score", value: "92%", subtext: "last 30 days" },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    Alert.alert("Success", "Profile updated successfully!")
  }

  const handlePasswordUpdate = () => {
    if (passwords.new !== passwords.confirm) {
      Alert.alert("Error", "New passwords do not match!")
      return
    }
    if (passwords.new.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long!")
      return
    }
    setPasswords({ current: "", new: "", confirm: "" })
    setShowPasswordSection(false)
    Alert.alert("Success", "Password updated successfully!")
  }

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Header */}
        <View className="bg-[--card-background-color] border-b border-[--card-border-color] px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Typography className="text-[--text-color] mt-8 text-2xl font-bold mb-1">My Profile</Typography>
              <Typography className="text-[--text-color] opacity-70">Manage your account and preferences</Typography>
            </View>
            <TouchableOpacity
              onPress={() => setIsEditing(!isEditing)}
              className="bg-[--primary-color] px-4 py-2 rounded-xl"
            >
              <Typography className="text-white">{isEditing ? "Cancel" : "Edit"}</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Picture & Basic Info */}
        <View className="px-6 py-6">
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-6">
            <View className="flex-row items-center mb-4">
              <View className="relative">
                <Image source={{ uri: "/student-profile-avatar.png" }} className="w-20 h-20 rounded-full" />
                <View className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white" />
              </View>
              <View className="ml-4 flex-1">
                {isEditing ? (
                  <TextInput
                    value={userInfo.name}
                    onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
                    className="text-[--text-color] text-xl mb-1 border-b border-[--card-border-color] pb-1"
                  />
                ) : (
                  <Typography className="text-[--text-color] text-xl font-semibold mb-1">{userInfo.name}</Typography>
                )}
                <Typography className="text-[--text-color] opacity-70 mb-1">{userInfo.section}</Typography>
                <Typography className="text-[--primary-color] text-sm">Student ID: {userInfo.studentId}</Typography>
              </View>
            </View>

            {/* Contact Information */}
            <View className="border-t border-[--card-border-color] pt-4">
              <Typography className="text-[--text-color] text-lg font-semibold mb-3">Contact Information</Typography>

              <View className="mb-3">
                <Typography className="text-[--text-color] opacity-70 mb-1 text-sm">Email Address</Typography>
                {isEditing ? (
                  <TextInput
                    value={userInfo.email}
                    onChangeText={(text) => setUserInfo({ ...userInfo, email: text })}
                    className="text-[--text-color] border-b border-[--card-border-color] pb-1"
                  />
                ) : (
                  <Typography className="text-[--text-color]">{userInfo.email}</Typography>
                )}
              </View>

              <View className="mb-3">
                <Typography className="text-[--text-color] opacity-70 mb-1 text-sm">Phone Number</Typography>
                {isEditing ? (
                  <TextInput
                    value={userInfo.phone}
                    onChangeText={(text) => setUserInfo({ ...userInfo, phone: text })}
                    className="text-[--text-color] border-b border-[--card-border-color] pb-1"
                  />
                ) : (
                  <Typography className="text-[--text-color]">{userInfo.phone}</Typography>
                )}
              </View>

              <View>
                <Typography className="text-[--text-color] opacity-70 mb-1 text-sm">Member Since</Typography>
                <Typography className="text-[--text-color]">{userInfo.joinDate}</Typography>
              </View>
            </View>

            {isEditing && (
              <TouchableOpacity onPress={handleSaveProfile} className="bg-[--primary-color] py-3 rounded-xl mt-4">
                <Typography className="text-white text-center">Save Changes</Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats & Rank */}
        <View className="px-6 mb-6">
          <Typography className="text-[--text-color] text-lg font-semibold mb-3">Performance Overview</Typography>
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-4 w-[48%] mb-3"
              >
                <Typography className="text-[--primary-color] text-xl font-semibold mb-1">{stat.value}</Typography>
                <Typography className="text-[--text-color] mb-1">{stat.label}</Typography>
                <Typography className="text-[--text-color] opacity-70 text-sm">{stat.subtext}</Typography>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements & Rewards */}
        <View className="px-6 mb-6">
          <Typography className="text-[--text-color] text-lg font-semibold mb-3">Achievements & Rewards</Typography>
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-4">
            {achievements.map((achievement) => (
              <View key={achievement.id} className="flex-row items-center mb-4 last:mb-0">
                <View className={`w-12 h-12 ${achievement.color} rounded-full items-center justify-center mr-4`}>
                  <Typography className="text-white">{achievement.icon}</Typography>
                </View>
                <View className="flex-1">
                  <Typography className="text-[--text-color] mb-1">{achievement.title}</Typography>
                  <Typography className="text-[--text-color] opacity-70 text-sm">{achievement.description}</Typography>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Password Update Section */}
        <View className="px-6 mb-6">
          <TouchableOpacity
            onPress={() => setShowPasswordSection(!showPasswordSection)}
            className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-4 flex-row items-center justify-between"
          >
            <View>
              <Typography className="text-[--text-color] text-lg font-semibold mb-1">Password & Security</Typography>
              <Typography className="text-[--text-color] opacity-70 text-sm">
                Update your password and security settings
              </Typography>
            </View>
            <Typography className="text-[--primary-color]">{showPasswordSection ? "▼" : "▶"}</Typography>
          </TouchableOpacity>

          {showPasswordSection && (
            <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-4 mt-3">
              <Typography className="text-[--text-color] text-lg font-semibold mb-4">Change Password</Typography>

              <View className="mb-4">
                <Typography className="text-[--text-color] opacity-70 mb-2 text-sm">Current Password</Typography>
                <TextInput
                  secureTextEntry
                  value={passwords.current}
                  onChangeText={(text) => setPasswords({ ...passwords, current: text })}
                  className="bg-[--background-color] border border-[--card-border-color] rounded-xl px-4 py-3 text-[--text-color]"
                  placeholder="Enter current password"
                  placeholderTextColor="rgba(var(--text-color), 0.5)"
                />
              </View>

              <View className="mb-4">
                <Typography className="text-[--text-color] opacity-70 mb-2 text-sm">New Password</Typography>
                <TextInput
                  secureTextEntry
                  value={passwords.new}
                  onChangeText={(text) => setPasswords({ ...passwords, new: text })}
                  className="bg-[--background-color] border border-[--card-border-color] rounded-xl px-4 py-3 text-[--text-color]"
                  placeholder="Enter new password"
                  placeholderTextColor="rgba(var(--text-color), 0.5)"
                />
              </View>

              <View className="mb-4">
                <Typography className="text-[--text-color] opacity-70 mb-2 text-sm">Confirm New Password</Typography>
                <TextInput
                  secureTextEntry
                  value={passwords.confirm}
                  onChangeText={(text) => setPasswords({ ...passwords, confirm: text })}
                  className="bg-[--background-color] border border-[--card-border-color] rounded-xl px-4 py-3 text-[--text-color]"
                  placeholder="Confirm new password"
                  placeholderTextColor="rgba(var(--text-color), 0.5)"
                />
              </View>

              <TouchableOpacity onPress={handlePasswordUpdate} className="bg-[--primary-color] py-3 rounded-xl">
                <Typography className="text-white text-center">Update Password</Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
