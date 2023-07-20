import { useForm } from 'react-hook-form'
import { ArticleFormData } from '../../types/ArticleFormData'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleFormSchema } from './validation/validators'

type ArticleFormProps = {
  mode: string
  onSubmit: (data: ArticleFormData) => void
  initialData?: ArticleFormData
}

const ArticleForm = ({ mode, onSubmit, initialData }: ArticleFormProps) => {
  const formattedBody = initialData?.body.replace(/\\n/g, ' ')
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      body: formattedBody || '',
      tagList: initialData?.tagList || [],
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = form

  const handleFormSubmit = (data: ArticleFormData) => {
    onSubmit(data)
  }

  return (
    <Card className='w-1/3 p-10'>
      <CardHeader>
        <CardTitle className='text-center'>
          {mode === 'create' ? 'Create New Article' : 'Edit Article'}
        </CardTitle>
      </CardHeader>
      <CardContent className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Title</FormLabel>
                  <FormControl>
                    <Input
                      className='focus-visible:ring-indigo-600'
                      type='text'
                      placeholder='Enter article title'
                      {...field}
                    />
                  </FormControl>
                  {errors?.title?.message && (
                    <FormMessage>{errors.title.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Description</FormLabel>
                  <FormControl>
                    <Input
                      className='focus-visible:ring-indigo-600'
                      type='text'
                      placeholder='Enter article short description'
                      {...field}
                    />
                  </FormControl>
                  {errors?.description?.message && (
                    <FormMessage>{errors.description.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      className='focus-visible:ring-indigo-600'
                      placeholder='Enter article body'
                      {...field}
                    />
                  </FormControl>
                  {errors?.body?.message && (
                    <FormMessage>{errors.body.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
            {mode === 'create' && (
              <FormField
                control={form.control}
                name='tagList'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black'>Tags</FormLabel>
                    <FormControl>
                      <Input
                        className='focus-visible:ring-indigo-600'
                        type='text'
                        placeholder='Enter tags separated by comma'
                        {...field}
                      />
                    </FormControl>
                    {errors?.tagList?.message && (
                      <FormMessage>{errors.tagList.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />
            )}
            <Button
              type='submit'
              className='bg-indigo-600 hover:bg-indigo-900 w-full'
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ArticleForm
