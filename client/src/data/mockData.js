// ─── FictionOS Mock Data ───
// This file only contains constants that are not yet backed by the database.

export const MOCK_VERSION_HISTORY = [
  {
    id: 'v-1',
    commitMessage: 'chore: schedule chapter 24',
    description: 'Updated release date and fixed minor typos in paragraph 3.',
    author: 'Elena Rostova',
    createdAt: '2026-06-04T09:41:00Z',
  },
  {
    id: 'v-2',
    commitMessage: 'fix: continuity error regarding ledger color',
    description: 'Changed ledger description in Chapter 22 to match Chapter 4 reference.',
    author: 'Elena Rostova',
    createdAt: '2026-06-03T14:22:00Z',
  },
  {
    id: 'v-3',
    commitMessage: 'feat: publish chapter 23',
    description: 'Initial publication of Chapter 23.',
    author: 'Elena Rostova',
    createdAt: '2026-06-01T10:00:00Z',
  },
]

export const DISCOVER_GENRES = [
  'All',
  'Fantasy',
  'Sci-Fi',
  'Mystery',
  'Romance',
  'Horror',
  'Literary Fiction',
  'Thriller',
  'Cyberpunk',
  'Historical',
]

export const MOCK_STATS = {
  platformNovels: 12000,
  chaptersRead: 1200000,
  activeReaders: 45000,
  activeAuthors: 3200,
}
