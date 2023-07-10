import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { fetchArticles } from '../service/articleService'
import { Article } from '../types/Article'
import ArticleCard from './ArticleCard'
import Spinner from './Spinner'

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
      <div className='flex justify-end px-6'>
        <Link
          to={`/articles/new`}
          className='inline-block text-center w-40 rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600'
        >
          Create New Article
        </Link>
      </div>
      <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
        {data?.map((article) => (
          <ArticleCard article={article} key={article.slug} />
        ))}
      </div>
      <div className='flex justify-center mt-5'>
        <button
          className='w-24 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400'
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className='px-4 py-2 mx-2 text-sm'>Page {currentPage}</span>
        <button
          className='w-24 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-400'
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default HomePage
