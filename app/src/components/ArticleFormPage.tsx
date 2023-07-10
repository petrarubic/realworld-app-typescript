import { useQuery } from 'react-query'
import { useParams } from 'react-router'
import ArticleForm from './forms/ArticleForm'
import { ArticleFormData } from '../types/ArticleFormData'
import { Article } from '../types/Article'
import {
  createArticle,
  editArticle,
  fetchArticle,
} from '../service/articleService'
import Spinner from './Spinner'

function ArticleFormPage() {
  const { slug } = useParams()

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  })

  const handleCreateForm = (data: ArticleFormData) => {
    createArticle(data).then((res) => {
      console.log(res)
    })
  }

  const handleEditForm = (data: ArticleFormData) => {
    editArticle(slug, data).then((res) => {
      console.log(res)
    })
  }

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
    <div className='flex min-h-full justify-center items-center px-6 py-12 lg:px-8 bg-gray-100'>
      {slug ? (
        <ArticleForm mode='edit' onSubmit={handleEditForm} initialData={data} />
      ) : (
        <ArticleForm mode='create' onSubmit={handleCreateForm} />
      )}
    </div>
  )
}

export default ArticleFormPage
