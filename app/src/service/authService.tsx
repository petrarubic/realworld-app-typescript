import axios from 'axios'
import { RegisterCredentials } from '../types/RegisterCredentials'

const baseUrl = 'https://api.realworld.io/api'

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