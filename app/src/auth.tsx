import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { User } from './types/User'
import { fetchCurrentUser } from './service/authService'

export const useAuth = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('userToken')

    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return {
    isAuthenticated: !!localStorage.getItem('userToken'),
  }
}

export const useUserData = () => {
  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser()
        setCurrentUser(userData)
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      }
    }

    fetchUserData()
  }, [])

  return currentUser
}
