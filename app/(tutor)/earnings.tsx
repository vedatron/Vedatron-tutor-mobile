"use client"

import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl } from "react-native"
import { useState } from "react"
import { Typography } from "@/components/Typography"

export default function Earnings() {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const earningsData = {
    monthly: { total: 85000, classes: 45, students: 125 },
    weekly: { total: 22000, classes: 12, students: 125 },
    total: { total: 450000, classes: 280, students: 125 },
  }

  const payoutHistory = [
    { id: 1, date: "2024-01-15", amount: 75000, status: "Completed", method: "Bank Transfer" },
    { id: 2, date: "2023-12-15", amount: 82000, status: "Completed", method: "Bank Transfer" },
    { id: 3, date: "2023-11-15", amount: 78000, status: "Completed", method: "Bank Transfer" },
    { id: 4, date: "2023-10-15", amount: 65000, status: "Pending", method: "Bank Transfer" },
  ]

  const upcomingPayments = [
    { id: 1, date: "2024-02-15", estimatedAmount: 88000, description: "January earnings payout" },
    { id: 2, date: "2024-03-15", estimatedAmount: 90000, description: "February earnings payout" },
  ]

  const periods = [
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "total", label: "Total" },
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
    <SafeAreaView className="flex-1 bg-(--background-color)">
      <ScrollView
        className="flex-1 bg-(--background-color)"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="bg-[--card-background-color] p-4 border-b border-[--card-border-color]">
          <Typography className="mt-8 text-[--text-color] text-xl">Earnings</Typography>
        </View>

        <View className="p-4 gap-6">
          {/* Earnings Summary */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Earnings Summary</Typography>

            {/* Period Selector */}
            <View className="flex-row bg-[--field-background-color] rounded-xl p-1 mb-4">
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.id}
                  onPress={() => setSelectedPeriod(period.id)}
                  className={`flex-1 py-2 rounded-lg ${selectedPeriod === period.id ? "bg-[--primary-color]" : ""}`}
                >
                  <Typography
                    className={`text-center text-sm ${
                      selectedPeriod === period.id ? "text-white font-poppins-semibold" : "text-[--nav-text-color]"
                    }`}
                  >
                    {period.label}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>

            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="items-center mb-4">
                <Typography className="text-[--nav-text-color] text-base">
                  {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Earnings
                </Typography>
                <Typography className="text-[--text-color] text-3xl font-poppins-bold">
                  ₹{earningsData[selectedPeriod as keyof typeof earningsData].total.toLocaleString()}
                </Typography>
              </View>

              <View className="flex-row justify-between bg-[--field-background-color] p-3 rounded-xl">
                <View className="items-center">
                  <Typography className="text-[--nav-text-color] text-sm">Classes Taught</Typography>
                  <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                    {earningsData[selectedPeriod as keyof typeof earningsData].classes}
                  </Typography>
                </View>
                <View className="items-center">
                  <Typography className="text-[--nav-text-color] text-sm">Total Students</Typography>
                  <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                    {earningsData[selectedPeriod as keyof typeof earningsData].students}
                  </Typography>
                </View>
                <View className="items-center">
                  <Typography className="text-[--nav-text-color] text-sm">Avg per Class</Typography>
                  <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                    ₹
                    {Math.round(
                      earningsData[selectedPeriod as keyof typeof earningsData].total /
                        earningsData[selectedPeriod as keyof typeof earningsData].classes,
                    ).toLocaleString()}
                  </Typography>
                </View>
              </View>
            </View>
          </View>

          {/* Upcoming Payments */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Upcoming Payments</Typography>
            <View className="gap-3">
              {upcomingPayments.map((payment) => (
                <View
                  key={payment.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        ₹{payment.estimatedAmount.toLocaleString()}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">{payment.description}</Typography>
                      <Typography className="text-[--nav-text-color] text-sm">Expected: {payment.date}</Typography>
                    </View>
                    <View className="bg-blue-100 px-3 py-1 rounded-xl">
                      <Typography className="text-blue-600 text-sm">Upcoming</Typography>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Payout History */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Payout History</Typography>
            <View className="gap-3">
              {payoutHistory.map((payout) => (
                <View
                  key={payout.id}
                  className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-1">
                      <Typography className="text-[--text-color] text-lg font-poppins-semibold">
                        ₹{payout.amount.toLocaleString()}
                      </Typography>
                      <Typography className="text-[--nav-text-color] text-base">{payout.method}</Typography>
                      <Typography className="text-[--nav-text-color] text-sm">{payout.date}</Typography>
                    </View>
                    <View className={`px-3 py-1 rounded-xl ${getStatusColor(payout.status)}`}>
                      <Typography className="text-sm">{payout.status}</Typography>
                    </View>
                  </View>

                  {payout.status === "Completed" && (
                    <TouchableOpacity className="border border-[--card-border-color] py-2 rounded-xl">
                      <Typography className="text-[--text-color] text-center">Download Receipt</Typography>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Payment Settings */}
          <View>
            <Typography className="text-[--text-color] text-xl mb-4">Payment Settings</Typography>
            <View className="bg-[--card-background-color] p-4 rounded-2xl border border-[--card-border-color] shadow-md">
              <View className="gap-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Typography className="text-[--text-color] text-lg font-poppins-semibold">Bank Account</Typography>
                    <Typography className="text-[--nav-text-color] text-base">**** **** **** 1234</Typography>
                  </View>
                  <TouchableOpacity>
                    <Typography className="text-[--primary-color] text-base">Edit</Typography>
                  </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between">
                  <View>
                    <Typography className="text-[--text-color] text-lg font-poppins-semibold">Auto Payout</Typography>
                    <Typography className="text-[--nav-text-color] text-base">Monthly on 15th</Typography>
                  </View>
                  <View className="bg-green-100 px-3 py-1 rounded-xl">
                    <Typography className="text-green-600 text-sm">Enabled</Typography>
                  </View>
                </View>

                <TouchableOpacity className="bg-[--primary-color] py-3 rounded-xl">
                  <Typography className="text-white text-center font-poppins-semibold">
                    Update Payment Settings
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
