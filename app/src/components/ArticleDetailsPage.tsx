import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Article } from '../types/Article'
import { fetchArticle } from '../service/articleService'
import Spinner from './Spinner'
import { formatDateString } from '../utils/utils'

function ArticleDetailsPage() {
  const { slug } = useParams()

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
  })

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
    return (
      <div className='flex justify-center items-center'>
        <div className='w-full px-8 md:px-32 xl:px-96 py-10'>
          <div className='pb-5'>
            <p className='font-bold text-xl'>{data.author.username}</p>
            <p className='text-gray-500'>{formatDateString(data.createdAt)}</p>
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
