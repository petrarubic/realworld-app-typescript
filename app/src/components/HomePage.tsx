import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const token = localStorage.getItem('userToken')

    if (!token) {
      navigate('/register')
    }
  }, [navigate])

  return (
    <>
      <h1 className='text-3xl font-bold underline'>
        Hello world!
      </h1>
    </>
  )
}
  
  export default HomePage