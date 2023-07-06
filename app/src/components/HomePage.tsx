import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { fetchArticles } from '../service/articleService'
import { Article } from '../types/Article'
import ArticleCard from './ArticleCard'
import Spinner from './Spinner'

function HomePage() {
  const navigate = useNavigate()
  const { isLoading, isError, data, error } = useQuery<Article[], Error>({
    queryKey: ['article'],
    queryFn: fetchArticles,
  })

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
    <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 bg-gray-100'>
      {data?.map((article) => (
        <ArticleCard article={article} />
      ))}
    </div>
  )
}

export default HomePage
