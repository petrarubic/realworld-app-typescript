import { Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import ProfileDropdown from './ProfileDropdown'
import { useEffect, useState } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const threshold = 80

    if (scrollPosition > threshold) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Disclosure
      as='nav'
      className={`bg-white shadow ${
        isScrolled && 'fixed top-0 left-0 right-0 z-10'
      }`}
    >
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <GlobeAmericasIcon className='h-12 w-auto text-indigo-600' />
                </div>
                <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
                  <Link
                    to='/articles/recent'
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 ${
                      location.pathname === '/articles/recent'
                        ? 'border-b-2 border-indigo-500'
                        : ''
                    }`}
                  >
                    Recent
                  </Link>
                  <Link
                    to='/articles/following'
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:border-b-2 hover:border-gray-300 hover:text-gray-700 ${
                      location.pathname === '/articles/following'
                        ? 'border-b-2 border-indigo-500'
                        : ''
                    }`}
                  >
                    Following
                  </Link>
                </div>
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <ProfileDropdown />
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pb-4 pt-2'>
              <Disclosure.Button className='w-full'>
                <Link
                  to='/articles/recent'
                  className={`block text-left border-l-4 w-full py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 ${
                    location.pathname === '/articles/recent'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'text-gray-500'
                  }`}
                >
                  Recent
                </Link>
                <Link
                  to='/articles/following'
                  className={`block text-left border-l-4 w-full py-2 pl-3 pr-4 text-base font-medium hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 ${
                    location.pathname === '/articles/following'
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'text-gray-500'
                  }`}
                >
                  Following
                </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
