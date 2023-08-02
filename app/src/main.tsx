import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import { QueryClient, QueryClientProvider } from 'react-query'
import ArticleDetailsPage from './components/pages/ArticleDetailsPage'
import ArticleFormPage from './components/pages/ArticleFormPage'
import { Toaster } from '@/components/ui/toaster'
import ErrorPage from './components/pages/ErrorPage'
import MainLayout from './components/layout/MainLayout'
import ArticlesRecentPage from './components/pages/ArticlesRecentPage'
import ArticlesFollowingPage from './components/pages/ArticlesFollowingPage'
import PrivateRoute from './components/auth/PrivateRoute'
import HomePage from './components/pages/HomePage'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/articles/recent',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ArticlesRecentPage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/articles/following',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ArticlesFollowingPage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/articles/:slug/edit',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ArticleFormPage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/articles/new',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ArticleFormPage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '/articles/:slug/details',
    element: (
      <MainLayout>
        <PrivateRoute>
          <ArticleDetailsPage />
        </PrivateRoute>
      </MainLayout>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
)
