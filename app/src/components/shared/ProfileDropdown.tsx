import { fetchCurrentUser } from '@/service/authService'
import { User } from '@/types/User'
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'

function ProfileDropdown() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchCurrentUser()
        setCurrentUser(userData)
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      }
    }

    fetchUserData()
  }, [])
  return (
    <Menu as='div' className='relative ml-3'>
      <div className='flex flex-row space-x-4 items-center'>
        <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          <span className='sr-only'>Open user menu</span>
          <img
            className='h-8 w-8 rounded-full'
            src={currentUser?.image}
            alt='Profile image'
          />
        </Menu.Button>
        <p className='text-sm font-semibold'>{currentUser?.username}</p>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <Menu.Item>
            {({ active }) => (
              <Link
                to='/profile'
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } block w-full text-left px-4 py-2 text-sm text-gray-700`}
              >
                <p className='flex flex-row space-x-2'>
                  <span>Log out</span>
                  <ArrowRightCircleIcon className='w-5 h-5' />
                </p>
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdown
