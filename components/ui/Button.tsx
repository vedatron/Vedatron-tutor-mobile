"use client"

import type React from "react"
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import { cn } from "../../lib/utils"

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
}) => {
  const baseClasses = "rounded-xl flex items-center justify-center"

  const variantClasses = {
    primary: "bg-[--primary-color]",
    secondary: "bg-gray-200",
    outline: "border-2 border-[--primary-color] bg-transparent",
  }

  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  }

  const textVariantClasses = {
    primary: "text-white font-semibold",
    secondary: "text-gray-900 font-semibold",
    outline: "text-blue-600 font-semibold",
  }

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "white" : "#3b82f6"} />
      ) : (
        <Text className={cn(textVariantClasses[variant], textSizeClasses[size])}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}
