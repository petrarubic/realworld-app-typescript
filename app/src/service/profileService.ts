import axios from 'axios'
import { User } from '../types/User'
import { ProfileFormData } from '../types/ProfileFormData'
import { Author } from '../types/Author'

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

// Follow selected user
export const followUser = async (author: Author): Promise<Author> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.post(
      `${baseUrl}/profiles/${author.username}/follow`,
      {},
      { headers }
    )
    return res.data.profile
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios follow user request error:', error)
      return Promise.reject('Failed to follow the user')
    }
    console.error('Follow the user error:', error)
    return Promise.reject(error)
  }
}

// Unfollow selected user
export const unfollowUser = async (author: Author): Promise<Author> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.delete(
      `${baseUrl}/profiles/${author.username}/follow`,
      { headers }
    )
    return res.data.profile
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios unfollow user request error:', error)
      return Promise.reject('Failed to unfollow the user')
    }
    console.error('Unfollow the user error:', error)
    return Promise.reject(error)
  }
}
