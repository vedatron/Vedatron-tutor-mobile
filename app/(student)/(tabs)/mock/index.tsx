"use client"

import { useState, useEffect } from "react"
import { View, ScrollView, TouchableOpacity, SafeAreaView, RefreshControl, Alert, Modal } from "react-native"
import { Typography } from "@/components/Typography"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  subject: string
  difficulty: "Easy" | "Medium" | "Hard"
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is the derivative of x² + 3x + 2?",
    options: ["2x + 3", "x² + 3", "2x + 2", "3x + 2"],
    correctAnswer: 0,
    subject: "Mathematics",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "Which of the following is Newton's second law of motion?",
    options: ["F = ma", "E = mc²", "v = u + at", "s = ut + ½at²"],
    correctAnswer: 0,
    subject: "Physics",
    difficulty: "Medium",
  },
  {
    id: 3,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: 2,
    subject: "Geography",
    difficulty: "Easy",
  },
  {
    id: 4,
    question: "Which programming concept allows a function to call itself?",
    options: ["Iteration", "Recursion", "Inheritance", "Polymorphism"],
    correctAnswer: 1,
    subject: "Computer Science",
    difficulty: "Hard",
  },
  {
    id: 5,
    question: "What is the chemical formula for water?",
    options: ["H₂O", "CO₂", "NaCl", "CH₄"],
    correctAnswer: 0,
    subject: "Chemistry",
    difficulty: "Easy",
  },
]

export default function MockTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState(1800) // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitTest = () => {
    setIsSubmitted(true)
    setShowSubmitModal(false)
    Alert.alert(
      "Test Submitted",
      `You answered ${Object.keys(selectedAnswers).length} out of ${mockQuestions.length} questions.`,
      [{ text: "OK" }],
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
    // Reset test
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setTimeRemaining(1800)
    setIsSubmitted(false)
    setTimeout(() => setRefreshing(false), 1000)
  }

  const getAnsweredCount = () => Object.keys(selectedAnswers).length
  const getUnansweredCount = () => mockQuestions.length - getAnsweredCount()

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "Hard":
        return "text-red-600"
      default:
        return "text-[--text-color]"
    }
  }

  if (isSubmitted) {
    return (
      <SafeAreaView className="flex-1 bg-[--background-color]">
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-8 w-full max-w-md">
            <Typography className="text-2xl font-bold text-center text-[--text-color] mb-4">Test Completed!</Typography>
            <Typography className="text-lg text-center text-[--text-color] mb-6">
              Your answers have been submitted successfully.
            </Typography>
            <View className="space-y-2 mb-6">
              <Typography className="text-[--text-color]">
                Questions Answered: {getAnsweredCount()}/{mockQuestions.length}
              </Typography>
              <Typography className="text-[--text-color]">Time Used: {formatTime(1800 - timeRemaining)}</Typography>
            </View>
            <TouchableOpacity onPress={onRefresh} className="bg-[--primary-color] rounded-xl py-3 px-6">
              <Typography className="text-white text-center font-semibold">Take Another Test</Typography>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-[--background-color]">
      <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Header with Timer */}
        <View className="bg-[--card-background-color] border-b border-[--card-border-color] px-6 py-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Typography className="text-xl  mt-8  font-bold text-[--text-color]">Mock Test</Typography>
              <Typography className="text-sm text-[--text-color] opacity-70">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </Typography>
            </View>
            <View className="bg-red-100 rounded-xl px-4 py-2">
              <Typography className="text-red-600 font-bold text-lg">{formatTime(timeRemaining)}</Typography>
            </View>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="px-6 py-4">
          <View className="bg-gray-200 rounded-full h-2 mb-2">
            <View
              className="bg-[--primary-color] h-2 rounded-full"
              style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            />
          </View>
          <View className="flex-row justify-between">
            <Typography className="text-xs text-[--text-color] opacity-70">Answered: {getAnsweredCount()}</Typography>
            <Typography className="text-xs text-[--text-color] opacity-70">
              Remaining: {getUnansweredCount()}
            </Typography>
          </View>
        </View>

        {/* Question Card */}
        <View className="px-6 pb-4">
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-6">
            {/* Question Header */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="bg-blue-100 rounded-lg px-3 py-1">
                <Typography className="text-blue-600 text-sm font-semibold">
                  {mockQuestions[currentQuestion].subject}
                </Typography>
              </View>
              <View
                className={`rounded-lg px-3 py-1 ${
                  mockQuestions[currentQuestion].difficulty === "Easy"
                    ? "bg-green-100"
                    : mockQuestions[currentQuestion].difficulty === "Medium"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                }`}
              >
                <Typography
                  className={`text-sm font-semibold ${getDifficultyColor(mockQuestions[currentQuestion].difficulty)}`}
                >
                  {mockQuestions[currentQuestion].difficulty}
                </Typography>
              </View>
            </View>

            {/* Question Text */}
            <Typography className="text-lg font-semibold text-[--text-color] mb-6 leading-6">
              {mockQuestions[currentQuestion].question}
            </Typography>

            {/* Options */}
            <View className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleAnswerSelect(index)}
                  className={`border-2 rounded-xl p-4 ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-[--primary-color] bg-blue-50"
                      : "border-[--card-border-color] bg-[--card-background-color]"
                  }`}
                >
                  <View className="flex-row items-center">
                    <View
                      className={`w-6 h-6 rounded-full border-2 mr-3 ${
                        selectedAnswers[currentQuestion] === index
                          ? "border-[--primary-color] bg-[--primary-color]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers[currentQuestion] === index && (
                        <View className="w-2 h-2 bg-white rounded-full self-center mt-1" />
                      )}
                    </View>
                    <Typography
                      className={`flex-1 ${
                        selectedAnswers[currentQuestion] === index
                          ? "text-[--primary-color] font-semibold"
                          : "text-[--text-color]"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </Typography>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View className="px-6 pb-6">
          <View className="flex-row justify-between space-x-4">
            <TouchableOpacity
              onPress={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`flex-1 rounded-xl py-3 px-4 border ${
                currentQuestion === 0
                  ? "border-gray-300 bg-gray-100"
                  : "border-[--card-border-color] bg-[--card-background-color]"
              }`}
            >
              <Typography
                className={`text-center font-semibold ${
                  currentQuestion === 0 ? "text-gray-400" : "text-[--text-color]"
                }`}
              >
                Previous
              </Typography>
            </TouchableOpacity>

            {currentQuestion === mockQuestions.length - 1 ? (
              <TouchableOpacity
                onPress={() => setShowSubmitModal(true)}
                className="flex-1 bg-green-600 rounded-xl py-3 px-4"
              >
                <Typography className="text-white text-center font-semibold">Submit Test</Typography>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={handleNextQuestion}
                className="flex-1 bg-[--primary-color] rounded-xl py-3 px-4"
              >
                <Typography className="text-white text-center font-semibold">Next</Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Question Navigator */}
        <View className="px-6 pb-6">
          <View className="bg-[--card-background-color] border border-[--card-border-color] rounded-2xl shadow-md p-4">
            <Typography className="text-lg font-semibold text-[--text-color] mb-3">Question Navigator</Typography>
            <View className="flex-row flex-wrap gap-2">
              {mockQuestions.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-lg justify-center items-center ${
                    index === currentQuestion
                      ? "bg-[--primary-color]"
                      : selectedAnswers[index] !== undefined
                        ? "bg-green-500"
                        : "bg-gray-200"
                  }`}
                >
                  <Typography
                    className={`font-semibold ${
                      index === currentQuestion || selectedAnswers[index] !== undefined ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex-row justify-between mt-3">
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-green-500 rounded mr-2" />
                <Typography className="text-sm text-[--text-color]">Answered</Typography>
              </View>
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-[--primary-color] rounded mr-2" />
                <Typography className="text-sm text-[--text-color]">Current</Typography>
              </View>
              <View className="flex-row items-center">
                <View className="w-4 h-4 bg-gray-200 rounded mr-2" />
                <Typography className="text-sm text-[--text-color]">Not Answered</Typography>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Confirmation Modal */}
      <Modal
        visible={showSubmitModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSubmitModal(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-center items-center px-6">
          <View className="bg-[--card-background-color] rounded-2xl p-6 w-full max-w-sm">
            <Typography className="text-xl font-bold text-[--text-color] mb-4 text-center">Submit Test?</Typography>
            <Typography className="text-[--text-color] mb-6 text-center">
              You have answered {getAnsweredCount()} out of {mockQuestions.length} questions.
              {getUnansweredCount() > 0 && ` ${getUnansweredCount()} questions remain unanswered.`}
            </Typography>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                onPress={() => setShowSubmitModal(false)}
                className="flex-1 border border-[--card-border-color] rounded-xl py-3"
              >
                <Typography className="text-[--text-color] text-center font-semibold">Cancel</Typography>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmitTest} className="flex-1 bg-green-600 rounded-xl py-3">
                <Typography className="text-white text-center font-semibold">Submit</Typography>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
