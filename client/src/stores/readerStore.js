import { create } from 'zustand'
import { getReaderSize, setReaderSize as saveReaderSize } from '@/lib/theme'

export const useReaderStore = create((set) => ({
  fontSize: getReaderSize(), // 'small' | 'base' | 'large'
  scrollProgress: 0,

  setFontSize: (size) => {
    saveReaderSize(size)
    set({ fontSize: size })
  },

  setScrollProgress: (percent) => set({ scrollProgress: percent }),
}))
