import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { fetchArticles } from '../../service/articleService'
import { Article } from '../../types/Article'
import ArticleCard from '../shared/ArticleCard'
import Spinner from '../shared/Spinner'
import {
  PlusSmallIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

function HomePage() {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 9

  const { isLoading, isError, data, error } = useQuery<Article[], Error>({
    queryKey: ['articles', currentPage],
    queryFn: () => fetchArticles(limit, (currentPage - 1) * limit),
  })

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const hasMorePages = data?.length === limit
  const totalPages = hasMorePages ? currentPage + 1 : currentPage

  useEffect(() => {
    const token = localStorage.getItem('userToken')

    if (!token) {
      navigate('/register')
    }
  }, [navigate])

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

  return (
    <div className='bg-gray-100 py-5'>
      <div className='flex justify-end px-6 items-center pb-4'>
        <Button asChild className='w-30 bg-indigo-600 hover:bg-indigo-900'>
          <Link to={`/articles/new`}>
            <p className='flex items-center space-x-2'>
              <PlusSmallIcon className='w-5 h-5' />
              <span>New article</span>
            </p>
          </Link>
        </Button>
      </div>
      <hr />
      <div className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 px-10 py-10'>
        {data?.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      <div className='flex justify-center mt-5'>
        <Button
          className='w-28 bg-indigo-600 hover:bg-indigo-900 disabled:bg-gray-400'
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <p className='flex space-x-2 items-center'>
            <ArrowLeftIcon className='w-4 h-4' />
            <span>Previous</span>
          </p>
        </Button>
        <span className='px-4 py-2 mx-2 text-sm'>Page {currentPage}</span>
        <Button
          className='w-28 bg-indigo-600 hover:bg-indigo-900 disabled:bg-gray-400'
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <p className='flex space-x-2 items-center'>
            <ArrowRightIcon className='w-4 h-4' />
            <span>Next</span>
          </p>
        </Button>
      </div>
    </div>
  )
}

export default HomePage
