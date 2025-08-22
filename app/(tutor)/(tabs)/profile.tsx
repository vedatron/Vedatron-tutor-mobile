"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, TextInput } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Profile() {
  const [refreshing, setRefreshing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const tutorProfile = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    subjects: ["Mathematics", "Physics", "Chemistry"],
    experience: "8 years",
    qualification: "PhD in Mathematics",
    rating: 4.8,
    totalStudents: 125,
    bio: "Passionate educator with 8+ years of experience in teaching advanced mathematics and physics. Specialized in helping students excel in competitive exams.",
  }

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Profile & Settings</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Profile Card */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <View className="items-center mb-4">
              <View className="w-20 h-20 bg-[--primary-color] rounded-full items-center justify-center mb-3">
                <Typography className="text-white text-2xl font-poppins-bold">SJ</Typography>
              </View>
              <Typography className="text-[--text-color] text-xl font-poppins-semibold">{tutorProfile.name}</Typography>
              <Typography className="text-[--nav-text-color] text-base">{tutorProfile.qualification}</Typography>

              <View className="flex-row items-center gap-4 mt-3">
                <View className="items-center">
                  <Typography className="text-[--text-color] text-lg font-poppins-bold">
                    {tutorProfile.rating}
                  </Typography>
                  <Typography className="text-[--nav-text-color] text-sm">Rating</Typography>
                </View>
                <View className="items-center">
                  <Typography className="text-[--text-color] text-lg font-poppins-bold">
                    {tutorProfile.totalStudents}
                  </Typography>
                  <Typography className="text-[--nav-text-color] text-sm">Students</Typography>
                </View>
                <View className="items-center">
                  <Typography className="text-[--text-color] text-lg font-poppins-bold">
                    {tutorProfile.experience}
                  </Typography>
                  <Typography className="text-[--nav-text-color] text-sm">Experience</Typography>
                </View>
              </View>
            </View>

            <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl" onPress={() => setIsEditing(!isEditing)}>
              <Typography className="text-white text-center font-poppins-semibold">
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Typography>
            </TouchableOpacity>
          </View>

          {/* Personal Information */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">
              Personal Information
            </Typography>

            <View className="gap-4">
              <View>
                <Typography className="text-[--nav-text-color] text-sm mb-1">Full Name</Typography>
                {isEditing ? (
                  <TextInput
                    className="bg-[--field-background-color] p-3 rounded-xl text-[--text-color]"
                    value={tutorProfile.name}
                  />
                ) : (
                  <Typography className="text-[--text-color] text-base">{tutorProfile.name}</Typography>
                )}
              </View>

              <View>
                <Typography className="text-[--nav-text-color] text-sm mb-1">Email</Typography>
                {isEditing ? (
                  <TextInput
                    className="bg-[--field-background-color] p-3 rounded-xl text-[--text-color]"
                    value={tutorProfile.email}
                  />
                ) : (
                  <Typography className="text-[--text-color] text-base">{tutorProfile.email}</Typography>
                )}
              </View>

              <View>
                <Typography className="text-[--nav-text-color] text-sm mb-1">Phone</Typography>
                {isEditing ? (
                  <TextInput
                    className="bg-[--field-background-color] p-3 rounded-xl text-[--text-color]"
                    value={tutorProfile.phone}
                  />
                ) : (
                  <Typography className="text-[--text-color] text-base">{tutorProfile.phone}</Typography>
                )}
              </View>

              <View>
                <Typography className="text-[--nav-text-color] text-sm mb-1">Bio</Typography>
                {isEditing ? (
                  <TextInput
                    className="bg-[--field-background-color] p-3 rounded-xl text-[--text-color]"
                    value={tutorProfile.bio}
                    multiline
                    numberOfLines={3}
                  />
                ) : (
                  <Typography className="text-[--text-color] text-base">{tutorProfile.bio}</Typography>
                )}
              </View>
            </View>
          </View>

          {/* Subjects */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">
              Teaching Subjects
            </Typography>
            <View className="flex-row flex-wrap gap-2">
              {tutorProfile.subjects.map((subject, index) => (
                <View key={index} className="bg-[--primary-color] px-3 py-1 rounded-xl">
                  <Typography className="text-white text-sm">{subject}</Typography>
                </View>
              ))}
            </View>
          </View>

          {/* Settings */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">Settings</Typography>

            <View className="gap-4">
              <TouchableOpacity className="flex-row items-center justify-between">
                <Typography className="text-[--text-color] text-base">Notifications</Typography>
                <Typography className="text-[--primary-color] text-base">Configure</Typography>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between">
                <Typography className="text-[--text-color] text-base">Privacy Settings</Typography>
                <Typography className="text-[--primary-color] text-base">Manage</Typography>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between">
                <Typography className="text-[--text-color] text-base">Payment Methods</Typography>
                <Typography className="text-[--primary-color] text-base">Update</Typography>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between">
                <Typography className="text-[--text-color] text-base">Change Password</Typography>
                <Typography className="text-[--primary-color] text-base">Update</Typography>
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout */}
          <TouchableOpacity className="bg-red-500 py-3 rounded-xl">
            <Typography className="text-white text-center font-poppins-semibold">Logout</Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
