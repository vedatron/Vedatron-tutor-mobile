"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, TextInput } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Help() {
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const faqData = [
    {
      id: 1,
      question: "How do I schedule a new class?",
      answer:
        "Go to the Schedule tab and tap 'Schedule Class'. Fill in the class details including subject, time, duration, and student capacity.",
    },
    {
      id: 2,
      question: "How can I track student attendance?",
      answer:
        "Student attendance is automatically tracked when they join live classes. You can view attendance reports in the Students section.",
    },
    {
      id: 3,
      question: "How do I upload course materials?",
      answer:
        "Navigate to My Classes > Resources tab and tap 'Upload New Resource'. You can upload PDFs, presentations, and other study materials.",
    },
    {
      id: 4,
      question: "When will I receive my payments?",
      answer:
        "Payments are processed monthly on the 15th. You can track your earnings and payout history in the Earnings section.",
    },
    {
      id: 5,
      question: "How do I create assignments?",
      answer:
        "Go to Assignments tab and tap 'Create Assignment'. Choose from templates or create custom assignments with due dates and grading criteria.",
    },
  ]

  const quickActions = [
    { title: "Contact Support", description: "Get help from our support team", action: "contact" },
    { title: "Video Tutorials", description: "Watch step-by-step guides", action: "tutorials" },
    { title: "Community Forum", description: "Connect with other tutors", action: "forum" },
    { title: "Feature Requests", description: "Suggest new features", action: "feedback" },
  ]

  const filteredFAQs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Help & Support</Typography>
          <Typography className="text-[--nav-text-color] text-base">Find answers and get assistance</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Search Bar */}
          <View className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md">
            <TextInput
              className="p-4 text-[--text-color] text-base"
              placeholder="Search help articles..."
              placeholderTextColor="var(--nav-text-color)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Quick Actions */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Quick Actions</Typography>
            <View className="gap-3">
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-1">
                    {action.title}
                  </Typography>
                  <Typography className="text-[--nav-text-color] text-base">{action.description}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* FAQ Section */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Frequently Asked Questions</Typography>
            <View className="gap-3">
              {filteredFAQs.map((faq) => (
                <View
                  key={faq.id}
                  className="bg-[--card-background-color] rounded-2xl border border-[--card-border-color] shadow-md overflow-hidden"
                >
                  <TouchableOpacity
                    className="p-4"
                    onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  >
                    <View className="flex-row items-center justify-between">
                      <Typography className="text-[--text-color] text-base font-poppins-semibold flex-1">
                        {faq.question}
                      </Typography>
                      <Typography className="text-[--primary-color] text-lg ml-2">
                        {expandedFAQ === faq.id ? "−" : "+"}
                      </Typography>
                    </View>
                  </TouchableOpacity>

                  {expandedFAQ === faq.id && (
                    <View className="px-4 pb-4 border-t border-[--card-border-color]">
                      <Typography className="text-[--nav-text-color] text-base mt-3">{faq.answer}</Typography>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contact Support */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">Still Need Help?</Typography>
            <Typography className="text-[--nav-text-color] text-base mb-4">
              Can't find what you're looking for? Our support team is here to help you.
            </Typography>

            <View className="gap-3">
              <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                <Typography className="text-white text-center font-poppins-semibold">Contact Support</Typography>
              </TouchableOpacity>

              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                  <Typography className="text-[--text-color] text-center">Email Us</Typography>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                  <Typography className="text-[--text-color] text-center">Live Chat</Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* App Info */}
          <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
            <Typography className="text-[--text-color] text-lg font-poppins-semibold mb-4">App Information</Typography>
            <View className="gap-2">
              <View className="flex-row justify-between">
                <Typography className="text-[--nav-text-color] text-base">Version</Typography>
                <Typography className="text-[--text-color] text-base">1.2.0</Typography>
              </View>
              <View className="flex-row justify-between">
                <Typography className="text-[--nav-text-color] text-base">Last Updated</Typography>
                <Typography className="text-[--text-color] text-base">Jan 15, 2024</Typography>
              </View>
            </View>

            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity className="flex-1 border border-[--card-border-color] py-2 rounded-xl">
                <Typography className="text-[--text-color] text-center text-sm">Privacy Policy</Typography>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 border border-[--card-border-color] py-2 rounded-xl">
                <Typography className="text-[--text-color] text-center text-sm">Terms of Service</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
