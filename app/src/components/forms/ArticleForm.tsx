import { useForm } from 'react-hook-form'
import { ArticleFormData } from '../../types/ArticleFormData'

type ArticleFormProps = {
  mode: string
  onSubmit: (data: ArticleFormData) => void
  initialData?: ArticleFormData
}

const ArticleForm = ({ mode, onSubmit, initialData }: ArticleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormData>()

  const handleFormSubmit = (data: ArticleFormData) => {
    onSubmit(data)
  }

  const formattedBody = initialData?.body.replace(/\\n/g, ' ')

  return (
    <div className='bg-white w-1/3 p-10 rounded-xl'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          {mode === 'create' ? 'Create New Article' : 'Edit Article'}
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='flex flex-col space-y-5'
        >
          <div className='space-y-2'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Title
            </label>
            <input
              type='text'
              {...register('title', { required: 'Title is required' })}
              defaultValue={initialData?.title}
              className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            {errors?.title?.message && (
              <p className='mt-1 text-sm text-indigo-400'>
                {errors.title.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Description
            </label>
            <input
              type='text'
              {...register('description', {
                required: 'Description is required',
              })}
              defaultValue={initialData?.description}
              className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            {errors?.description?.message && (
              <p className='mt-1 text-sm text-indigo-400'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium leading-6 text-gray-900'>
              Body
            </label>
            <textarea
              {...register('body', { required: 'Body is required' })}
              defaultValue={formattedBody}
              className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            ></textarea>
            {errors?.body?.message && (
              <p className='mt-1 text-sm text-indigo-400'>
                {errors.body.message}
              </p>
            )}
          </div>

          {mode === 'edit' ? null : (
            <div className='space-y-2'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Tags
              </label>
              <input
                type='text'
                {...register('tagList')}
                defaultValue={initialData?.tagList?.join(', ')}
                className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
              {errors?.tagList?.message && (
                <p className='mt-1 text-sm text-indigo-400'>
                  {errors.tagList.message}
                </p>
              )}
            </div>
          )}

          <div className='pt-3'>
            <input
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ArticleForm
