import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import { QueryClient, QueryClientProvider } from 'react-query'
import ArticleDetailsPage from './components/pages/ArticleDetailsPage'
import ArticleFormPage from './components/pages/ArticleFormPage'
import { Toaster } from '@/components/ui/toaster'
import ErrorPage from './components/pages/ErrorPage'
import MainLayout from './components/layout/MainLayout'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <HomePage />
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
        <ProfilePage />
      </MainLayout>
    ),
  },
  {
    path: '/articles/:slug/edit',
    element: (
      <MainLayout>
        <ArticleFormPage />
      </MainLayout>
    ),
  },
  {
    path: '/articles/new',
    element: (
      <MainLayout>
        <ArticleFormPage />
      </MainLayout>
    ),
  },
  {
    path: '/articles/:slug/details',
    element: (
      <MainLayout>
        <ArticleDetailsPage />
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
