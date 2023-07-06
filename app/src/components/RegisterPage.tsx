import { Link } from 'react-router-dom'
import RegisterForm from './forms/RegisterForm'

function RegisterPage() {
  return (
    <div className='flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-100'>
      <div className='bg-white w-1/3 p-10 rounded-xl'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Register new account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <RegisterForm />
        </div>
        <p className='mt-10 text-center text-sm text-gray-500'>
          Already have an account?
          <Link
            to='/login'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            {' '}
            Log in here.
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
