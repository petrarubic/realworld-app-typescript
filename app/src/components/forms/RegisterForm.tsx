import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { registerUser } from '../../service/authService'
import { registerFormSchema } from './validation/validators'

interface RegisterFormData {
  email: string
  username: string
  password: string
}

function RegisterForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = handleSubmit((data) =>
    registerUser({
      email: data.email,
      username: data.username,
      password: data.password,
    })
      .then((res) => {
        if (res) {
          localStorage.setItem('userToken', JSON.stringify(res))
          navigate('/')
        }
      })
      .catch((error) => {
        if (typeof error === 'object' && Object.keys(error).length > 0) {
          if (error.email && error.email.length > 0) {
            form.setError('email', { message: 'Email ' + error.email[0] })
          }
          if (error.username && error.username.length > 0) {
            form.setError('username', {
              message: 'Username ' + error.username[0],
            })
          }
          if (error.password && error.password.length > 0) {
            form.setError('password', {
              message: 'Password ' + error.password[0],
            })
          }
        } else {
          setErrorMessage('Unknown server error has occurred: ' + error)
        }
      })
  )

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-black'>Email</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-indigo-600'
                    type='text'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                {errors?.email?.message && (
                  <FormMessage>{errors.email.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-black'>Username</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-indigo-600'
                    type='text'
                    placeholder='Enter your username'
                    {...field}
                  />
                </FormControl>
                {errors?.username?.message && (
                  <FormMessage>{errors.username.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-black'>Password</FormLabel>
                <FormControl>
                  <Input
                    className='focus-visible:ring-indigo-600'
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                  />
                </FormControl>
                {errors?.password?.message && (
                  <FormMessage>{errors.password.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-900 w-full'
          >
            Submit
          </Button>
        </form>
      </Form>
      <br />
      {errorMessage && <p className='font-bold'>{errorMessage}</p>}
    </>
  )
}

export default RegisterForm
