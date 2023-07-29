import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import Navbar from './components/shared/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import ArticleDetailsPage from './components/pages/ArticleDetailsPage'
import ArticleFormPage from './components/pages/ArticleFormPage'
import { Toaster } from '@/components/ui/toaster'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <HomePage />
      </>
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
      <>
        <Navbar />
        <ProfilePage />
      </>
    ),
  },
  {
    path: '/articles/:slug/edit',
    element: (
      <>
        <Navbar />
        <ArticleFormPage />
      </>
    ),
  },
  {
    path: '/articles/new',
    element: (
      <>
        <Navbar />
        <ArticleFormPage />
      </>
    ),
  },
  {
    path: '/articles/:slug/details',
    element: (
      <>
        <Navbar />
        <ArticleDetailsPage />
      </>
    ),
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
