import { ProfileFormData } from '../../types/ProfileFormData'
import ProfileForm from '../forms/ProfileForm'
import { User } from '../../types/User'
import { useQuery } from 'react-query'
import { fetchCurrentUser } from '../../service/authService'
import Spinner from '../shared/Spinner'
import { editProfile } from '../../service/profileService'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'

function ProfilePage() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const { isLoading, isError, data, error } = useQuery<User, Error>({
    queryKey: ['profile'],
    queryFn: () => fetchCurrentUser(),
  })

  const handleEditForm = (data: ProfileFormData) => {
    editProfile(data)
      .then(() => {
        toast({
          title: 'Data saved successfully.',
          description: 'Your profile data was updated.',
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
        <ProfileForm initialData={data} onSubmit={handleEditForm} />
      </div>
    </div>
  )
}

export default ProfilePage
