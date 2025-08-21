


"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { cn } from "../../lib/utils"

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  error?: string
  className?: string
  inputClassName?: string
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  onBlur?: () => void
  onFocus?: () => void
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error,
  className,
  inputClassName,
  iconLeft,
  iconRight,
  onBlur,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={cn("mb-4", className)}>
      {label && (
        <Text className={cn(
          "text-gray-900 font-bold font-poppins mb-2",
          error && "text-red-500"
        )}>
          {label}
        </Text>
      )}

      <View className={cn(
        "flex-row items-center w-full border rounded-xl px-4 bg-white",
        error 
          ? "border-red-500" 
          : isFocused 
            ? "border-blue-500" 
            : "border-gray-200",
        iconLeft ? "pl-3" : "",
        (iconRight || secureTextEntry) ? "pr-3" : ""
      )}>
        {iconLeft && (
          <View className="mr-2">
            {iconLeft}
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          className={cn(
            "flex-1 py-3 text-gray-900",
            inputClassName
          )}
          placeholderTextColor="#9ca3af"
          onFocus={() => {
            setIsFocused(true)
            onFocus?.()
          }}
          onBlur={() => {
            setIsFocused(false)
            onBlur?.()
          }}
        />

        {secureTextEntry ? (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
            className="ml-2"
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        ) : iconRight ? (
          <View className="ml-2">
            {iconRight}
          </View>
        ) : null}
      </View>

      {error && (
        <View className="flex-row items-center mt-1.5 gap-1">
          <MaterialIcons name="error-outline" size={14} color="#ef4444" />
          <Text className="text-red-500 text-sm">{error}</Text>
        </View>
      )}
    </View>
  )
}