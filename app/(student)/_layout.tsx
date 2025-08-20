import { Stack, Redirect } from "expo-router"
import { useAuthStore } from "../../lib/stores/auth"

export default function StudentLayout() {
  const { user } = useAuthStore()

  if (!user || user.role !== "STUDENT") {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="course/[courseCode]" />
      <Stack.Screen name="play/[lessonId]" />
      <Stack.Screen name="class-room/[classId]" />
      <Stack.Screen name="mock/index" />
      <Stack.Screen name="mock/attempt/[mockPaperId]" />
      <Stack.Screen name="mock/score/[mockAttemptId]" />
      <Stack.Screen name="prev-papers/index" />
      <Stack.Screen name="assignments/index" />
      <Stack.Screen name="notes/index" />
      <Stack.Screen name="certificates/index" />
      <Stack.Screen name="downloads/index" />
    </Stack>
  )
}
