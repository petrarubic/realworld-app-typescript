import axios from 'axios'
import { Article } from '../types/Article'
import { ArticleFormData } from '../types/ArticleFormData'

const baseUrl = 'https://api.realworld.io/api'

// Retrieve a list of recent articles
export const fetchArticles = async (
  limit?: number,
  offset?: number
): Promise<Article[]> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')

    if (limit || offset) {
      const res = await axios.get(
        `${baseUrl}/articles?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Token ${authHeader}`,
          },
        }
      )
      return res.data.articles
    } else {
      const res = await axios.get(`${baseUrl}/articles`, {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      })
      return res.data.articles
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch articles request error:', error)
      return Promise.reject('Failed to fetch articles')
    }
    console.error('Fetch articles error:', error)
    return Promise.reject(error)
  }
}

// Retrieve article count by author
export const fetchArticleCountByAuthor = async (
  author: string
): Promise<number> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')

    const res = await axios.get(`${baseUrl}/articles?author=${author}`, {
      headers: {
        Authorization: `Token ${authHeader}`,
      },
    })
    return res.data.articles.length
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch article count by author request error:', error)
      return Promise.reject('Failed to fetch article count by author')
    }
    console.error('Fetch article count by author error:', error)
    return Promise.reject(error)
  }
}

// Retrieve a list of articles written by followed authors
export const fetchFollowedArticles = async (
  limit: number,
  offset: number
): Promise<Article[]> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.get(
      `${baseUrl}/articles/feed?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      }
    )
    return res.data.articles
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch followed articles request error:', error)
      return Promise.reject('Failed to fetch followed articles')
    }
    console.error('Fetch followed articles error:', error)
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
      return Promise.reject('Failed to fetch an article')
    }
    console.error('Fetch article error:', error)
    return Promise.reject(error)
  }
}

// Create new article
export const createArticle = async (
  data: ArticleFormData
): Promise<Article> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const tagListArray = data.tagList?.toString().trim().split(',')
    const res = await axios.post(
      `${baseUrl}/articles/`,
      {
        article: {
          ...data,
          tagList: tagListArray,
        },
      },
      {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      }
    )
    return res.data.article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios create article request error:', error)
      return Promise.reject('Failed to create a new article')
    }
    console.error('Create article error:', error)
    return Promise.reject(error)
  }
}

// Edit article details
export const editArticle = async (
  slug: string | undefined,
  data: ArticleFormData
): Promise<Article> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const res = await axios.put(
      `${baseUrl}/articles/${slug}`,
      { article: data },
      {
        headers: {
          Authorization: `Token ${authHeader}`,
        },
      }
    )
    return res.data.article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios edit article request error:', error)
      return Promise.reject('Failed to edit current article')
    }
    console.error('Edit article error:', error)
    return Promise.reject(error)
  }
}

// Delete article
export const deleteArticle = async (
  slug: string | undefined
): Promise<void> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    await axios.delete(`${baseUrl}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${authHeader}`,
      },
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios delete article request error:', error)
      return Promise.reject('Failed to delete current article')
    }
    console.error('Delete article error:', error)
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
      return Promise.reject('Failed to add article to favorite articles')
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
      return Promise.reject('Failed to remove article from favorite articles')
    }
    console.error('Remove from favorite articles error:', error)
    return Promise.reject(error)
  }
}
