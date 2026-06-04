import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { applySavedTheme } from '@/lib/theme'
import { onAuthStateChanged } from '@/services/auth'
import { usersApi } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function AuthWatcher() {
  const { setUser, clearUser } = useAuthStore()

  useEffect(() => {
    applySavedTheme()
    const unsub = onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await usersApi.me()
          setUser({ ...firebaseUser, ...res.data }) // merges DB id with firebaseUser
        } catch (err) {
          console.error('Failed to fetch DB user profile:', err)
          setUser(firebaseUser)
        }
      } else {
        clearUser()
      }
    })
    return unsub
  }, [setUser, clearUser])

  return null
}

export function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWatcher />
      <Outlet />
    </QueryClientProvider>
  )
}
