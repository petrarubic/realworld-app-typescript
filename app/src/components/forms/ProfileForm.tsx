import { useForm } from 'react-hook-form'
import { ProfileFormData } from '../../types/ProfileFormData'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileFormSchema } from './validation/validators'

type ProfileFormProps = {
  onSubmit: (data: ProfileFormData) => void
  initialData?: ProfileFormData
}

const ProfileForm = ({ onSubmit, initialData }: ProfileFormProps) => {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      image: initialData?.image || '',
      email: initialData?.email || '',
      username: initialData?.username || '',
      bio: initialData?.bio || '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const handleFormSubmit = (data: ProfileFormData) => {
    onSubmit(data)
  }

  return (
    <Card className='p-2 w-full sm:w-2/3 lg:w-1/3'>
      <CardHeader className='text-center'>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your basic profile information.
        </CardDescription>
      </CardHeader>
      <CardContent className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-5'>
            <div className='w-full flex justify-center'>
              {initialData?.image && (
                <Avatar className='w-48 h-48'>
                  <AvatarImage src={initialData.image} alt='Profile image' />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              )}
            </div>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Profile image</FormLabel>
                  <FormControl>
                    <Input
                      className='focus-visible:ring-indigo-600'
                      type='text'
                      placeholder='Enter profile image URL'
                      {...field}
                    />
                  </FormControl>
                  {errors?.image?.message && (
                    <FormMessage>{errors.image.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
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
              name='bio'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className='focus-visible:ring-indigo-600'
                      placeholder='Enter your short bio'
                      {...field}
                    />
                  </FormControl>
                  {errors?.bio?.message && (
                    <FormMessage>{errors.bio.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='bg-indigo-600 hover:bg-indigo-900 w-full'
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ProfileForm
