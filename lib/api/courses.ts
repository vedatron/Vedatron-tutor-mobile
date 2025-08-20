import type { Course, Review } from "../../types"

const mockCourses: Course[] = [
  {
    id: "1",
    code: "MATH101",
    title: "Advanced Mathematics",
    subtitle: "Master calculus and algebra",
    description: "Comprehensive mathematics course covering advanced topics",
    teacherId: "1",
    price: 2999,
    isFree: false,
    rating: 4.8,
    ratingCount: 156,
    thumbnailUrl: "https://via.placeholder.com/300x200",
    language: "English",
    level: "Advanced",
    categories: ["Mathematics", "Science"],
    lessons: [],
    resources: [],
    published: true,
  },
  {
    id: "2",
    code: "PHY101",
    title: "Physics Fundamentals",
    subtitle: "Understanding the laws of physics",
    description: "Complete physics course for beginners",
    teacherId: "2",
    price: 0,
    isFree: true,
    rating: 4.6,
    ratingCount: 89,
    thumbnailUrl: "https://via.placeholder.com/300x200",
    language: "English",
    level: "Beginner",
    categories: ["Physics", "Science"],
    lessons: [],
    resources: [],
    published: true,
  },
]

export const coursesAPI = {
  list: async (filters?: any): Promise<Course[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCourses
  },

  get: async (id: string): Promise<Course> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCourses.find((c) => c.id === id) || mockCourses[0]
  },

  enroll: async (courseId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },

  getReviews: async (courseId: string): Promise<Review[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        id: "1",
        courseId,
        userId: "1",
        rating: 5,
        comment: "Excellent course!",
        createdAt: new Date().toISOString(),
      },
    ]
  },

  search: async (query: string): Promise<Course[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase()),
    )
  },
}
