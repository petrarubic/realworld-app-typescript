import { useState } from 'react'
import { ProfileFormData } from '../../types/ProfileFormData'
import ProfileForm from '../forms/ProfileForm'
import { User } from '../../types/User'
import { useQuery } from 'react-query'
import { fetchCurrentUser } from '../../service/authService'
import Spinner from '../Spinner'
import { editProfile } from '../../service/profileService'

function ProfilePage() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isProfileEdited, setIsProfileEdited] = useState(false)

  const { isLoading, isError, data, error } = useQuery<User, Error>({
    queryKey: ['profile'],
    queryFn: () => fetchCurrentUser(),
  })

  const handleEditForm = (data: ProfileFormData) => {
    editProfile(data)
      .then(() => {
        setIsProfileEdited(true)
      })
      .catch((error) => {
        setErrorMessage(error)
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
    <div className='flex flex-col min-h-full justify-center px-6 py-24 lg:px-24 bg-gray-100'>
      <div className='bg-white w-full p-10 rounded-xl max-h-[550px]'>
        <ProfileForm initialData={data} onSubmit={handleEditForm} />
      </div>
      <br />
      {isProfileEdited && errorMessage === '' ? (
        <p className='font-bold text-center'>Profile edited successfully!</p>
      ) : (
        <p className='font-bold text-center'>{errorMessage}</p>
      )}
    </div>
  )
}

export default ProfilePage
