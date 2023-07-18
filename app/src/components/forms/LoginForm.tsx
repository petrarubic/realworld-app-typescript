import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../service/authService'
import { useState } from 'react'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from './validation/validators'

interface LoginFormData {
  email: string
  password: string
}

function LoginForm() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmit = handleSubmit((data) =>
    loginUser({
      email: data.email,
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
          if (
            error['email or password'] &&
            error['email or password'].length > 0
          ) {
            setErrorMessage('Email or password is invalid')
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
          <div>
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
          </div>
          <div>
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
          </div>
          <Button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-900 w-full'
          >
            Submit
          </Button>
        </form>
      </Form>
      <br />
      {errorMessage && <p className='font-bold text-center'>{errorMessage}</p>}
    </>
  )
}

export default LoginForm
