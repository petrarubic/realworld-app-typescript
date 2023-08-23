import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  deleteArticle,
  fetchFollowedArticles,
} from '../../service/articleService'
import { Article } from '../../types/Article'
import ArticleCard from '../shared/ArticleCard'
import Spinner from '../shared/Spinner'
import SubNavbar from '../shared/SubNavbar'
import Pagination from '../shared/Pagination'

function ArticlesFollowingPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const limit = 9

  const { isLoading, isError, data, error, refetch } = useQuery<
    Article[],
    Error
  >({
    queryKey: ['articles-following', currentPage],
    queryFn: () => fetchFollowedArticles(limit, (currentPage - 1) * limit),
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

  if (isLoading) {
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

  if (!isLoading && data?.length === 0) {
    return (
      <div className='flex flex-col space-y-8 justify-center items-center bg-gray-100 h-full text-center'>
        <p className='text-xl font-bold'>
          Discover Articles from Authors You Follow
        </p>
        <p className='text-lg w-[700px]'>
          It looks like you haven't followed any authors yet. Following authors
          allows you to stay updated with their latest articles and never miss
          out on exciting content.
        </p>
      </div>
    )
  }

  return (
    <div className='bg-gray-100 py-5'>
      <SubNavbar />
      <div className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 px-10 py-10'>
        {data?.map((article) => (
          <ArticleCard
            article={article}
            key={article.slug}
            onDelete={handleDeleteArticle}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default ArticlesFollowingPage
