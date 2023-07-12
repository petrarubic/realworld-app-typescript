import axios from 'axios'
import { RegisterCredentials } from '../types/RegisterCredentials'
import { LoginCredentials } from '../types/LoginCredentials'
import { User } from '../types/User'

const baseUrl = 'https://api.realworld.io/api'

// Register new user
export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const res = await axios.post(`${baseUrl}/users`, { user: credentials })
    const { token }: { token: string } = res.data.user
    return token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios register user request error:', error)
      if (error.response) {
        return Promise.reject(error.response.data.errors)
      } else {
        return Promise.reject(error)
      }
    }
    console.error('Register user error:', error)
    return Promise.reject(error)
  }
}

// Login existing user
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, {
      user: credentials,
    })
    const { token }: { token: string } = res.data.user
    return token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios login user request error:', error)
      if (error.response) {
        return Promise.reject(error.response.data.errors)
      } else {
        return Promise.reject(error)
      }
    }
    console.error('Login user error:', error)
    return Promise.reject(error)
  }
}

// Retrieve currently logged in user
export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.get(`${baseUrl}/user`, {
      headers: {
        Authorization: `Token ${authHeader}`,
      },
    })
    return res.data.user
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch current user request error:', error)
      return Promise.reject('Failed to fetch current user')
    }
    console.error('Fetch current user error:', error)
    return Promise.reject(error)
  }
}
