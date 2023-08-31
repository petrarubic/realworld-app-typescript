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
    <>
      <GridLayout>{children}</GridLayout>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </>
  )
}

export default PaginatedGridLayout
