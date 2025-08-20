import type { User } from "../../types"

export const authAPI = {
  login: async (email: string, password: string, role: string): Promise<{ user: User; token: string }> => {
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      user: {
        id: "1",
        name: "John Doe",
        email,
        role: role as any,
        avatarUrl: "https://via.placeholder.com/150",
      },
      token: "mock-jwt-token",
    }
  },

  register: async (userData: any): Promise<{ user: User; token: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      user: {
        id: Date.now().toString(),
        ...userData,
      },
      token: "mock-jwt-token",
    }
  },

  forgotPassword: async (email: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
  },

  me: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "STUDENT",
      avatarUrl: "https://via.placeholder.com/150",
    }
  },
}
