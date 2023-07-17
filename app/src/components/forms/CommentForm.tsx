import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CommentFormData } from '../../types/CommentFormData'

type CommentFormProps = {
  onSubmit: (data: CommentFormData) => void
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentFormData>()

  const handleFormSubmit = (data: CommentFormData) => {
    onSubmit(data)
  }

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
        <textarea
          placeholder='Write a comment...'
          {...register('body', { required: 'Body is required' })}
          className='block w-full min-h-[140px] max-h-[540px] rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        ></textarea>
        {errors?.body?.message && (
          <p className='mt-1 text-sm text-indigo-400'>{errors.body.message}</p>
        )}
        <button
          type='submit'
          className='flex w-[150px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
        >
          Post comment
        </button>
      </form>
    </>
  )
}

export default CommentForm
