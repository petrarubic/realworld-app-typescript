import { useForm } from 'react-hook-form'
import { ProfileFormData } from '../../types/ProfileFormData'

type ProfileFormProps = {
  onSubmit: (data: ProfileFormData) => void
  initialData?: ProfileFormData
}

const ProfileForm = ({ onSubmit, initialData }: ProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>()

  const handleFormSubmit = (data: ProfileFormData) => {
    onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-row space-x-10'
    >
      <div className='flex flex-col w-1/2'>
        <div className='space-y-2'>
          <div className='flex justify-center items-center'>
            {initialData?.image && (
              <img
                src={initialData.image}
                alt='profile image'
                className='rounded-full w-48 h-48'
              />
            )}
          </div>

          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Profile Image URL
          </label>
          <input
            type='text'
            {...register('image')}
            defaultValue={initialData?.image ? initialData.image : ''}
            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.image?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.image.message}
            </p>
          )}
        </div>
        <div className='mt-2 space-y-2'>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Email
          </label>
          <input
            type='text'
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Email must be in valid format',
              },
            })}
            defaultValue={initialData?.email}
            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.email?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className='mt-2 space-y-2'>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Username
          </label>
          <input
            type='text'
            {...register('username', {
              required: 'Username is required',
            })}
            defaultValue={initialData?.username}
            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.username?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className='pt-5'>
          <button
            type='submit'
            className='flex w-[100px] justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
          >
            Save
          </button>
        </div>
      </div>
      <div className='flex flex-col w-1/2'>
        <div className='space-y-2'>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Bio
          </label>
          <textarea
            {...register('bio')}
            defaultValue={initialData?.bio ? initialData.bio : ''}
            className='block w-full min-h-[250px] max-h-[390px] rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.username?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.username.message}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
