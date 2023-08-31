import { useState } from 'react'
import { useQuery } from 'react-query'
import { deleteArticle } from '../../service/articleService'
import { Article } from '../../types/Article'
import ArticleCard from '../shared/ArticleCard'
import Spinner from '../shared/Spinner'
import PaginatedGridLayout from '../layout/PaginatedGridLayout'

interface ArticleGridProps {
  queryKey: string
  fetchFn: (limit: number, offset: number) => Promise<Article[]>
}

function ArticleGrid({ queryKey, fetchFn }: ArticleGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 9

  const { isLoading, isError, data, error, refetch } = useQuery<
    Article[],
    Error
  >({
    queryKey: [queryKey, currentPage],
    queryFn: () => fetchFn(limit, (currentPage - 1) * limit),
  })

  const handleDeleteArticle = (slug: string) => {
    deleteArticle(slug)
      .then(() => {
        refetch()
      })
      .catch((error) => {
        console.error('Error deleting article:', error)
      })
  }

  const hasMorePages = data?.length === limit
  const totalPages = hasMorePages ? currentPage + 1 : currentPage

  if (isLoading || !data || data.length < 1) {
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

  return (
    <PaginatedGridLayout
      children={
        <>
          {data?.map((article) => (
            <ArticleCard
              article={article}
              key={article.slug}
              onDelete={handleDeleteArticle}
            />
          ))}
        </>
      }
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
  )
}

export default ArticleGrid
