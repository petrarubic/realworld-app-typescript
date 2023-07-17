import { Tooltip } from 'react-tooltip'
import { TrashIcon } from '../icons'
import { deleteComment } from '../service/commentService'
import { Comment } from '../types/Comment'
import { formatDateString } from '../utils/utils'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from '../service/authService'

function CommentCard({
  comment,
  slug,
}: {
  comment: Comment
  slug: string | undefined
}) {
  const [showDeleteButton, setShowDeleteButton] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteComment(slug, comment.id)
      window.location.reload()
    } catch (error) {
      console.error('Error with deleting selected comment', error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser()
        if (
          userData &&
          comment.author.username &&
          userData.username === comment.author.username
        ) {
          setShowDeleteButton(true)
        } else {
          setShowDeleteButton(false)
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      }
    }

    fetchUserData()
  }, [comment.author.username])

  return (
    <div className='border-b border-b-gray-200 p-5'>
      <Tooltip
        id='delete-tooltip'
        style={{
          padding: '4px',
          fontSize: '10px',
          backgroundColor: '#9ca3af',
        }}
      />
      <div className='flex justify-between items-center pb-5'>
        <p className='flex space-x-8 items-center text-sm'>
          <span className='flex space-x-2 items-center'>
            <img
              src={comment.author.image ? comment.author.image : ''}
              alt='Profile image'
              className='rounded-full w-8 h-8'
            />
            <span>{comment.author.username}</span>
          </span>
          <span className='text-gray-500'>
            {formatDateString(comment.createdAt)}
          </span>
        </p>
        {showDeleteButton && (
          <button
            onClick={handleDelete}
            data-tooltip-id='delete-tooltip'
            data-tooltip-content='Delete'
            className='bg-gray-100 p-1 rounded-md'
          >
            <TrashIcon strokeColor='#000000' width={5} height={5} />
          </button>
        )}
      </div>
      <p className='text-gray-600'>{comment.body}</p>
    </div>
  )
}

export default CommentCard
