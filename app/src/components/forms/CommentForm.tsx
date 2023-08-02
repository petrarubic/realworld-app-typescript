import { useForm } from 'react-hook-form'
import { CommentFormData } from '../../types/CommentFormData'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { commentFormSchema } from './validation/validators'
import { useUserData } from '@/auth'

type CommentFormProps = {
  onSubmit: (data: CommentFormData) => void
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const currentUser = useUserData()

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      body: '',
    },
  })
  const {
    handleSubmit,
    formState: { errors },
  } = form

  const handleFormSubmit = (data: CommentFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <>
      <Form {...form}>
        <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem className='relative flex space-x-5'>
                <Avatar className='w-10 h-10 mt-2'>
                  <AvatarImage
                    src={currentUser?.image ? currentUser.image : ''}
                    alt='Profile image'
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Textarea
                    className='focus-visible:ring-indigo-600 min-h-[150px]'
                    placeholder='Write a comment...'
                    {...field}
                  />
                </FormControl>
                <Button
                  type='submit'
                  className='bg-indigo-600 hover:bg-indigo-900 w-[100px] absolute right-4 bottom-4'
                >
                  Post
                </Button>
                {errors?.body?.message && (
                  <FormMessage>{errors.body.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  )
}

export default CommentForm
