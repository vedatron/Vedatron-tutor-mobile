"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Payments() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const paymentHistory = [
    { id: 1, date: "2024-01-15", amount: 2999, status: "Completed", plan: "Premium Monthly" },
    { id: 2, date: "2023-12-15", amount: 2999, status: "Completed", plan: "Premium Monthly" },
    { id: 3, date: "2023-11-15", amount: 2999, status: "Completed", plan: "Premium Monthly" },
    { id: 4, date: "2023-10-15", amount: 1999, status: "Completed", plan: "Basic Monthly" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600"
      case "Pending":
        return "bg-yellow-100 text-yellow-600"
      case "Failed":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView
        className="flex-1 bg-[--background-color]"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Payments</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Current Subscription */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Current Subscription</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Typography className="text-[--text-color] text-lg">Premium Plan</Typography>
                    <Typography className="text-[--text-color] text-base">All subjects • Unlimited access</Typography>
                  </View>
                  <View className="bg-green-100 px-3 py-1 rounded-xl">
                    <Typography className="text-green-600">Active</Typography>
                  </View>
                </View>

                <View className="bg-gray-50 p-3 rounded-xl">
                  <View className="flex-row justify-between mb-2">
                    <Typography className="text-[--text-color] text-base">Monthly Fee</Typography>
                    <Typography className="text-[--text-color] text-base">₹2,999</Typography>
                  </View>
                  <View className="flex-row justify-between mb-2">
                    <Typography className="text-[--text-color] text-base">Next Billing</Typography>
                    <Typography className="text-[--text-color] text-base">Feb 15, 2024</Typography>
                  </View>
                  <View className="flex-row justify-between">
                    <Typography className="text-[--text-color] text-base">Auto Renewal</Typography>
                    <Typography className="text-green-600 text-base">Enabled</Typography>
                  </View>
                </View>

                <View className="flex-row gap-3">
                  <TouchableOpacity className="flex-1 bg-[--primary-color] py-3 rounded-xl">
                    <Typography className="text-white text-center">Upgrade Plan</Typography>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 border border-[--card-border-color] py-3 rounded-xl">
                    <Typography className="text-[--text-color] text-center">Manage</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Payment History */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Payment History</Typography>
            <View className="gap-3">
              {paymentHistory.map((payment) => (
                <View
                  key={payment.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg">{payment.plan}</Typography>
                      <Typography className="text-[--text-color] text-base">{payment.date}</Typography>
                    </View>
                    <View className="items-end">
                      <Typography className="text-[--text-color] text-lg">
                        ₹{payment.amount.toLocaleString()}
                      </Typography>
                      <View className={`px-2 py-1 rounded-md ${getStatusColor(payment.status)}`}>
                        <Typography className="text-sm">{payment.status}</Typography>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity className="border border-[--card-border-color] py-2 rounded-xl">
                    <Typography className="text-[--text-color] text-center">Download Invoice</Typography>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Available Plans */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Available Plans</Typography>
            <View className="gap-3">
              <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <View className="gap-3">
                  <View className="flex-row items-center justify-between">
                    <Typography className="text-[--text-color] text-lg">Basic Plan</Typography>
                    <Typography className="text-[--text-color] text-lg">₹1,999/month</Typography>
                  </View>
                  <Typography className="text-[--text-color] text-base">
                    • 2 subjects • Limited live classes • Basic support
                  </Typography>
                  <TouchableOpacity className="border border-[--primary-color] py-3 rounded-xl">
                    <Typography className="text-[--primary-color] text-center">Select Plan</Typography>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="bg-[--card-background-color] p-4 rounded-2xl border-2 border-[--primary-color] shadow-md">
                <View className="gap-3">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                      <Typography className="text-[--text-color] text-lg">Premium Plan</Typography>
                      <View className="bg-[--primary-color] px-2 py-1 rounded-md">
                        <Typography className="text-white text-xs">CURRENT</Typography>
                      </View>
                    </View>
                    <Typography className="text-[--text-color] text-lg">₹2,999/month</Typography>
                  </View>
                  <Typography className="text-[--text-color] text-base">
                    • All subjects • Unlimited access • Priority support • AI features
                  </Typography>
                  <TouchableOpacity className="bg-gray-200 py-3 rounded-xl">
                    <Typography className="text-gray-500 text-center">Current Plan</Typography>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
                <View className="gap-3">
                  <View className="flex-row items-center justify-between">
                    <Typography className="text-[--text-color] text-lg">Pro Plan</Typography>
                    <Typography className="text-[--text-color] text-lg">₹4,999/month</Typography>
                  </View>
                  <Typography className="text-[--text-color] text-base">
                    • Everything in Premium • 1-on-1 sessions • Custom study plans
                  </Typography>
                  <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                    <Typography className="text-white text-center">Upgrade Now</Typography>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
