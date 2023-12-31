import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Article } from '../../types/Article'
import { fetchArticle } from '../../service/articleService'
import Spinner from '../shared/Spinner'
import { formatDateString } from '../../utils/utils'
import { followUser, unfollowUser } from '../../service/profileService'
import { useEffect, useState } from 'react'
import ArticleCommentSection from '../shared/ArticleCommentSection'
import { UserPlusIcon, UserMinusIcon } from '@heroicons/react/24/outline'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserData } from '@/auth'

function ArticleDetailsPage() {
  const { slug } = useParams()
  const currentUser = useUserData()
  const [showFollowButton, setShowFollowButton] = useState(false)

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
  })

  const [isAuthorFollowed, setIsAuthorFollowed] = useState(
    data?.author.following
  )

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (
          currentUser &&
          data?.author.username &&
          currentUser.username === data?.author.username
        ) {
          setShowFollowButton(false)
        } else {
          setShowFollowButton(true)
        }
      } catch (error) {
        console.error('Failed to fetch current user and author data:', error)
      }
    }

    fetchUserData()
    setIsAuthorFollowed(data?.author.following)
  }, [currentUser, data?.author])

  if (isLoading || !currentUser) {
    return (
      <div className='flex justify-center items-center bg-gray-100 h-full'>
        <Spinner
          fillBackground='fill-indigo-200'
          fillForeground='fill-indigo-600'
          dimensions='w-12 h-12'
        />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex justify-center items-center bg-gray-100 h-full text-lg font-bold'>
        {error.message}
      </div>
    )
  }

  if (data) {
    const formattedBody = data.body.replace(/\\n/g, ' ')

    const handleFollowUser = async () => {
      try {
        setIsAuthorFollowed(true)
        await followUser(data.author)
      } catch (error) {
        console.error('Error with following the selected article author', error)
      }
    }

    const handleUnfollowUser = async () => {
      try {
        setIsAuthorFollowed(false)
        await unfollowUser(data.author)
      } catch (error) {
        console.error(
          'Error with unfollowing the selected article author',
          error
        )
      }
    }

    return (
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full px-8 md:px-32 xl:px-96 py-10'>
          <div className='flex flex-row space-x-4 items-start'>
            <Avatar className='w-14 h-14'>
              <AvatarImage
                src={
                  data.author.image &&
                  data.author.image !==
                    'https://api.realworld.io/images/demo-avatar.png'
                    ? data.author.image
                    : `https://i.pravatar.cc/300?u=${data.author.username}`
                }
                alt='Profile image'
              />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>

            <div className='pb-5'>
              <p className='text-xl flex items-start space-x-1'>
                <span className={`font-bold ${!showFollowButton && 'pb-4'}`}>
                  {data.author.username}
                </span>
                {showFollowButton && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => {
                            !isAuthorFollowed
                              ? handleFollowUser()
                              : handleUnfollowUser()
                          }}
                        >
                          {!isAuthorFollowed ? (
                            <UserPlusIcon className='w-6 h-6 text-indigo-600 hover:text-indigo-950' />
                          ) : (
                            <UserMinusIcon className='w-6 h-6 text-indigo-600 hover:text-indigo-950' />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {!isAuthorFollowed ? 'Follow User' : 'Unfollow User'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </p>
              <p className='text-gray-500 -mt-2'>
                {formatDateString(data.createdAt)}
              </p>
            </div>
          </div>
          <p className='font-extrabold text-4xl mb-5'>{data.title}</p>
          <p className='text-xl text-gray-700 mb-5'>{data.description}</p>
          <p className='whitespace-pre-line'>{formattedBody}</p>
          <ArticleCommentSection />
        </div>
      </div>
    )
  } else {
    return <div>No article data available</div>
  }
}

export default ArticleDetailsPage
