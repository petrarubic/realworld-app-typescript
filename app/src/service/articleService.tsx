import axios from 'axios'
import { Article } from '../types/Article'

const baseUrl = 'https://api.realworld.io/api'

// Retrieve a list of recent articles
export const fetchArticles = async (
  limit: number,
  offset: number
): Promise<Article[]> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.get(
      `${baseUrl}/articles?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      }
    )
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

// Retrieve single article details
export const fetchArticle = async (
  slug: string | undefined
): Promise<Article> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.get(`${baseUrl}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${authHeader}`,
      },
    })
    return res.data.article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch article request error:', error)
      return Promise.reject(new Error('Failed to fetch article'))
    }
    console.error('Fetch article error:', error)
    return Promise.reject(error)
  }
}

// Add selected article to the list of favorite articles
export const addToFavoriteArticles = async (
  slug: string | undefined
): Promise<Article> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.post(
      `${baseUrl}/articles/${slug}/favorite`,
      {},
      { headers }
    )
    return res.data.article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios add to favorite articles request error:', error)
      return Promise.reject(
        new Error('Failed to add article to favorite articles')
      )
    }
    console.error('Add to favorite articles error:', error)
    return Promise.reject(error)
  }
}

// Remove selected article from the list of favorite articles
export const removeFromFavoriteArticles = async (
  slug: string | undefined
): Promise<Article> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.delete(`${baseUrl}/articles/${slug}/favorite`, {
      headers,
    })
    return res.data.article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios remove from favorite articles request error:', error)
      return Promise.reject(
        new Error('Failed to remove article from favorite articles')
      )
    }
    console.error('Remove from favorite articles error:', error)
    return Promise.reject(error)
  }
}
