import type React from "react"
import { View } from "react-native"
import { cn } from "../../lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return <View className={cn("bg-white rounded-2xl p-4 shadow-sm border border-gray-100", className)}>{children}</View>
}
