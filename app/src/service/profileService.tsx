import axios from 'axios'
import { User } from '../types/User'
import { ProfileFormData } from '../types/ProfileFormData'

const baseUrl = 'https://api.realworld.io/api'

// Edit profile settings
export const editProfile = async (data: ProfileFormData): Promise<User> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.put(
      `${baseUrl}/user`,
      { user: data },
      {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      }
    )
    return res.data.user
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios edit current user request error:', error)
      return Promise.reject('Failed to edit current user')
    }
    console.error('Edit current user error:', error)
    return Promise.reject(error)
  }
}
