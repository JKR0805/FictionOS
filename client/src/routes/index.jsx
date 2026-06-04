/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from 'react-router-dom'

// Layouts
import { RootLayout } from '@/layouts/RootLayout'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ReaderLayout } from '@/layouts/ReaderLayout'
import { AuthorLayout } from '@/layouts/AuthorLayout'
import { NovelWorkspaceLayout } from '@/layouts/NovelWorkspaceLayout'

// Auth guard
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Public pages
import LandingPage from '@/pages/public/LandingPage'
import LoginPage from '@/pages/public/LoginPage'
import SignupPage from '@/pages/public/SignupPage'
import ForgotPasswordPage from '@/pages/public/ForgotPasswordPage'
import VerifyEmailPage from '@/pages/public/VerifyEmailPage'

// Reader pages
import ReaderHomePage from '@/pages/reader/ReaderHomePage'
import DiscoverPage from '@/pages/reader/DiscoverPage'
import NovelDetailPage from '@/pages/reader/NovelDetailPage'
import ReadingPage from '@/pages/reader/ReadingPage'
import ProfilePage from '@/pages/shared/ProfilePage'
import SettingsPage from '@/pages/shared/SettingsPage'

// Author pages
import AuthorDashboardPage from '@/pages/author/AuthorDashboardPage'
import NovelOverviewPage from '@/pages/author/NovelOverviewPage'
import NovelChaptersPage from '@/pages/author/NovelChaptersPage'
import VersionHistoryPage from '@/pages/author/VersionHistoryPage'
import NovelSettingsPage from '@/pages/author/NovelSettingsPage'
import ChapterEditorPage from '@/pages/author/ChapterEditorPage'
import {
  CharacterIntelligencePage,
  RelationshipGraphPage,
  TimelinePage,
  CodexPage,
  ConsistencyPage,
} from '@/pages/author/AIPlaceholderPages'

// 404
function NotFoundPage() {
  return (
    <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
      <div>
        <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>404</p>
        <h1 style={{ fontSize: 'var(--text-2xl)' }}>Page not found</h1>
        <p className="body-sm meta" style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
          The page you're looking for doesn't exist.
        </p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // ─── Public routes ───
      {
        element: <PublicLayout />,
        children: [
          { path: '/', element: <LandingPage /> },
          { path: '/login', element: <LoginPage /> },
          { path: '/signup', element: <SignupPage /> },
          { path: '/forgot-password', element: <ForgotPasswordPage /> },
          { path: '/verify-email', element: <VerifyEmailPage /> },
        ],
      },

      // ─── Protected: Reader ───
      {
        element: <ProtectedRoute><ReaderLayout /></ProtectedRoute>,
        children: [
          { path: '/reader', element: <ReaderHomePage /> },
          { path: '/reader/discover', element: <DiscoverPage /> },
          { path: '/reader/novel/:id', element: <NovelDetailPage /> },
          { path: '/reader/chapter/:id', element: <ReadingPage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },

      // ─── Protected: Author Dashboard (no sidebar) ───
      {
        element: <ProtectedRoute><AuthorLayout /></ProtectedRoute>,
        children: [
          { path: '/author', element: <AuthorDashboardPage /> },
        ],
      },

      // ─── Protected: Novel Workspace (with sidebar) ───
      {
        element: <ProtectedRoute><NovelWorkspaceLayout /></ProtectedRoute>,
        children: [
          {
            path: '/author/novel/:novelId',
            element: <Navigate to="overview" replace />,
          },
          { path: '/author/novel/:novelId/overview', element: <NovelOverviewPage /> },
          { path: '/author/novel/:novelId/chapters', element: <NovelChaptersPage /> },
          { path: '/author/novel/:novelId/version-history', element: <VersionHistoryPage /> },
          { path: '/author/novel/:novelId/character-intelligence', element: <CharacterIntelligencePage /> },
          { path: '/author/novel/:novelId/relationship-graph', element: <RelationshipGraphPage /> },
          { path: '/author/novel/:novelId/timeline', element: <TimelinePage /> },
          { path: '/author/novel/:novelId/codex', element: <CodexPage /> },
          { path: '/author/novel/:novelId/consistency', element: <ConsistencyPage /> },
          { path: '/author/novel/:novelId/settings', element: <NovelSettingsPage /> },
          { path: '/author/novel/:novelId/chapter/:chapterId/edit', element: <ChapterEditorPage /> },
        ],
      },

      // ─── 404 ───
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
