import GridLayout from './GridLayout'
import Pagination from '../shared/Pagination'
import { Dispatch, SetStateAction } from 'react'

interface PaginatedGridLayoutProps {
  children: JSX.Element
  totalPages: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

function PaginatedGridLayout({
  children,
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginatedGridLayoutProps) {
  return (
    <div className='bg-gray-100 py-5'>
      <GridLayout>{children}</GridLayout>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default PaginatedGridLayout
