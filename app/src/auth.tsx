import { useEffect } from 'react'
import { useNavigate } from 'react-router'

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
