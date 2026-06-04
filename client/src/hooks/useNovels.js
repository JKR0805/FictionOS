import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { novelsApi, chaptersApi } from '@/services/api'
import { MOCK_VERSION_HISTORY } from '@/data/mockData' // We can leave version history mocked if we didn't implement it yet

/** Fetch all novels (discover / author dashboard) */
export function useNovels(filters = {}) {
  return useQuery({
    queryKey: ['novels', filters],
    queryFn: async () => {
      const res = await novelsApi.list(filters)
      return res.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

/** Fetch followed novels */
export function useFollowing() {
  return useQuery({
    queryKey: ['novels', 'following'],
    queryFn: async () => {
      const res = await novelsApi.following()
      return res.data
    },
  })
}

/** Fetch author's novels */
export function useAuthorNovels(authorId) {
  return useQuery({
    queryKey: ['novels', 'author', authorId],
    queryFn: async () => {
      // Pass authorId as a filter to the API
      const res = await novelsApi.list({ authorId })
      return res.data
    },
    enabled: !!authorId,
  })
}

/** Fetch single novel by id */
export function useNovel(novelId) {
  return useQuery({
    queryKey: ['novel', novelId],
    queryFn: async () => {
      const res = await novelsApi.get(novelId)
      return res.data
    },
    enabled: !!novelId,
  })
}

/** Fetch chapters for a novel */
export function useChapters(novelId) {
  return useQuery({
    queryKey: ['chapters', novelId],
    queryFn: async () => {
      const res = await chaptersApi.list(novelId)
      return res.data
    },
    enabled: !!novelId,
  })
}

/** Fetch a single chapter */
export function useChapter(chapterId) {
  return useQuery({
    queryKey: ['chapter', chapterId],
    queryFn: async () => {
      const res = await chaptersApi.get(chapterId)
      return res.data
    },
    enabled: !!chapterId,
  })
}

/** Fetch version history for a novel */
export function useVersionHistory(novelId) {
  return useQuery({
    queryKey: ['version-history', novelId],
    queryFn: async () => {
      // Version history is not yet fully implemented in DB, keeping mock for now.
      await new Promise((r) => setTimeout(r, 200))
      return MOCK_VERSION_HISTORY
    },
    enabled: !!novelId,
  })
}

/** Create a new novel */
export function useCreateNovel() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (novelData) => {
      const res = await novelsApi.create(novelData)
      return res.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['novels', 'author', variables.authorId] })
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}

/** Create a new chapter */
export function useCreateChapter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ novelId, chapterData }) => {
      const res = await chaptersApi.create(novelId, chapterData)
      return res.data
    },
    onSuccess: (data, { novelId }) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', novelId] })
    },
  })
}

/** Update a chapter */
export function useUpdateChapter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ chapterId, chapterData }) => {
      const res = await chaptersApi.update(chapterId, chapterData)
      return res.data
    },
    onSuccess: (data, { chapterId }) => {
      queryClient.invalidateQueries({ queryKey: ['chapter', chapterId] })
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    },
  })
}

/** Publish/Unpublish chapter */
export function usePublishChapter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ chapterId, action }) => {
      // update status to 'published' or 'draft'
      const res = await chaptersApi.update(chapterId, { status: action === 'publish' ? 'published' : 'draft' })
      return res.data
    },
    onSuccess: (data, { chapterId }) => {
      queryClient.invalidateQueries({ queryKey: ['chapter', chapterId] })
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    },
  })
}

/** Delete a chapter */
export function useDeleteChapter() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (chapterId) => {
      const res = await chaptersApi.delete(chapterId)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    },
  })
}

/** Reorder chapters */
export function useReorderChapters() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ novelId, chapterIds }) => {
      const res = await novelsApi.reorderChapters(novelId, chapterIds)
      return res.data
    },
    onSuccess: (data, { novelId }) => {
      queryClient.invalidateQueries({ queryKey: ['chapters', novelId] })
    },
  })
}

/** Toggle follow novel */
export function useToggleFollow() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (novelId) => {
      const res = await novelsApi.follow(novelId)
      return res.data
    },
    onSuccess: (data, novelId) => {
      queryClient.invalidateQueries({ queryKey: ['novel', novelId] })
    },
  })
}

/** Mark chapter as read */
export function useMarkAsRead() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ novelId, chapterId }) => {
      const res = await novelsApi.markAsRead(novelId, chapterId)
      return res.data
    },
    onSuccess: (data, { novelId }) => {
      queryClient.invalidateQueries({ queryKey: ['novels', 'following'] })
      queryClient.invalidateQueries({ queryKey: ['novel', novelId] })
    },
  })
}

/** Update novel details */
export function useUpdateNovelDetails() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ novelId, data }) => {
      const res = await novelsApi.updateNovel(novelId, data)
      return res.data
    },
    onSuccess: (data, { novelId }) => {
      queryClient.invalidateQueries({ queryKey: ['novel', novelId] })
      queryClient.invalidateQueries({ queryKey: ['novels'] })
    },
  })
}
