import { Button } from '@/components/ui/button'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

interface PaginationProps {
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  totalPages: number
}

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div className='flex justify-center mt-5'>
      <Button
        className='w-28 bg-indigo-600 hover:bg-indigo-900 disabled:bg-gray-400'
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <p className='flex space-x-2 items-center'>
          <ArrowLeftIcon className='w-4 h-4' />
          <span>Previous</span>
        </p>
      </Button>
      <span className='px-4 py-2 mx-2 text-sm'>Page {currentPage}</span>
      <Button
        className='w-28 bg-indigo-600 hover:bg-indigo-900 disabled:bg-gray-400'
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        <p className='flex space-x-2 items-center'>
          <ArrowRightIcon className='w-4 h-4' />
          <span>Next</span>
        </p>
      </Button>
    </div>
  )
}

export default Pagination
