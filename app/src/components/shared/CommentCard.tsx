import { deleteComment } from '../../service/commentService'
import { Comment } from '../../types/Comment'
import { formatDateString } from '../../utils/utils'
import { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useUserData } from '@/auth'

function CommentCard({
  comment,
  slug,
}: {
  comment: Comment
  slug: string | undefined
}) {
  const currentUser = useUserData()
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
        if (
          currentUser &&
          comment.author.username &&
          currentUser.username === comment.author.username
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
  }, [comment.author.username, currentUser])

  return (
    <div className='border-b border-b-gray-200 p-5'>
      <div className='flex justify-between items-center pb-5'>
        <p className='flex space-x-8 items-center text-sm'>
          <span className='flex space-x-2 items-center'>
            <Avatar className='w-8 h-8'>
              <AvatarImage
                src={
                  comment.author.image &&
                  comment.author.image !==
                    'https://api.realworld.io/images/demo-avatar.png'
                    ? comment.author.image
                    : `https://i.pravatar.cc/300?u=${comment.author.username}`
                }
                alt='Profile image'
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <span>{comment.author.username}</span>
          </span>
          <span className='text-gray-500'>
            {formatDateString(comment.createdAt)}
          </span>
        </p>
        {showDeleteButton && (
          <TooltipProvider>
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger>
                    <Button variant='ghost' size='icon'>
                      <TrashIcon className='w-6 h-6 text-indigo-600 hover:text-indigo-950' />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      selected comment.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className='bg-indigo-600 hover:bg-indigo-900'
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
                <TooltipContent>Delete comment</TooltipContent>
              </Tooltip>
            </AlertDialog>
          </TooltipProvider>
        )}
      </div>
      <p className='text-gray-600'>{comment.body}</p>
    </div>
  )
}

export default CommentCard
