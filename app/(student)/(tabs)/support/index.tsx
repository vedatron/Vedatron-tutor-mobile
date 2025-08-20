"use client"

import { useState } from "react"
import { View, ScrollView, TouchableOpacity, TextInput, SafeAreaView, RefreshControl } from "react-native"
import { Typography } from "@/components/Typography"

export default function Support() {
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const chatMessages = [
    { id: 1, text: "Hello! How can I help you today?", sender: "support", time: "10:00 AM" },
    { id: 2, text: "I'm having trouble accessing my recorded classes", sender: "student", time: "10:02 AM" },
    {
      id: 3,
      text: "I can help you with that. Let me check your account settings.",
      sender: "support",
      time: "10:03 AM",
    },
    {
      id: 4,
      text: "Your account looks good. Try refreshing the app and let me know if the issue persists.",
      sender: "support",
      time: "10:05 AM",
    },
  ]

  const faqs = [
    {
      id: 1,
      question: "How do I join a live class?",
      answer: 'Click on the "Join" button in your dashboard when the class is live.',
    },
    {
      id: 2,
      question: "Can I download recorded classes?",
      answer: "Yes, you can download recorded classes for offline viewing from the Class Management section.",
    },
    {
      id: 3,
      question: "How do I change my subscription plan?",
      answer: 'Go to Payments section and click on "Manage" next to your current plan.',
    },
    {
      id: 4,
      question: "What if I miss a live class?",
      answer: "All live classes are automatically recorded and available in the Recorded section.",
    },
  ]

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Support</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Chat Support */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Chat Support</Typography>
            <View className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md">
              {/* Chat Messages */}
              <View className="p-4 gap-3 max-h-80">
                {chatMessages.map((msg) => (
                  <View
                    key={msg.id}
                    className={`flex-row ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
                  >
                    <View
                      className={`max-w-xs p-3 rounded-2xl ${
                        msg.sender === "student" ? "bg-[--primary-color] rounded-br-md" : "bg-gray-100 rounded-bl-md"
                      }`}
                    >
                      <Typography className={`${msg.sender === "student" ? "text-white" : "text-[--text-color]"}`}>
                        {msg.text}
                      </Typography>
                      <Typography
                        className={`text-xs mt-1 ${msg.sender === "student" ? "text-blue-100" : "text-gray-500"}`}
                      >
                        {msg.time}
                      </Typography>
                    </View>
                  </View>
                ))}
              </View>

              {/* Message Input */}
              <View className="border-t border-[--card-border-color] p-4">
                <View className="flex-row gap-3">
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type your message..."
                    className="flex-1 border border-[--card-border-color] rounded-xl px-4 py-3"
                  />
                  <TouchableOpacity className="bg-[--primary-color] px-4 py-3 rounded-xl">
                    <Typography className="text-white">Send</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Tutor Feedback */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Rate Your Experience</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="gap-4">
                <Typography className="text-[--text-color] text-lg">How was your recent class?</Typography>

                {/* Star Rating */}
                <View className="flex-row gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => setRating(star)} className="p-1">
                      <Typography className={`text-2xl ${star <= rating ? "⭐" : "☆"}`}>
                        {star <= rating ? "⭐" : "☆"}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Feedback Input */}
                <TextInput
                  value={feedback}
                  onChangeText={setFeedback}
                  placeholder="Share your feedback..."
                  multiline
                  numberOfLines={4}
                  className="border border-[--card-border-color] rounded-xl p-4 text-[--text-color]"
                  textAlignVertical="top"
                />

                <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                  <Typography className="text-white text-center">Submit Feedback</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* FAQ Section */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Frequently Asked Questions</Typography>
            <View className="gap-3">
              {faqs.map((faq) => (
                <View
                  key={faq.id}
                  className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <TouchableOpacity
                    onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="p-4"
                  >
                    <View className="flex-row items-center justify-between">
                      <Typography className="text-[--text-color] text-base flex-1 pr-4">{faq.question}</Typography>
                      <Typography className="text-[--text-color] text-lg">
                        {expandedFaq === faq.id ? "−" : "+"}
                      </Typography>
                    </View>
                  </TouchableOpacity>

                  {expandedFaq === faq.id && (
                    <View className="px-4 pb-4">
                      <View className="border-t border-[--card-border-color] pt-3">
                        <Typography className="text-[--text-color] text-base">{faq.answer}</Typography>
                      </View>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contact Information */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Contact Information</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="gap-3">
                <View className="flex-row items-center gap-3">
                  <Typography className="text-xl">📧</Typography>
                  <View>
                    <Typography className="text-[--text-color] text-base">Email Support</Typography>
                    <Typography className="text-[--text-color] text-base">support@vedatrontutor.com</Typography>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <Typography className="text-xl">📞</Typography>
                  <View>
                    <Typography className="text-[--text-color] text-base">Phone Support</Typography>
                    <Typography className="text-[--text-color] text-base">+91 98765 43210</Typography>
                  </View>
                </View>

                <View className="flex-row items-center gap-3">
                  <Typography className="text-xl">🕒</Typography>
                  <View>
                    <Typography className="text-[--text-color] text-base">Support Hours</Typography>
                    <Typography className="text-[--text-color] text-base">Mon-Fri: 9 AM - 8 PM</Typography>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
