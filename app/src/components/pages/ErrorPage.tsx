import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='mx-auto flex w-full max-w-7xl flex-auto flex-col justify-center px-6 py-24 sm:py-64 lg:px-8'>
      <p className='text-base font-semibold leading-8 text-indigo-600'>404</p>
      <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
        Page not found
      </h1>
      <p className='mt-6 text-base leading-7 text-gray-600'>
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <div className='mt-10'>
        <Button asChild className='bg-indigo-600 hover:bg-indigo-900 space-x-2'>
          <Link to={'/'}>
            <p className='flex items-center space-x-2'>
              <ArrowLeftIcon className='w-3 h-3' />
              <span>Back to home</span>
            </p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default ErrorPage
