// ─── FictionOS Server Mock Data ───
// Matches the client mock data until DB is integrated

export const MOCK_NOVELS = [
  {
    id: 'novel-1',
    title: 'The Glass Archive',
    synopsis: 'A precise city mystery about memory, civic records, and the quiet people who keep a city from forgetting itself.',
    status: 'ongoing',
    genre: ['Mystery', 'Literary Fiction'],
    tags: ['civic', 'memory', 'archives', 'slow-burn'],
    authorId: 'user-1',
    authorName: 'Elena Rostova',
    totalViews: 125400,
    totalReads: 42100,
    followersCount: 4500,
    completionRate: 68,
    chapterCount: 24,
    latestChapter: { number: 24, title: 'The Quiet Index', publishedAt: '2026-06-04' },
    createdAt: '2025-01-15',
  },
  {
    id: 'novel-2',
    title: 'Northline Letters',
    status: 'completed',
    genre: ['Literary Fiction', 'Epistolary'],
    authorId: 'user-1',
    authorName: 'Elena Rostova',
  },
  {
    id: 'novel-3',
    title: 'Marrow City',
    status: 'hiatus',
    genre: ['Cyberpunk', 'Horror', 'Sci-Fi'],
    authorId: 'user-2',
    authorName: 'Marcus Vance',
  },
  { id: 'novel-4', title: 'Neon Dust', status: 'ongoing', genre: ['Sci-Fi', 'Thriller'], authorId: 'user-3', authorName: 'Yara Okonkwo' },
  { id: 'novel-5', title: 'Paper Signal', status: 'ongoing', genre: ['Mystery', 'Weird Fiction'], authorId: 'user-4', authorName: 'Dae-Jung Kwon' },
  { id: 'novel-6', title: 'The Orchard Index', status: 'ongoing', genre: ['Literary Fiction', 'Mystery'], authorId: 'user-5', authorName: 'Petra Nylund' },
]

export const MOCK_CHAPTERS = {
  'novel-1': [
    { id: 'ch-1-25', novelId: 'novel-1', number: 25, title: 'South archive scene', status: 'draft' },
    { id: 'ch-1-24', novelId: 'novel-1', number: 24, title: 'The Quiet Index', status: 'published', publishedAt: '2026-06-04' },
    { id: 'ch-1-23', novelId: 'novel-1', number: 23, title: 'A Window in the Stacks', status: 'published', publishedAt: '2026-06-01' },
    { id: 'ch-1-22', novelId: 'novel-1', number: 22, title: 'The Pale Ledger', status: 'published', publishedAt: '2026-05-28' },
  ],
}

export const MOCK_USERS = [
  { id: 'user-1', username: 'elenarostova', displayName: 'Elena Rostova', bio: 'Writer of quiet mysteries.' },
]
