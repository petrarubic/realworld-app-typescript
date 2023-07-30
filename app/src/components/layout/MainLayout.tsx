import Navbar from '../shared/Navbar'

type MainLayoutProps = {
  children: JSX.Element
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default MainLayout
