import axios from 'axios'
import { Article } from '../types/Article'

const baseUrl = 'https://api.realworld.io/api'

// Retrieve a list of recent articles
export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const res = await axios.get(`${baseUrl}/articles`)
    return res.data.articles
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch articles request error:', error)
      return Promise.reject(new Error('Failed to fetch articles'))
    }
    console.error('Fetch articles error:', error)
    return Promise.reject(error)
  }
}
