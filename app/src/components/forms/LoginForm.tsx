import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../service/authService';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit = handleSubmit((data) =>
    loginUser({
      email: data.email,
      password: data.password,
    }).then((res) => {
      if (res) {
        localStorage.setItem('userToken', JSON.stringify(res));
        navigate('/');
      }
    })
  );

  return (
    <form className='space-y-6' onSubmit={onSubmit}>
      <div>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          Email
        </label>
        <div className='mt-2'>
          <input
            type='text'
            {...register('email', {
              required: 'Email is required',
              validate: {
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  'Email must be in valid format',
              },
            })}
            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.email?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
          Password
        </label>
        <div className='mt-2'>
          <input
            type='password'
            {...register('password', { required: 'Password is required' })}
            className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
          {errors?.password?.message && (
            <p className='mt-1 text-sm text-indigo-400'>
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <input
        type='submit'
        className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer'
      />
    </form>
  );
}

export default LoginForm;
