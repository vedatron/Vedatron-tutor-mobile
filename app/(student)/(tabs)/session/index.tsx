"use client"

import React, { useState, useEffect } from "react"
import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, Alert } from "react-native"
import { Typography } from "@/components/Typography"

export default function OneToOneJoining() {
  const [refreshing, setRefreshing] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [sessionStatus, setSessionStatus] = useState("waiting")
  const [sessionTime, setSessionTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [tutorVideoOn, setTutorVideoOn] = useState(true)
  const [tutorMuted, setTutorMuted] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showWhiteboard, setShowWhiteboard] = useState(false)

  const tutor = {
    name: "Dr. Sarah Wilson",
    subject: "Advanced Mathematics",
    rating: 4.9,
    experience: "8 years",
    specialization: "Calculus & Algebra",
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 2000)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionStatus === "active") {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionStatus])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleJoinSession = () => {
    setIsJoining(true)
    setTimeout(() => {
      setIsJoining(false)
      setSessionStatus("active")
      setTutorVideoOn(true)
      Alert.alert("Connected", "You are now connected with your tutor!")
    }, 2000)
  }

  const toggleMute = () => setIsMuted(!isMuted)
  const toggleVideo = () => setIsVideoOn(!isVideoOn)
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing)
  const toggleWhiteboard = () => setShowWhiteboard(!showWhiteboard)

  const handleEndSession = () => {
    Alert.alert("End Session", "Are you sure you want to end this tutoring session?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "End Session",
        style: "destructive",
        onPress: () => {
          setSessionStatus("ended")
          setSessionTime(0)
        },
      },
    ])
  }

  const VideoCallLayout = () => {
    if (sessionStatus !== "active") return null

    return (
      <View className="bg-black rounded-xl overflow-hidden mb-4">
        {isScreenSharing ? (
          // Screen sharing view
          <View className="h-64 bg-gray-900 relative">
            <View className="w-full h-full bg-blue-900 items-center justify-center">
              <Typography className="text-4xl mb-2">📊</Typography>
              <Typography className="text-white text-sm">Screen Sharing Active</Typography>
            </View>

            {/* Picture-in-picture for tutor */}
            <View className="absolute top-2 right-2 w-20 h-16 bg-gray-800 rounded border-2 border-white">
              {tutorVideoOn ? (
                <View className="w-full h-full bg-blue-800 rounded items-center justify-center">
                  <Typography className="text-lg">👩‍🏫</Typography>
                </View>
              ) : (
                <View className="w-full h-full bg-gray-600 rounded items-center justify-center">
                  <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                    <Typography className="text-white text-xs font-bold">SW</Typography>
                  </View>
                </View>
              )}
            </View>

            {/* Your video in corner */}
            <View className="absolute bottom-2 right-2 w-20 h-16 bg-gray-800 rounded border-2 border-green-500">
              {isVideoOn ? (
                <View className="w-full h-full bg-green-800 rounded items-center justify-center">
                  <Typography className="text-lg">👤</Typography>
                </View>
              ) : (
                <View className="w-full h-full bg-gray-600 rounded items-center justify-center">
                  <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center">
                    <Typography className="text-white text-xs font-bold">You</Typography>
                  </View>
                </View>
              )}
            </View>
          </View>
        ) : (
          // Split screen view
          <View className="h-64">
            {/* Tutor's video (main) */}
            <View className="flex-1 bg-gray-900 relative">
              {tutorVideoOn ? (
                <View className="w-full h-full bg-blue-900 items-center justify-center">
                  <Typography className="text-6xl mb-2">👩‍🏫</Typography>
                  <Typography className="text-white text-sm">Dr. Sarah Wilson</Typography>
                </View>
              ) : (
                <View className="w-full h-full bg-gray-700 items-center justify-center">
                  <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center">
                    <Typography className="text-white text-lg font-bold">SW</Typography>
                  </View>
                  <Typography className="text-white text-sm mt-2">Camera Off</Typography>
                </View>
              )}

              {/* Tutor mute indicator */}
              {tutorMuted && (
                <View className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
                  <Typography className="text-white text-xs">🔇</Typography>
                </View>
              )}
            </View>

            {/* Your video (bottom right corner) */}
            <View className="absolute bottom-2 right-2 w-24 h-20 bg-gray-800 rounded border-2 border-green-500">
              {isVideoOn ? (
                <View className="w-full h-full bg-green-800 rounded items-center justify-center">
                  <Typography className="text-2xl">👤</Typography>
                  <Typography className="text-white text-xs mt-1">You</Typography>
                </View>
              ) : (
                <View className="w-full h-full bg-gray-600 rounded items-center justify-center">
                  <View className="w-10 h-10 bg-green-500 rounded-full items-center justify-center">
                    <Typography className="text-white text-sm font-bold">You</Typography>
                  </View>
                </View>
              )}

              {/* Your mute indicator */}
              {isMuted && (
                <View className="absolute top-1 right-1 bg-red-600 rounded-full w-4 h-4 items-center justify-center">
                  <Typography className="text-white text-xs">🔇</Typography>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Connection quality indicator */}
        <View className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1">
          <Typography className="text-white text-xs">🟢 HD • {formatTime(sessionTime)}</Typography>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className="p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Typography className="text-xl font-bold text-foreground">One-to-One Session</Typography>
              <Typography className="text-sm text-muted-foreground">{tutor.subject} • Personal Tutoring</Typography>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${
                sessionStatus === "active"
                  ? "bg-green-100"
                  : sessionStatus === "waiting"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
              }`}
            >
              <Typography
                className={`text-sm font-medium ${
                  sessionStatus === "active"
                    ? "text-green-800"
                    : sessionStatus === "waiting"
                      ? "text-yellow-800"
                      : "text-gray-800"
                }`}
              >
                {sessionStatus === "active"
                  ? `🟢 ${formatTime(sessionTime)}`
                  : sessionStatus === "waiting"
                    ? "🟡 Waiting"
                    : "⚫ Ended"}
              </Typography>
            </View>
          </View>

          {sessionStatus === "active" ? (
            <>
              {/* Video Call Layout */}
              <VideoCallLayout />

              {/* Control Bar */}
              <View className="bg-card rounded-2xl p-4 mb-4 border border-border">
                <View className="flex-row justify-center items-center gap-3">
                  {/* Mute/Unmute */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${isMuted ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleMute}
                  >
                    <Typography className={`text-lg ${isMuted ? "text-white" : "text-foreground"}`}>
                      {isMuted ? "🔇" : "🎤"}
                    </Typography>
                  </TouchableOpacity>

                  {/* Video On/Off */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${!isVideoOn ? "bg-red-600" : "bg-muted"}`}
                    onPress={toggleVideo}
                  >
                    <Typography className={`text-lg ${!isVideoOn ? "text-white" : "text-foreground"}`}>
                      {isVideoOn ? "📹" : "📵"}
                    </Typography>
                  </TouchableOpacity>

                  {/* Screen Share */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${isScreenSharing ? "bg-blue-600" : "bg-muted"}`}
                    onPress={toggleScreenShare}
                  >
                    <Typography className={`text-lg ${isScreenSharing ? "text-white" : "text-foreground"}`}>
                      📱
                    </Typography>
                  </TouchableOpacity>

                  {/* Whiteboard */}
                  <TouchableOpacity
                    className={`p-3 rounded-full ${showWhiteboard ? "bg-green-600" : "bg-muted"}`}
                    onPress={toggleWhiteboard}
                  >
                    <Typography className={`text-lg ${showWhiteboard ? "text-white" : "text-foreground"}`}>
                      📝
                    </Typography>
                  </TouchableOpacity>

                  {/* Chat */}
                  <TouchableOpacity className="p-3 rounded-full bg-muted">
                    <Typography className="text-lg text-foreground">💬</Typography>
                  </TouchableOpacity>

                  {/* End Call */}
                  <TouchableOpacity className="p-3 rounded-full bg-red-600" onPress={handleEndSession}>
                    <Typography className="text-lg text-white">📞</Typography>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Session Tools */}
              {showWhiteboard && (
                <View className="bg-card rounded-xl p-4 mb-4 border border-border">
                  <View className="h-32 bg-white rounded border-2 border-dashed border-gray-300 items-center justify-center">
                    <Typography className="text-gray-500">✏️ Shared Whiteboard</Typography>
                    <Typography className="text-gray-400 text-sm">Draw and collaborate here</Typography>
                  </View>
                </View>
              )}
            </>
          ) : sessionStatus === "waiting" ? (
            <>
              {/* Pre-join setup */}
              <View className="bg-card rounded-2xl p-4 mb-6 border border-border">
                <Typography className="text-lg font-semibold text-foreground mb-4">Get ready to connect</Typography>

                {/* Camera preview */}
                <View className="bg-black rounded-xl h-48 mb-4 relative">
                  {isVideoOn ? (
                    <View className="w-full h-full bg-green-900 rounded-xl items-center justify-center">
                      <Typography className="text-6xl mb-2">👤</Typography>
                      <Typography className="text-white text-sm">Your Camera</Typography>
                    </View>
                  ) : (
                    <View className="w-full h-full bg-gray-700 rounded-xl items-center justify-center">
                      <View className="w-16 h-16 bg-green-600 rounded-full items-center justify-center">
                        <Typography className="text-white text-lg font-bold">You</Typography>
                      </View>
                      <Typography className="text-white text-sm mt-2">Camera Off</Typography>
                    </View>
                  )}
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
                  onPress={handleJoinSession}
                  disabled={isJoining}
                >
                  <Typography
                    className={`text-lg font-semibold ${isJoining ? "text-muted-foreground" : "text-primary-foreground"}`}
                  >
                    {isJoining ? "Connecting..." : "Join Session"}
                  </Typography>
                </TouchableOpacity>
              </View>

              {/* Tutor info */}
              <View className="bg-card rounded-xl p-4 border border-border">
                <Typography className="text-base font-semibold text-foreground mb-3">Your Tutor</Typography>
                <View className="flex-row items-center gap-3">
                  <View className="w-12 h-12 bg-blue-600 rounded-full items-center justify-center">
                    <Typography className="text-white text-lg font-bold">SW</Typography>
                  </View>
                  <View className="flex-1">
                    <Typography className="text-base font-medium text-foreground">{tutor.name}</Typography>
                    <Typography className="text-sm text-muted-foreground">{tutor.specialization}</Typography>
                    <Typography className="text-sm text-yellow-600">
                      ⭐ {tutor.rating} • {tutor.experience}
                    </Typography>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View className="bg-card rounded-xl p-4 items-center border border-border">
              <Typography className="text-lg font-semibold text-foreground mb-2">Session Completed</Typography>
              <Typography className="text-sm text-muted-foreground text-center mb-4">
                Your tutoring session has ended. Session recording and notes are being processed.
              </Typography>
              <TouchableOpacity className="bg-primary rounded-xl px-6 py-3">
                <Typography className="text-primary-foreground font-medium">View Session Summary</Typography>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
