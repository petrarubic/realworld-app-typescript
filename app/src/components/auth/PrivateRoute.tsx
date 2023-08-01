import { useAuth } from '@/auth'
import { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return children
}

export default PrivateRoute
