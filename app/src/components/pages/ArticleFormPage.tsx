import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router'
import ArticleForm from '../forms/ArticleForm'
import { ArticleFormData } from '../../types/ArticleFormData'
import { Article } from '../../types/Article'
import {
  createArticle,
  editArticle,
  fetchArticle,
} from '../../service/articleService'
import Spinner from '../shared/Spinner'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

function ArticleFormPage() {
  const { slug } = useParams()
  const { toast } = useToast()
  const navigate = useNavigate()

  const { isLoading, isError, data, error } = useQuery<Article, Error>({
    queryKey: ['article', slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  })

  const handleCreateForm = (data: ArticleFormData) => {
    createArticle(data)
      .then(() => {
        toast({
          title: 'Data submitted successfully.',
          description: 'New article was created.',
          className: 'bg-green-50 text-green-800 border-green-100',
        })
      })
      .catch((error) => {
        toast({
          title: 'Error has occurred.',
          description: `Error: ${error}`,
          className: 'bg-red-50 text-red-800 border-red-100',
        })
      })
  }

  const handleEditForm = (data: ArticleFormData) => {
    editArticle(slug, data)
      .then(() => {
        toast({
          title: 'Data submitted successfully.',
          description: 'Selected article data was edited.',
          className: 'bg-green-50 text-green-800 border-green-100',
        })
      })
      .catch((error) => {
        toast({
          title: 'Error has occurred.',
          description: `Error: ${error}`,
          className: 'bg-red-50 text-red-800 border-red-100',
        })
      })
  }

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

  return (
    <div className='bg-gray-100'>
      <Button
        variant='link'
        onClick={() => navigate(-1)}
        className='w-[250px] m-4 text-md font-semibold'
      >
        <p className='flex flex-row space-x-2 items-center'>
          <ArrowLeftIcon className='w-5 h-5' />
          <span>Go Back</span>
        </p>
      </Button>
      <div className='flex flex-col min-h-full justify-center items-center px-6 py-12 lg:px-8 '>
        {slug ? (
          <ArticleForm
            mode='edit'
            onSubmit={handleEditForm}
            initialData={data}
          />
        ) : (
          <ArticleForm mode='create' onSubmit={handleCreateForm} />
        )}
      </div>
    </div>
  )
}

export default ArticleFormPage
