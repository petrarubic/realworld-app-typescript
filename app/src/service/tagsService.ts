import { Article } from '@/types/Article'
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

// Retrieve the list of common tags from favorite articles
export const fetchFavoriteTags = async (
  currentUser: string | undefined
): Promise<string[]> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')

    const tagFrequencyMap: { [tag: string]: number } = {}

    let currentPage = 1
    let hasNextPage = true

    while (hasNextPage) {
      const res = await axios.get(
        `${baseUrl}/articles?favorited=${currentUser}`,
        {
          params: {
            limit: 20,
            offset: (currentPage - 1) * 20,
          },
          headers: {
            Authorization: `Token ${authHeader}`,
          },
        }
      )

      if (res.data.articles.length === 0) {
        hasNextPage = false
      } else {
        res.data.articles.forEach((article: Article) => {
          article.tagList.forEach((tag: string) => {
            tagFrequencyMap[tag] = (tagFrequencyMap[tag] || 0) + 1
          })
        })
        currentPage++
      }
    }

    const favoriteTags = Object.keys(tagFrequencyMap).filter(
      (tag) => tagFrequencyMap[tag] > 1
    )

    return favoriteTags
  } catch (error) {
    console.error('Fetch favorite tags error:', error)
    return []
  }
}
