import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('userToken')
    navigate('/login')
  }
  return (
    <nav className='flex items-center justify-between bg-white p-6 sticky top-0 shadow-sm z-50'>
      <div className='text-xl font-bold text-indigo-600 flex flex-row justify-center space-x-1'>
        <span>RealWorld App</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6 self-center'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64'
          />
        </svg>
      </div>
      <div>
        <div className='text-sm'>
          <Link
            to='/'
            className='mt-4 inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4 font-semibold'
          >
            Articles
          </Link>
          <Link
            to='/profile'
            className='mt-4 inline-block lg:mt-0 text-black hover:text-indigo-600 mr-4 font-semibold'
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className='inline-block w-20 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar