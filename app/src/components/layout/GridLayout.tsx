import SubNavbar from '../shared/SubNavbar'

type GridLayoutProps = {
  children: JSX.Element
}

function GridLayout({ children }: GridLayoutProps) {
  return (
    <>
      <SubNavbar />
      <div className='grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 px-10 py-10'>
        {children}
      </div>
    </>
  )
}

export default GridLayout
