import axios from 'axios'

const baseUrl = 'https://api.realworld.io/api'

export const fetchTags = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tags`)
    return res.data.tags
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch tags request error:', error)
      if (error.response) {
        return Promise.reject(error.response.data.errors)
      } else {
        return Promise.reject(error)
      }
    }
    console.error('Fetch tags error:', error)
    return Promise.reject(error)
  }
}
