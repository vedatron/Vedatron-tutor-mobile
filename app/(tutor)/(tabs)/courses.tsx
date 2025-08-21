"use client"

import { useState } from "react"
import { View, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, Modal, TextInput } from "react-native"
import { Typography } from "@/components/Typography"

export default function ClassManagement() {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<"live" | "recorded" | "scheduled">("live")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showResourceModal, setShowResourceModal] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }

  const liveClasses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      subject: "Mathematics",
      time: "10:00 AM - 11:30 AM",
      date: "Today",
      students: 25,
      maxStudents: 30,
      status: "ongoing",
      duration: "1h 30m",
      resources: 3,
      attendance: 23,
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      subject: "Physics",
      time: "2:00 PM - 3:00 PM",
      date: "Today",
      students: 18,
      maxStudents: 25,
      status: "scheduled",
      duration: "1h",
      resources: 5,
      attendance: 0,
    },
  ]

  const recordedClasses = [
    {
      id: 3,
      title: "Chemistry Basics",
      subject: "Chemistry",
      duration: "45 minutes",
      views: 156,
      likes: 89,
      uploadDate: "2 days ago",
      resources: 4,
      size: "2.3 GB",
    },
    {
      id: 4,
      title: "Organic Chemistry",
      subject: "Chemistry",
      duration: "1h 15m",
      views: 203,
      likes: 145,
      uploadDate: "1 week ago",
      resources: 7,
      size: "3.1 GB",
    },
  ]

  const scheduledClasses = [
    {
      id: 5,
      title: "Calculus Workshop",
      subject: "Mathematics",
      time: "4:00 PM - 5:30 PM",
      date: "Tomorrow",
      students: 12,
      maxStudents: 20,
      status: "scheduled",
      duration: "1h 30m",
    },
  ]

  const resources = [
    { id: 1, name: "Chapter 5 Notes.pdf", type: "PDF", size: "2.3 MB", downloads: 45 },
    { id: 2, name: "Practice Problems.docx", type: "DOC", size: "1.8 MB", downloads: 32 },
    { id: 3, name: "Formula Sheet.png", type: "IMG", size: "856 KB", downloads: 67 },
  ]

  const renderClassCard = (classItem: any, type: string) => (
    <View key={classItem.id} className="bg-card p-4 rounded-xl border border-border mb-4">
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Typography className="text-lg font-semibold text-foreground">{classItem.title}</Typography>
          <Typography className="text-sm text-muted-foreground mt-1">{classItem.subject}</Typography>

          {type === "live" || type === "scheduled" ? (
            <View className="flex-row items-center mt-2">
              <Typography className="text-sm text-muted-foreground">
                {classItem.date} • {classItem.time}
              </Typography>
            </View>
          ) : (
            <View className="flex-row items-center mt-2">
              <Typography className="text-sm text-muted-foreground">
                {classItem.duration} • {classItem.views} views • {classItem.uploadDate}
              </Typography>
            </View>
          )}
        </View>

        <View
          className={`px-3 py-1 rounded-full ${
            classItem.status === "ongoing"
              ? "bg-green-100"
              : classItem.status === "scheduled"
                ? "bg-blue-100"
                : "bg-gray-100"
          }`}
        >
          <Typography
            className={`text-xs font-medium ${
              classItem.status === "ongoing"
                ? "text-green-700"
                : classItem.status === "scheduled"
                  ? "text-blue-700"
                  : "text-gray-700"
            }`}
          >
            {classItem.status || "recorded"}
          </Typography>
        </View>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between items-center mb-4">
        {type === "recorded" ? (
          <>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.views}</Typography>
              <Typography className="text-xs text-muted-foreground">Views</Typography>
            </View>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.likes}</Typography>
              <Typography className="text-xs text-muted-foreground">Likes</Typography>
            </View>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.resources}</Typography>
              <Typography className="text-xs text-muted-foreground">Resources</Typography>
            </View>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.size}</Typography>
              <Typography className="text-xs text-muted-foreground">Size</Typography>
            </View>
          </>
        ) : (
          <>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">
                {classItem.students}/{classItem.maxStudents}
              </Typography>
              <Typography className="text-xs text-muted-foreground">Students</Typography>
            </View>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.duration}</Typography>
              <Typography className="text-xs text-muted-foreground">Duration</Typography>
            </View>
            <View className="items-center">
              <Typography className="text-lg font-bold text-foreground">{classItem.resources || 0}</Typography>
              <Typography className="text-xs text-muted-foreground">Resources</Typography>
            </View>
            {classItem.attendance !== undefined && (
              <View className="items-center">
                <Typography className="text-lg font-bold text-foreground">{classItem.attendance}</Typography>
                <Typography className="text-xs text-muted-foreground">Present</Typography>
              </View>
            )}
          </>
        )}
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-2">
        {type === "live" && classItem.status === "ongoing" && (
          <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-lg">
            <Typography className="text-center text-white font-medium">Join Live</Typography>
          </TouchableOpacity>
        )}
        {type === "live" && classItem.status === "scheduled" && (
          <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg">
            <Typography className="text-center text-primary-foreground font-medium">Start Class</Typography>
          </TouchableOpacity>
        )}
        {type === "recorded" && (
          <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg">
            <Typography className="text-center text-primary-foreground font-medium">View Recording</Typography>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="flex-1 bg-muted py-3 rounded-lg"
          onPress={() => {
            setSelectedClass(classItem)
            setShowResourceModal(true)
          }}
        >
          <Typography className="text-center text-foreground font-medium">Resources</Typography>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-3 bg-muted rounded-lg">
          <Typography className="text-foreground">⋮</Typography>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-6">
        <View className="flex-row justify-between items-center mb-6">
          <Typography className="text-2xl font-bold text-foreground">Class Management</Typography>
          <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg" onPress={() => setShowCreateModal(true)}>
            <Typography className="text-primary-foreground font-medium">+ Create</Typography>
          </TouchableOpacity>
        </View>

        {/* Tab Navigation */}
        <View className="flex-row bg-muted rounded-lg p-1 mb-6">
          {[
            { key: "live", label: "Live Classes" },
            { key: "recorded", label: "Recorded" },
            { key: "scheduled", label: "Scheduled" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 py-2 rounded-md ${activeTab === tab.key ? "bg-background" : ""}`}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Typography
                className={`text-center text-sm font-medium ${
                  activeTab === tab.key ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </Typography>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView
        className="flex-1 px-4"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {activeTab === "live" && liveClasses.map((classItem) => renderClassCard(classItem, "live"))}
        {activeTab === "recorded" && recordedClasses.map((classItem) => renderClassCard(classItem, "recorded"))}
        {activeTab === "scheduled" && scheduledClasses.map((classItem) => renderClassCard(classItem, "scheduled"))}
      </ScrollView>

      {/* Create Class Modal */}
      <Modal visible={showCreateModal} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-card rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Typography className="text-xl font-semibold text-foreground">Create New Class</Typography>
              <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                <Typography className="text-primary">Cancel</Typography>
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              <View>
                <Typography className="text-sm font-medium text-foreground mb-2">Class Title</Typography>
                <TextInput
                  className="bg-muted p-3 rounded-lg text-foreground"
                  placeholder="Enter class title"
                  placeholderTextColor="#666"
                />
              </View>

              <View>
                <Typography className="text-sm font-medium text-foreground mb-2">Subject</Typography>
                <TextInput
                  className="bg-muted p-3 rounded-lg text-foreground"
                  placeholder="Select subject"
                  placeholderTextColor="#666"
                />
              </View>

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <Typography className="text-sm font-medium text-foreground mb-2">Date</Typography>
                  <TextInput
                    className="bg-muted p-3 rounded-lg text-foreground"
                    placeholder="Select date"
                    placeholderTextColor="#666"
                  />
                </View>
                <View className="flex-1">
                  <Typography className="text-sm font-medium text-foreground mb-2">Time</Typography>
                  <TextInput
                    className="bg-muted p-3 rounded-lg text-foreground"
                    placeholder="Select time"
                    placeholderTextColor="#666"
                  />
                </View>
              </View>

              <View className="flex-row gap-3 mt-4">
                <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg">
                  <Typography className="text-center text-primary-foreground font-medium">Create Live Class</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-muted py-3 rounded-lg">
                  <Typography className="text-center text-foreground font-medium">Schedule Later</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Resources Modal */}
      <Modal visible={showResourceModal} transparent animationType="slide">
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-card rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Typography className="text-xl font-semibold text-foreground">
                Resources - {selectedClass?.title}
              </Typography>
              <TouchableOpacity onPress={() => setShowResourceModal(false)}>
                <Typography className="text-primary">Close</Typography>
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="bg-primary py-3 rounded-lg mb-4">
              <Typography className="text-center text-primary-foreground font-medium">+ Upload Resource</Typography>
            </TouchableOpacity>

            {resources.map((resource) => (
              <View key={resource.id} className="bg-muted p-4 rounded-lg mb-3">
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Typography className="text-sm font-medium text-foreground">{resource.name}</Typography>
                    <Typography className="text-xs text-muted-foreground mt-1">
                      {resource.type} • {resource.size} • {resource.downloads} downloads
                    </Typography>
                  </View>
                  <TouchableOpacity className="ml-3">
                    <Typography className="text-primary">⋮</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
