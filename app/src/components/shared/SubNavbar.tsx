import { Link } from 'react-router-dom'
import { PlusSmallIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

function SubNavbar() {
  return (
    <>
      <div className='flex justify-end px-6 items-center pb-4'>
        <Button asChild className='w-30 bg-indigo-600 hover:bg-indigo-900'>
          <Link to={`/articles/new`}>
            <p className='flex items-center space-x-2'>
              <PlusSmallIcon className='w-5 h-5' />
              <span>New article</span>
            </p>
          </Link>
        </Button>
      </div>
      <hr />
    </>
  )
}

export default SubNavbar
