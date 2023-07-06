import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { fetchArticles } from '../service/articleService'
import { Article } from '../types/Article'

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
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
      {data?.map((article) => (
        <div className='max-w-sm rounded overflow-hidden shadow-lg p-2'>
          <div className='font-bold text-xl mb-2'>{article.title}</div>
          <p className='text-gray-700 text-base'>{article.description}</p>
          <div className='pt-4'>
            {article.tagList.map((tag) => (
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default HomePage
