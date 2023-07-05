import axios from 'axios'
import { RegisterCredentials } from '../types/RegisterCredentials'
import { LoginCredentials } from '../types/LoginCredentials'

const baseUrl = 'https://api.realworld.io/api'

// Register new user
export const registerUser = async (credentials: RegisterCredentials) => {
    try {
        const res = await axios.post(`${baseUrl}/users`, { 'user': credentials})
        const { token } = res.data.user
        return token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios register user request error:', error)
            return error
        }
        console.error('Register user error:', error)
        return error
    }
}

// Login existing user
export const loginUser = async (credentials: LoginCredentials) => {
    try {
        const res = await axios.post(`${baseUrl}/users/login`, { 'user': credentials})
        const { token } = res.data.user
        return token
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios login user request error:', error)
            return error
        }
        console.error('Login user error:', error)
        return error
    }
}