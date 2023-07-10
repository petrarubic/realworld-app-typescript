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
import ArticlePage from './components/ArticlePage'

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
    path: '/articles/:slug',
    element: (
      <>
        <Navbar />
        <ArticlePage />
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
