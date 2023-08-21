import { useEffect, useState } from 'react'
import { CommentFormData } from '../../types/CommentFormData'
import CommentForm from '../forms/CommentForm'
import {
  addComment,
  deleteComment,
  fetchComments,
} from '../../service/commentService'
import { useQuery } from 'react-query'
import { Comment } from '../../types/Comment'
import CommentCard from './CommentCard'
import { useParams } from 'react-router'

function ArticleCommentSection() {
  const { slug } = useParams()
  const [errorMessage, setErrorMessage] = useState('')
  const [isCommentAdded, setIsCommentAdded] = useState(false)

  const handleAddComment = (data: CommentFormData) => {
    addComment(slug, data)
      .then(() => {
        setIsCommentAdded(true)
      })
      .catch((error) => {
        setErrorMessage(error)
      })
  }

  const { data, refetch } = useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: () => fetchComments(slug),
  })

  const handleDeleteComment = (commentId: number) => {
    deleteComment(slug, commentId)
      .then(() => {
        refetch()
      })
      .catch((error) => {
        console.error('Error deleting comment:', error)
      })
  }

  useEffect(() => {
    if (isCommentAdded) {
      refetch()
      setIsCommentAdded(false)
    }
  }, [isCommentAdded, refetch])

  return (
    <div className='self-start mt-10'>
      <h2 className='font-semibold text-2xl mb-10'>Discussion</h2>
      <CommentForm onSubmit={handleAddComment} />
      <br />
      {!isCommentAdded && errorMessage && (
        <p className='font-bold'>{errorMessage}</p>
      )}
      <br />
      <div className='flex flex-col space-y-4 mt-10'>
        {data?.map((comment) => (
          <CommentCard
            comment={comment}
            key={comment.id}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  )
}

export default ArticleCommentSection
