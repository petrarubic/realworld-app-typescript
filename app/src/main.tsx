import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/HomePage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import ProfilePage from './components/ProfilePage'
import Navbar from './components/Navbar'
import { QueryClient, QueryClientProvider } from 'react-query'
import ArticleDetailsPage from './components/ArticleDetailsPage'
import ArticleFormPage from './components/ArticleFormPage'

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
    </QueryClientProvider>
  </React.StrictMode>
)
