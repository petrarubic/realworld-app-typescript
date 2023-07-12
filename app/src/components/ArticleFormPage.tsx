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
  const [createErrorMessage, setCreateErrorMessage] = useState('')
  const [editErrorMessage, setEditErrorMessage] = useState('')
  const [isArticleEdited, setIsArticleEdited] = useState(false)
  const [isArticleCreated, setIsArticleCreated] = useState(false)

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  })

  const handleCreateForm = (data: ArticleFormData) => {
    createArticle(data)
      .then(() => {
        setIsArticleCreated(true)
      })
      .catch((error) => {
        setCreateErrorMessage(error)
      })
  }

  const handleEditForm = (data: ArticleFormData) => {
    editArticle(slug, data)
      .then(() => {
        setIsArticleEdited(false)
      })
      .catch((error) => {
        setEditErrorMessage(error)
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
          {isArticleEdited && editErrorMessage === '' ? (
            <p className='font-bold'>Article edited successfully!</p>
          ) : (
            <p className='font-bold'>{editErrorMessage}</p>
          )}
        </>
      ) : (
        <>
          <ArticleForm mode='create' onSubmit={handleCreateForm} />
          <br />
          {isArticleCreated && createErrorMessage === '' ? (
            <p className='font-bold'>Article created successfully!</p>
          ) : (
            <p className='font-bold'>{createErrorMessage}</p>
          )}
        </>
      )}
    </div>
  )
}

export default ArticleFormPage
