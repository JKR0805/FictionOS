import axios from 'axios'
import { auth } from '@/lib/firebase'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach Firebase token to every request
api.interceptors.request.use(async (config) => {
  try {
    const user = auth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {
    // no user — send unauthenticated request
  }
  return config
})

// ─── Novel endpoints ───
export const novelsApi = {
  list: (params) => api.get('/novels', { params }),
  get: (id) => api.get(`/novels/${id}`),
  following: () => api.get('/novels/following'),
  create: (data) => api.post('/novels', data),
  update: (id, data) => api.patch(`/novels/${id}`, data),
  delete: (id) => api.delete(`/novels/${id}`),
  follow: (id) => api.post(`/novels/${id}/follow`),
  markAsRead: (id, chapterId) => api.post(`/novels/${id}/read`, { chapterId }),
  reorderChapters: (id, chapterIds) => api.patch(`/novels/${id}/chapters/reorder`, { chapterIds }),
  updateNovel: async (id, data) => {
    const res = await api.patch(`/novels/${id}`, data)
    return res.data
  },
}

// ─── Chapter endpoints ───
export const chaptersApi = {
  list: (novelId) => api.get(`/novels/${novelId}/chapters`),
  get: (id) => api.get(`/chapters/${id}`),
  create: (novelId, data) => api.post(`/novels/${novelId}/chapters`, data),
  update: (id, data) => api.patch(`/chapters/${id}`, data),
  publish: (id) => api.post(`/chapters/${id}/publish`),
  delete: (id) => api.delete(`/chapters/${id}`),
}

// ─── User / profile endpoints ───
export const usersApi = {
  me: () => api.get('/users/me'),
  update: (data) => api.patch('/users/me', data),
  profile: (username) => api.get(`/users/${username}`),
}
