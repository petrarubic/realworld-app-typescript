import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { ArrowRightIcon, EditIcon, StarIcon, TrashIcon } from '../icons'
import { Article } from '../types/Article'
import { formatDateString } from '../utils/utils'
import ArticleTag from './ArticleTag'
import {
  addToFavoriteArticles,
  deleteArticle,
  removeFromFavoriteArticles,
} from '../service/articleService'
import { useState } from 'react'

function ArticleCard({ article }: { article: Article }) {
  const [favoriteArticle, setFavoriteArticle] = useState(article)

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
    } catch (error) {
      console.error('Error with deleting selected article', error)
    }
  }

  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white'>
      <div className='bg-indigo-600 p-2'>
        <div className='text-sm flex justify-between items-center text-white'>
          <p className='font-semibold'>{article.author.username}</p>
          <p className='text-xs'>{formatDateString(article.createdAt)}</p>
        </div>
      </div>
      <div className='p-2'>
        <p className='font-bold text-xl mb-2 line-clamp-2'>{article.title}</p>
        <p className='text-gray-700 text-base line-clamp-3'>
          {article.description}
        </p>
        <div className='pt-4'>
          {article.tagList.map((t, index) => (
            <ArticleTag tag={t} key={index} />
          ))}
        </div>
        <div>
          <Tooltip
            id='favorite-tooltip'
            style={{
              padding: '4px',
              fontSize: '10px',
              backgroundColor: '#4f46e5',
            }}
          />
          <Tooltip
            id='edit-tooltip'
            style={{
              padding: '4px',
              fontSize: '10px',
              backgroundColor: '#4f46e5',
            }}
          />
          <Tooltip
            id='delete-tooltip'
            style={{
              padding: '4px',
              fontSize: '10px',
              backgroundColor: '#4f46e5',
            }}
          />
          <Tooltip
            id='read-more-tooltip'
            style={{
              padding: '4px',
              fontSize: '10px',
              backgroundColor: '#4f46e5',
            }}
          />
        </div>
        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center space-x-1'>
            <button
              data-tooltip-id='favorite-tooltip'
              data-tooltip-content={
                !favoriteArticle.favorited ? 'Favorite' : 'Unfavorite'
              }
              onClick={() => {
                !favoriteArticle.favorited
                  ? handleAddToFavorites()
                  : handleRemoveFromFavorites()
              }}
            >
              <StarIcon
                fillColor={!favoriteArticle.favorited ? '#ffffff' : '#4f46e5'}
                strokeColor='#4f46e5'
              />
            </button>
            <Link
              to={`/articles/${article.slug}/edit`}
              data-tooltip-id='edit-tooltip'
              data-tooltip-content='Edit'
            >
              <EditIcon />
            </Link>
            <button
              data-tooltip-id='delete-tooltip'
              data-tooltip-content='Delete'
              onClick={handleDelete}
            >
              <TrashIcon />
            </button>
          </div>
          <Link
            to={`/articles/${article.slug}/details`}
            data-tooltip-id='read-more-tooltip'
            data-tooltip-content='Read more'
          >
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
