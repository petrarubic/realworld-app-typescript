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
import { useState } from 'react'

function ArticleFormPage() {
  const { slug } = useParams()
  const [isArticleEdited, setIsArticleEdited] = useState(false)
  const [isArticleCreated, setIsArticleCreated] = useState(false)

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  })

  const handleCreateForm = (data: ArticleFormData) => {
    createArticle(data).then(() => {
      setIsArticleCreated(true)
    })
  }

  const handleEditForm = (data: ArticleFormData) => {
    editArticle(slug, data).then(() => {
      setIsArticleEdited(false)
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
    <div className='flex flex-col min-h-full justify-center items-center px-6 py-12 lg:px-8 bg-gray-100'>
      {slug ? (
        <>
          <ArticleForm
            mode='edit'
            onSubmit={handleEditForm}
            initialData={data}
          />
          <br />
          {isArticleEdited && (
            <p className='font-bold'>Article edited successfully!</p>
          )}
        </>
      ) : (
        <>
          <ArticleForm mode='create' onSubmit={handleCreateForm} />
          <br />
          {isArticleCreated && (
            <p className='font-bold'>Article created successfully!</p>
          )}
        </>
      )}
    </div>
  )
}

export default ArticleFormPage
