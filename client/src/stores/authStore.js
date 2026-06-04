import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}))
