import LoginForm from './forms/LoginForm';

function LoginPage() {
  return (
    <div className='flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8 bg-gray-100'>
      <div className='bg-white w-1/3 p-10 rounded-xl'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Log in with existing account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
