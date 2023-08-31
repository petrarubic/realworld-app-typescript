import Navbar from '../navigation/Navbar'

type MainLayoutProps = {
  children: JSX.Element
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className='bg-gray-100 h-full'>{children}</div>
    </>
  )
}

export default MainLayout
