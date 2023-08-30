import axios from 'axios'
import { CommentFormData } from '../types/CommentFormData'
import { Comment } from '../types/Comment'

const baseUrl = 'https://api.realworld.io/api'

// Retrieve a list of comments for selected article
export const fetchComments = async (
  slug: string | undefined
): Promise<Array<Comment>> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.get(`${baseUrl}/articles/${slug}/comments`, {
      headers,
    })

    return res.data.comments
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios fetch comments request error:', error)
      return Promise.reject('Failed to fetch comments for selected article')
    }
    console.error('Fetch comments error:', error)
    return Promise.reject(error)
  }
}

// Add comment to selected article
export const addComment = async (
  slug: string | undefined,
  data: CommentFormData
): Promise<Comment> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    const res = await axios.post(
      `${baseUrl}/articles/${slug}/comments`,
      { comment: data },
      { headers }
    )
    return res.data.comment
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios add comment request error:', error)
      return Promise.reject('Failed to add comment to selected article')
    }
    console.error('Add comment error:', error)
    return Promise.reject(error)
  }
}

// Delete comment from selected article
export const deleteComment = async (
  slug: string | undefined,
  id: number
): Promise<void> => {
  try {
    const token = localStorage.getItem('userToken')
    const authHeader = token?.replace(/^"(.*)"$/, '$1')
    const headers = {
      Authorization: `Token ${authHeader}`,
    }

    await axios.delete(`${baseUrl}/articles/${slug}/comments/${id}`, {
      headers,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios delete comment request error:', error)
      return Promise.reject('Failed to delete comment from selected article')
    }
    console.error('Delete comment error:', error)
    return Promise.reject(error)
  }
}
