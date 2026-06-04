import { create } from 'zustand'
import { setTheme as applyTheme, getTheme } from '@/lib/theme'

export const useThemeStore = create((set) => ({
  theme: getTheme(),

  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
}))
