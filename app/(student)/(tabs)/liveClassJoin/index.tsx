"use client"

import React, { useState } from "react"
import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, Alert } from "react-native"
import { Typography } from "@/components/Typography"

export default function LiveClassJoining() {
  const [refreshing, setRefreshing] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState("connecting")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const [participants, setParticipants] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      role: "Instructor",
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
      isPresenting: true,
    },
    {
      id: 2,
      name: "Alex Johnson",
      role: "Student",
      isOnline: true,
      isMuted: true,
      isVideoOn: true,
      isPresenting: false,
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Student",
      isOnline: true,
      isMuted: true,
      isVideoOn: false,
      isPresenting: false,
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Student",
      isOnline: true,
      isMuted: false,
      isVideoOn: true,
      isPresenting: false,
    },
    {
      id: 5,
      name: "You",
      role: "Student",
      isOnline: true,
      isMuted: isMuted,
      isVideoOn: isVideoOn,
      isPresenting: false,
    },
  ])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  const handleJoinClass = () => {
    setIsJoining(true)
    setTimeout(() => {
      setIsJoining(false)
      setConnectionStatus("connected")
      Alert.alert("Success", "You have joined the live class!")
    }, 2000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    setParticipants((prev) => prev.map((p) => (p.name === "You" ? { ...p, isMuted: !isMuted } : p)))
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    setParticipants((prev) => prev.map((p) => (p.name === "You" ? { ...p, isVideoOn: !isVideoOn } : p)))
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
  }

  const handleLeaveClass = () => {
    Alert.alert("Leave Class", "Are you sure you want to leave the live class?", [
      { text: "Cancel", style: "cancel" },
      { text: "Leave", style: "destructive", onPress: () => setConnectionStatus("disconnected") },
    ])
  }

  const VideoGrid = () => {
    const presenter = participants.find((p) => p.isPresenting)
    const otherParticipants = participants.filter((p) => !p.isPresenting)

    return (
      <View className="bg-black rounded-xl overflow-hidden mb-4">
        {/* Main presenter view */}
        {presenter && (
          <View className="h-64 bg-gray-900 relative items-center justify-center">
            <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            {presenter.isVideoOn ? (
              <View className="w-full h-full bg-blue-900 items-center justify-center">
                <Typography className="text-6xl">👩‍🏫</Typography>
                <Typography className="text-white text-sm mt-2">HD Video</Typography>
              </View>
            ) : (
              <View className="w-full h-full bg-gray-700 items-center justify-center">
                <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center">
                  <Typography className="text-white text-lg font-bold">SW</Typography>
                </View>
                <Typography className="text-white text-sm mt-2">Camera Off</Typography>
              </View>
            )}

            {/* Presenter controls overlay */}
            <View className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-1">
              <Typography className="text-white text-xs">{presenter.name} (Presenting)</Typography>
            </View>

            {/* Mute indicator */}
            {presenter.isMuted && (
              <View className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                <Typography className="text-white text-xs">🔇</Typography>
              </View>
            )}
          </View>
        )}

        {/* Participant thumbnails */}
        <View className="flex-row flex-wrap p-2 gap-2">
          {otherParticipants.map((participant) => (
            <View key={participant.id} className="w-20 h-16 bg-gray-800 rounded relative">
              {participant.isVideoOn ? (
                <View className="w-full h-full bg-blue-800 rounded items-center justify-center">
                  <Typography className="text-lg">
                    {participant.name === "You"
                      ? "👤"
                      : participant.name.includes("Alex")
                        ? "👨‍🎓"
                        : participant.name.includes("Emma")
                          ? "👩‍🎓"
                          : "👨‍🎓"}
                  </Typography>
                </View>
              ) : (
                <View className="w-full h-full bg-gray-600 rounded items-center justify-center">
                  <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                    <Typography className="text-white text-xs font-bold">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Typography>
                  </View>
                </View>
              )}

              {/* Name label */}
              <View className="absolute bottom-0 left-0 right-0 bg-black/70 rounded-b">
                <Typography className="text-white text-xs text-center px-1">
                  {participant.name === "You" ? "You" : participant.name.split(" ")[0]}
                </Typography>
              </View>

              {/* Mute indicator */}
              {participant.isMuted && (
                <View className="absolute top-1 right-1 bg-red-600 rounded-full w-3 h-3 items-center justify-center">
                  <Typography className="text-white text-xs">🔇</Typography>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="p-4">
          {/* Header with class info */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Typography className="text-xl font-bold text-foreground">Advanced Mathematics</Typography>
              <Typography className="text-sm text-muted-foreground">Chapter 5: Calculus Fundamentals</Typography>
            </View>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Typography className="text-green-800 text-sm font-medium">🔴 LIVE</Typography>
            </View>
          </View>

          {connectionStatus === "connected" ? (
            <>
              {/* Video Grid */}
              <VideoGrid />

              {/* Bottom Control Bar */}
              <View className="bg-card rounded-2xl p-4 mb-4 border border-border">
                <View className="flex-row justify-center items-center gap-4">
                  {/* Mute/Unmute */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${isMuted ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleMute}
                  >
                    <Typography className={`text-xl ${isMuted ? "text-white" : "text-foreground"}`}>
                      {isMuted ? "🔇" : "🎤"}
                    </Typography>
                  </TouchableOpacity>

                  {/* Video On/Off */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${!isVideoOn ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleVideo}
                  >
                    <Typography className={`text-xl ${!isVideoOn ? "text-white" : "text-foreground"}`}>
                      {isVideoOn ? "📹" : "📵"}
                    </Typography>
                  </TouchableOpacity>

                  {/* Raise Hand */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${isHandRaised ? "bg-yellow-500" : "bg-muted"}`}
                    onPress={toggleHandRaise}
                  >
                    <Typography className={`text-xl ${isHandRaised ? "text-white" : "text-foreground"}`}>✋</Typography>
                  </TouchableOpacity>

                  {/* Chat */}
                  <TouchableOpacity className="p-3 rounded-full bg-muted" onPress={() => setShowChat(!showChat)}>
                    <Typography className="text-xl text-foreground">💬</Typography>
                  </TouchableOpacity>

                  {/* More Options */}
                  <TouchableOpacity className="p-3 rounded-full bg-muted">
                    <Typography className="text-xl text-foreground">⋯</Typography>
                  </TouchableOpacity>

                  {/* Leave Call */}
                  <TouchableOpacity className="p-3 rounded-full bg-red-600" onPress={handleLeaveClass}>
                    <Typography className="text-xl text-white">📞</Typography>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Participants count and info */}
              <View className="bg-card rounded-xl p-3 mb-4 border border-border">
                <View className="flex-row items-center justify-between">
                  <Typography className="text-sm text-muted-foreground">
                    {participants.filter((p) => p.isOnline).length} participants • Recording in progress
                  </Typography>
                  <Typography className="text-sm text-green-600 font-medium">45:23</Typography>
                </View>
              </View>
            </>
          ) : (
            <>
              {/* Pre-join preview */}
              <View className="bg-card rounded-2xl p-4 mb-6 border border-border">
                <Typography className="text-lg font-semibold text-foreground mb-4">Ready to join?</Typography>

                {/* Camera preview */}
                <View className="bg-black rounded-xl h-48 mb-4 items-center justify-center">
                  <View className="w-full h-full bg-blue-900 rounded-xl items-center justify-center">
                    <Typography className="text-6xl mb-2">👤</Typography>
                    <Typography className="text-white text-sm">Camera Preview</Typography>
                  </View>
                </View>

                {/* Pre-join controls */}
                <View className="flex-row justify-center gap-4 mb-4">
                  <TouchableOpacity
                    className={`p-3 rounded-full ${isMuted ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleMute}
                  >
                    <Typography className={`text-xl ${isMuted ? "text-white" : "text-foreground"}`}>
                      {isMuted ? "🔇" : "🎤"}
                    </Typography>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`p-3 rounded-full ${!isVideoOn ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleVideo}
                  >
                    <Typography className={`text-xl ${!isVideoOn ? "text-white" : "text-foreground"}`}>
                      {isVideoOn ? "📹" : "📵"}
                    </Typography>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className={`rounded-xl p-4 items-center ${isJoining ? "bg-muted" : "bg-primary"}`}
                  onPress={handleJoinClass}
                  disabled={isJoining}
                >
                  <Typography
                    className={`text-lg font-semibold ${isJoining ? "text-muted-foreground" : "text-primary-foreground"}`}
                  >
                    {isJoining ? "Joining..." : "Join Live Class"}
                  </Typography>
                </TouchableOpacity>
              </View>

              {/* Class info */}
              <View className="bg-card rounded-xl p-4 border border-border">
                <Typography className="text-base font-medium text-foreground mb-2">Class Information</Typography>
                <Typography className="text-sm text-muted-foreground mb-1">Duration: 90 minutes</Typography>
                <Typography className="text-sm text-muted-foreground mb-1">Started: 2:30 PM</Typography>
                <Typography className="text-sm text-muted-foreground">
                  {participants.length - 1} participants waiting
                </Typography>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
