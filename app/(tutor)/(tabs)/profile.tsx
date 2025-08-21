"use client"

import React, { useState } from "react"
import { View, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, Modal, TextInput } from "react-native"
import { Typography } from "@/components/Typography"

export default function TutorProfile() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [editModal, setEditModal] = useState(false)
  const [editField, setEditField] = useState("")
  const [editValue, setEditValue] = useState("")
  const [showAchievementModal, setShowAchievementModal] = useState(false)
  const [showSubjectModal, setShowSubjectModal] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  const tutorData = {
    name: "Dr. Sarah Johnson",
    title: "Mathematics & Physics Expert",
    bio: "Experienced educator with 8+ years in teaching advanced mathematics and physics. Specialized in IIT-JEE and NEET preparation with proven track record of student success.",
    email: "sarah.johnson@vedatron.com",
    phone: "+91 98765 43210",
    experience: "8 years",
    rating: 4.8,
    totalReviews: 156,
    studentsCount: 245,
    completedClasses: 1250,
    subjects: ["Mathematics", "Physics", "Chemistry"],
    qualifications: ["M.Sc Physics", "B.Ed", "PhD Mathematics"],
    achievements: [
      { title: "Top Rated Tutor 2023", description: "Maintained 4.8+ rating throughout the year", date: "2023-12-01" },
      { title: "100% Success Rate", description: "All JEE students cleared entrance exam", date: "2023-06-15" },
      { title: "Expert Educator Award", description: "Recognized for innovative teaching methods", date: "2023-03-20" },
    ],
    teachingStyle: "Interactive and Problem-Solving Focused",
    languages: ["English", "Hindi", "Gujarati"],
    availability: "Mon-Fri: 9 AM - 6 PM, Sat: 10 AM - 4 PM",
  }

  const reviews = [
    {
      id: 1,
      student: "Rahul Sharma",
      rating: 5,
      comment:
        "Excellent teaching methodology. Dr. Johnson's approach to complex physics problems is outstanding. Helped me crack JEE Advanced with AIR 156!",
      date: "2024-01-10",
      subject: "Physics",
      helpful: 12,
    },
    {
      id: 2,
      student: "Priya Patel",
      rating: 5,
      comment:
        "Very patient and explains concepts clearly. The way she breaks down calculus problems makes it so much easier to understand. Highly recommended!",
      date: "2024-01-08",
      subject: "Mathematics",
      helpful: 8,
    },
    {
      id: 3,
      student: "Amit Kumar",
      rating: 4,
      comment:
        "Good teacher, helped improve my physics understanding significantly. The practice sessions were particularly helpful for board exam preparation.",
      date: "2024-01-05",
      subject: "Physics",
      helpful: 5,
    },
  ]

  const openEditModal = (field: string, currentValue: string) => {
    setEditField(field)
    setEditValue(currentValue)
    setEditModal(true)
  }

  const renderProfile = () => (
    <View className="gap-6">
      <View className="bg-card p-6 rounded-xl border border-border">
        <View className="items-center mb-4">
          <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-3">
            <Typography className="text-2xl font-bold text-primary">SJ</Typography>
          </View>
          <Typography className="text-xl font-bold text-foreground">{tutorData.name}</Typography>
          <Typography className="text-muted-foreground">{tutorData.title}</Typography>
          <Typography className="text-sm text-muted-foreground mt-1">{tutorData.experience} experience</Typography>
        </View>

        <View className="flex-row justify-around py-4 border-t border-border">
          <View className="items-center">
            <Typography className="text-2xl font-bold text-primary">{tutorData.rating}</Typography>
            <Typography className="text-sm text-muted-foreground">Rating</Typography>
          </View>
          <View className="items-center">
            <Typography className="text-2xl font-bold text-primary">{tutorData.studentsCount}</Typography>
            <Typography className="text-sm text-muted-foreground">Students</Typography>
          </View>
          <View className="items-center">
            <Typography className="text-2xl font-bold text-primary">{tutorData.completedClasses}</Typography>
            <Typography className="text-sm text-muted-foreground">Classes</Typography>
          </View>
          <View className="items-center">
            <Typography className="text-2xl font-bold text-primary">{tutorData.totalReviews}</Typography>
            <Typography className="text-sm text-muted-foreground">Reviews</Typography>
          </View>
        </View>
      </View>

      <View className="bg-card p-6 rounded-xl border border-border">
        <View className="flex-row justify-between items-center mb-4">
          <Typography className="text-lg font-semibold text-foreground">Personal Information</Typography>
          <TouchableOpacity onPress={() => openEditModal("bio", tutorData.bio)}>
            <Typography className="text-primary font-medium">Edit</Typography>
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          <View>
            <Typography className="text-sm text-muted-foreground mb-1">Bio</Typography>
            <Typography className="text-foreground">{tutorData.bio}</Typography>
          </View>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Typography className="text-sm text-muted-foreground mb-1">Email</Typography>
              <Typography className="text-foreground">{tutorData.email}</Typography>
            </View>
            <View className="flex-1">
              <Typography className="text-sm text-muted-foreground mb-1">Phone</Typography>
              <Typography className="text-foreground">{tutorData.phone}</Typography>
            </View>
          </View>
          <View>
            <Typography className="text-sm text-muted-foreground mb-1">Teaching Style</Typography>
            <Typography className="text-foreground">{tutorData.teachingStyle}</Typography>
          </View>
          <View>
            <Typography className="text-sm text-muted-foreground mb-1">Languages</Typography>
            <Typography className="text-foreground">{tutorData.languages.join(", ")}</Typography>
          </View>
          <View>
            <Typography className="text-sm text-muted-foreground mb-1">Availability</Typography>
            <Typography className="text-foreground">{tutorData.availability}</Typography>
          </View>
        </View>
      </View>

      <View className="bg-card p-6 rounded-xl border border-border">
        <View className="flex-row justify-between items-center mb-4">
          <Typography className="text-lg font-semibold text-foreground">Subjects & Expertise</Typography>
          <TouchableOpacity onPress={() => setShowSubjectModal(true)}>
            <Typography className="text-primary font-medium">Manage</Typography>
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          <View>
            <Typography className="text-sm text-muted-foreground mb-2">Teaching Subjects</Typography>
            <View className="flex-row flex-wrap gap-2">
              {tutorData.subjects.map((subject, index) => (
                <View key={index} className="bg-primary/10 px-3 py-2 rounded-full">
                  <Typography className="text-primary text-sm font-medium">{subject}</Typography>
                </View>
              ))}
            </View>
          </View>

          <View>
            <Typography className="text-sm text-muted-foreground mb-2">Qualifications</Typography>
            <View className="flex-row flex-wrap gap-2">
              {tutorData.qualifications.map((qual, index) => (
                <View key={index} className="bg-muted px-3 py-2 rounded-full">
                  <Typography className="text-foreground text-sm">{qual}</Typography>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="bg-card p-6 rounded-xl border border-border">
        <View className="flex-row justify-between items-center mb-4">
          <Typography className="text-lg font-semibold text-foreground">Achievements</Typography>
          <TouchableOpacity onPress={() => setShowAchievementModal(true)}>
            <Typography className="text-primary font-medium">View All</Typography>
          </TouchableOpacity>
        </View>
        <View className="gap-3">
          {tutorData.achievements.slice(0, 3).map((achievement, index) => (
            <View key={index} className="flex-row items-start gap-3">
              <View className="w-10 h-10 bg-yellow-100 rounded-full items-center justify-center">
                <Typography className="text-yellow-600 text-lg">🏆</Typography>
              </View>
              <View className="flex-1">
                <Typography className="text-foreground font-medium">{achievement.title}</Typography>
                <Typography className="text-sm text-muted-foreground mt-1">{achievement.description}</Typography>
                <Typography className="text-xs text-muted-foreground mt-1">{achievement.date}</Typography>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )

  const renderReviews = () => (
    <View className="gap-4">
      <View className="bg-card p-6 rounded-xl border border-border">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Typography className="text-3xl font-bold text-primary">{tutorData.rating}</Typography>
            <Typography className="text-muted-foreground">out of 5</Typography>
          </View>
          <View className="items-end">
            <Typography className="text-lg font-semibold text-foreground">{tutorData.totalReviews} Reviews</Typography>
            <Typography className="text-muted-foreground">from students</Typography>
          </View>
        </View>

        {/* Rating Breakdown */}
        <View className="gap-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = star === 5 ? 80 : star === 4 ? 15 : 5
            return (
              <View key={star} className="flex-row items-center gap-3">
                <Typography className="text-sm text-muted-foreground w-4">{star}</Typography>
                <View className="flex-1 h-2 bg-muted rounded-full">
                  <View className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                </View>
                <Typography className="text-sm text-muted-foreground w-12">{percentage}%</Typography>
              </View>
            )
          })}
        </View>
      </View>

      {reviews.map((review) => (
        <View key={review.id} className="bg-card p-4 rounded-xl border border-border">
          <View className="flex-row justify-between items-start mb-3">
            <View className="flex-1">
              <Typography className="font-semibold text-foreground">{review.student}</Typography>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="flex-row items-center">
                  {[...Array(5)].map((_, i) => (
                    <Typography
                      key={i}
                      className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-muted-foreground"}`}
                    >
                      ★
                    </Typography>
                  ))}
                </View>
                <Typography className="text-xs text-muted-foreground">• {review.subject}</Typography>
              </View>
            </View>
            <Typography className="text-sm text-muted-foreground">{review.date}</Typography>
          </View>
          <Typography className="text-foreground mb-3">{review.comment}</Typography>
          <View className="flex-row justify-between items-center">
            <Typography className="text-xs text-muted-foreground">
              {review.helpful} people found this helpful
            </Typography>
            <TouchableOpacity>
              <Typography className="text-xs text-primary">Reply</Typography>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )

  const renderSettings = () => (
    <View className="space-y-6">
      {/* Branding */}
      <View className="bg-card p-6 rounded-lg border border-border">
        <Typography className="text-lg font-semibold text-foreground mb-4">Branding</Typography>
        <View className="space-y-4">
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Profile Picture</Typography>
            <Typography className="text-primary">Change</Typography>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Cover Image</Typography>
            <Typography className="text-primary">Upload</Typography>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Teaching Style</Typography>
            <Typography className="text-muted-foreground">Interactive</Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Preferences */}
      <View className="bg-card p-6 rounded-lg border border-border">
        <Typography className="text-lg font-semibold text-foreground mb-4">Preferences</Typography>
        <View className="space-y-4">
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Notification Settings</Typography>
            <Typography className="text-primary">Manage</Typography>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Privacy Settings</Typography>
            <Typography className="text-primary">Configure</Typography>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-between items-center py-3">
            <Typography className="text-foreground">Account Security</Typography>
            <Typography className="text-primary">Update</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-4 py-6"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="mb-6">
          <Typography className="text-2xl font-bold text-foreground">Profile Management</Typography>
          <Typography className="text-muted-foreground">Manage your profile and settings</Typography>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-muted p-1 rounded-lg mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-md ${activeTab === "profile" ? "bg-background" : ""}`}
            onPress={() => setActiveTab("profile")}
          >
            <Typography
              className={`text-center font-medium ${
                activeTab === "profile" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Profile
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-md ${activeTab === "reviews" ? "bg-background" : ""}`}
            onPress={() => setActiveTab("reviews")}
          >
            <Typography
              className={`text-center font-medium ${
                activeTab === "reviews" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Reviews
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 px-4 rounded-md ${activeTab === "settings" ? "bg-background" : ""}`}
            onPress={() => setActiveTab("settings")}
          >
            <Typography
              className={`text-center font-medium ${
                activeTab === "settings" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Settings
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === "profile" && renderProfile()}
        {activeTab === "reviews" && renderReviews()}
        {activeTab === "settings" && renderSettings()}
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={editModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background p-6 rounded-t-3xl">
            <Typography className="text-xl font-bold text-foreground mb-4">Edit {editField}</Typography>

            <TextInput
              className="bg-input border border-border rounded-lg p-4 text-foreground mb-6"
              placeholder={`Enter ${editField}`}
              value={editValue}
              onChangeText={setEditValue}
              multiline={editField === "bio"}
              numberOfLines={editField === "bio" ? 4 : 1}
            />

            <View className="flex-row space-x-4">
              <TouchableOpacity
                className="flex-1 bg-secondary p-4 rounded-lg items-center"
                onPress={() => setEditModal(false)}
              >
                <Typography className="text-secondary-foreground font-semibold">Cancel</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary p-4 rounded-lg items-center">
                <Typography className="text-primary-foreground font-semibold">Save</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showAchievementModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background p-6 rounded-t-3xl max-h-[80%]">
            <View className="flex-row justify-between items-center mb-6">
              <Typography className="text-xl font-bold text-foreground">All Achievements</Typography>
              <TouchableOpacity onPress={() => setShowAchievementModal(false)}>
                <Typography className="text-primary">Close</Typography>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-4">
                {tutorData.achievements.map((achievement, index) => (
                  <View key={index} className="bg-muted p-4 rounded-lg">
                    <View className="flex-row items-start gap-3">
                      <View className="w-12 h-12 bg-yellow-100 rounded-full items-center justify-center">
                        <Typography className="text-yellow-600 text-xl">🏆</Typography>
                      </View>
                      <View className="flex-1">
                        <Typography className="text-lg font-semibold text-foreground">{achievement.title}</Typography>
                        <Typography className="text-muted-foreground mt-1">{achievement.description}</Typography>
                        <Typography className="text-sm text-muted-foreground mt-2">
                          Achieved on {achievement.date}
                        </Typography>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
