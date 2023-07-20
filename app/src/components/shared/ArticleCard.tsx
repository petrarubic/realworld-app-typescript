import { Link } from 'react-router-dom'
import { Article } from '../../types/Article'
import { formatDateString } from '../../utils/utils'
import {
  addToFavoriteArticles,
  deleteArticle,
  removeFromFavoriteArticles,
} from '../../service/articleService'
import { useEffect, useState } from 'react'
import { fetchCurrentUser } from '../../service/authService'
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowRightIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function ArticleCard({ article }: { article: Article }) {
  const [favoriteArticle, setFavoriteArticle] = useState(article)
  const [showActionButtons, setShowActionButtons] = useState(false)

  const handleAddToFavorites = async () => {
    try {
      const updatedArticle = await addToFavoriteArticles(article.slug)
      setFavoriteArticle(updatedArticle)
    } catch (error) {
      console.error('Error with adding selected article to favorites', error)
    }
  }

  const handleRemoveFromFavorites = async () => {
    try {
      const updatedArticle = await removeFromFavoriteArticles(article.slug)
      setFavoriteArticle(updatedArticle)
    } catch (error) {
      console.error('Error with adding selected article to favorites', error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteArticle(article.slug)
      window.location.reload()
    } catch (error) {
      console.error('Error with deleting selected article', error)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser()
        if (
          userData &&
          article.author.username &&
          userData.username === article.author.username
        ) {
          setShowActionButtons(true)
        } else {
          setShowActionButtons(false)
        }
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      }
    }

    fetchUserData()
  }, [article.author.username])

  return (
    <Card className='rounded-lg max-h-[340px]'>
      <CardHeader className='rounded-t-lg p-4'>
        <div className='text-sm flex justify-between items-center pb-2'>
          <p className='font-semibold flex items-center space-x-4'>
            <span>
              <Avatar>
                <AvatarImage
                  src={article.author.image}
                  alt='Author profile image'
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </span>
            <span className='text-base'>{article.author.username}</span>
          </p>
          <p className='text-sm text-gray-600'>
            {formatDateString(article.createdAt)}
          </p>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className='space-y-4'>
        <CardTitle className='line-clamp-2 pb-1'>{article.title}</CardTitle>
        <CardDescription className='text-gray-700 line-clamp-3'>
          {article.description}
        </CardDescription>
        {article.tagList && article.tagList?.length > 0 && (
          <div className='space-x-2'>
            {article.tagList.map(
              (t, index) =>
                t !== '' && (
                  <Badge variant='secondary' key={index} className='h-6'>
                    {t}
                  </Badge>
                )
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <div className='flex justify-start items-center space-x-1'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    !favoriteArticle.favorited
                      ? handleAddToFavorites()
                      : handleRemoveFromFavorites()
                  }}
                >
                  <StarIcon
                    className={`w-6 h-6 text-indigo-600 hover:text-indigo-950 ${
                      !favoriteArticle.favorited
                        ? 'fill-white'
                        : 'fill-indigo-600'
                    }`}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {!favoriteArticle.favorited ? 'Favorite' : 'Unfavorite'}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant='ghost' size='icon'>
                  <Link
                    to={`/articles/${article.slug}/edit`}
                    className={showActionButtons ? '' : 'hidden'}
                  >
                    <PencilSquareIcon className='w-6 h-6 text-indigo-600 hover:text-indigo-950' />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={handleDelete}
                  className={showActionButtons ? '' : 'hidden'}
                >
                  <TrashIcon className='w-6 h-6 text-indigo-600 hover:text-indigo-950' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant='ghost' size='icon'>
                <Link to={`/articles/${article.slug}/details`}>
                  <ArrowRightIcon className='w-5 h-5 text-indigo-600 hover:text-indigo-950' />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Read more</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard
