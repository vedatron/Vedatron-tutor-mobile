import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"
import type { User } from "../../types"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string, role: string) => Promise<void>
  logout: () => Promise<void>
  register: (userData: any) => Promise<void>
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email: string, password: string, role: string) => {
        set({ isLoading: true })
        try {
          // Mock API call
          const mockUser: User = {
            id: "1",
            name: "John Doe",
            email,
            role: role as any,
            avatarUrl: "https://via.placeholder.com/150",
          }
          const mockToken = "mock-jwt-token"

          await SecureStore.setItemAsync("auth-token", mockToken)
          set({ user: mockUser, token: mockToken, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        await SecureStore.deleteItemAsync("auth-token")
        set({ user: null, token: null })
      },

      register: async (userData: any) => {
        set({ isLoading: true })
        try {
          // Mock registration
          const mockUser: User = {
            id: Date.now().toString(),
            ...userData,
          }
          const mockToken = "mock-jwt-token"

          await SecureStore.setItemAsync("auth-token", mockToken)
          set({ user: mockUser, token: mockToken, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      setUser: (user: User) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
)
