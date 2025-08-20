export type Role = "STUDENT" | "TEACHER" | "INSTITUTE_ADMIN"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatarUrl?: string
  orgId?: string
  phone?: string
  languages?: string[]
}

export interface Org {
  id: string
  name: string
  logoUrl?: string
  address?: string
  geo?: { lat: number; lng: number }
  description?: string
  staffIds: string[]
}

export interface Course {
  id: string
  code: string
  orgId?: string
  title: string
  subtitle?: string
  description: string
  teacherId: string
  price: number
  isFree: boolean
  rating: number
  ratingCount: number
  thumbnailUrl?: string
  language?: string
  level?: "Beginner" | "Intermediate" | "Advanced"
  categories: string[]
  lessons: Lesson[]
  resources: Resource[]
  published: boolean
}

export type LessonType = "video" | "live" | "text"

export interface Lesson {
  id: string
  courseId: string
  title: string
  type: LessonType
  durationSec?: number
  order: number
  videoUrl?: string
  liveClassId?: string
  textContent?: string
}

export type ResourceType = "pdf" | "link" | "zip" | "ppt"

export interface Resource {
  id: string
  courseId: string
  lessonId?: string
  title: string
  url: string
  type: ResourceType
}

export interface LiveClass {
  id: string
  title: string
  startsAt: string
  endsAt?: string
  courseId?: string
  hostId: string
  roomCode: string
  orgId?: string
}

export interface Review {
  id: string
  courseId: string
  userId: string
  rating: number
  comment?: string
  createdAt: string
}

export interface MockPaper {
  id: string
  title: string
  subject?: string
  durationMin: number
  questions: Question[]
  negativeMarking?: boolean
  shuffle?: boolean
}

export interface Question {
  id: string
  type: "mcq-single"
  text: string
  options: string[]
  answerIndex: number
  marks: number
  explanation?: string
}

export interface MockAttempt {
  id: string
  mockPaperId: string
  userId: string
  startedAt: string
  finishedAt?: string
  answers: Record<string, number | null>
  score?: number
  accuracy?: number
  timePerQuestion?: Record<string, number>
}

export interface Assignment {
  id: string
  courseId: string
  title: string
  dueAt: string
  description?: string
  attachments?: Resource[]
}

export interface Submission {
  id: string
  assignmentId: string
  userId: string
  submittedAt: string
  text?: string
  files?: Resource[]
  grade?: number
  feedback?: string
}

export interface Order {
  id: string
  userId: string
  courseId: string
  price: number
  discount?: number
  status: "paid" | "failed" | "pending"
  createdAt: string
}

export interface Attendance {
  id: string
  classId: string
  userId: string
  joinedAt?: string
  leftAt?: string
  present: boolean
}
