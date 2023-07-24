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
import { commentFormSchema } from './validation/validators'

type CommentFormProps = {
  onSubmit: (data: CommentFormData) => void
}

function CommentForm({ onSubmit }: CommentFormProps) {
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
  }

  return (
    <>
      <Form {...form}>
        <form className='space-y-6' onSubmit={handleSubmit(handleFormSubmit)}>
          <FormField
            control={form.control}
            name='body'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className='focus-visible:ring-indigo-600'
                    placeholder='Write a comment...'
                    {...field}
                  />
                </FormControl>
                {errors?.body?.message && (
                  <FormMessage>{errors.body.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-indigo-600 hover:bg-indigo-900 w-[100px]'
          >
            Post
          </Button>
        </form>
      </Form>
    </>
  )
}

export default CommentForm
