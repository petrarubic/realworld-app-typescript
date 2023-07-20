import { Link } from 'react-router-dom'
import LoginForm from '../forms/LoginForm'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function LoginPage() {
  return (
    <div className='flex min-h-full flex-col justify-center items-center px-4 md:px-6 py-12 lg:px-8 bg-gray-100'>
      <Card className='p-2 w-1/3'>
        <CardHeader>
          <CardTitle className='text-center'>
            Log in with existing account
          </CardTitle>
        </CardHeader>
        <CardContent className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <LoginForm />
        </CardContent>
        <CardFooter className='flex flex-col sm:flex-row mt-10 justify-center text-sm text-gray-500'>
          <p>Don't have an account?</p>
          <Button
            variant='link'
            asChild
            className='text-indigo-600 hover:text-indigo-500 p-1'
          >
            <Link to='/register'>Register here.</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default LoginPage
