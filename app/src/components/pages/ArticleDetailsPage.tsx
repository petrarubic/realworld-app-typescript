import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Article } from '../../types/Article'
import { fetchArticle } from '../../service/articleService'
import Spinner from '../Spinner'
import { formatDateString } from '../../utils/utils'
import { followUser, unfollowUser } from '../../service/profileService'
import { UserMinusIcon, UserPlusIcon } from '../../icons'
import { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import { fetchCurrentUser } from '../../service/authService'

function ArticleDetailsPage() {
  const { slug } = useParams()
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
        const userData = await fetchCurrentUser()
        if (
          userData &&
          data?.author.username &&
          userData.username === data?.author.username
        ) {
          setShowFollowButton(false)
        } else {
          setShowFollowButton(true)
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      }
    }

    fetchUserData()
    setIsAuthorFollowed(data?.author.following)
  }, [data?.author])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center bg-gray-100 h-full'>
        <Spinner />
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
        const updatedAuthor = await followUser(data.author)
        setIsAuthorFollowed(updatedAuthor.following)
      } catch (error) {
        console.error('Error with following the selected article author', error)
      }
    }

    const handleUnfollowUser = async () => {
      try {
        const updatedAuthor = await unfollowUser(data.author)
        setIsAuthorFollowed(updatedAuthor.following)
      } catch (error) {
        console.error(
          'Error with unfollowing the selected article author',
          error
        )
      }
    }

    return (
      <div className='flex justify-center items-center'>
        <div className='w-full px-8 md:px-32 xl:px-96 py-10'>
          <Tooltip
            id='follow-tooltip'
            style={{
              padding: '4px',
              fontSize: '10px',
            }}
          />
          <div className='flex flex-row space-x-4'>
            <img
              src={data.author.image ? data.author.image : ''}
              alt='Profile image'
              className='rounded-full w-14 h-14'
            />
            <div className='pb-5'>
              <p className='font-bold text-xl flex items-center space-x-1'>
                <span>{data.author.username}</span>
                {showFollowButton && (
                  <button
                    data-tooltip-id='follow-tooltip'
                    data-tooltip-content={
                      !isAuthorFollowed ? 'Follow User' : 'Unfollow User'
                    }
                    onClick={() => {
                      !isAuthorFollowed
                        ? handleFollowUser()
                        : handleUnfollowUser()
                    }}
                  >
                    {!isAuthorFollowed ? <UserPlusIcon /> : <UserMinusIcon />}
                  </button>
                )}
              </p>
              <p className='text-gray-500'>
                {formatDateString(data.createdAt)}
              </p>
            </div>
          </div>
          <p className='font-extrabold text-4xl mb-5'>{data.title}</p>
          <p className='text-xl text-gray-700 mb-5'>{data.description}</p>
          <p className='whitespace-pre-line'>{formattedBody}</p>
        </div>
      </div>
    )
  } else {
    return <div>No article data available</div>
  }
}

export default ArticleDetailsPage
