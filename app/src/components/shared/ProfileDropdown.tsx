import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useUserData } from '@/auth'

function ProfileDropdown() {
  const navigate = useNavigate()
  const currentUser = useUserData()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }

  return (
    <Menu as='div' className='relative ml-3'>
      <div className='flex flex-row space-x-4 items-center'>
        <p className='text-sm font-semibold hidden sm:block'>
          {currentUser?.username}
        </p>
        <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
          <span className='sr-only'>Open user menu</span>
          <Avatar>
            <AvatarImage src={currentUser?.image} alt='Profile image' />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <img />
        </Menu.Button>
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
            <Button asChild variant='ghost' className='justify-start w-full'>
              <Link to='/profile'>Your Profile</Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button
              variant='ghost'
              onClick={handleLogout}
              className='justify-start w-full'
            >
              <p className='flex flex-row space-x-2'>
                <span>Log out</span>
                <ArrowRightCircleIcon className='w-5 h-5' />
              </p>
            </Button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdown
