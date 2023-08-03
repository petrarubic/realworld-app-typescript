import { useForm, Controller } from 'react-hook-form'
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
import CreatableSelect from 'react-select/creatable'
import { StylesConfig } from 'react-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { articleFormSchema } from './validation/validators'
import { useEffect, useState } from 'react'
import { fetchTags } from '@/service/tagsService'

type ArticleFormProps = {
  mode: string
  onSubmit: (data: ArticleFormData) => void
  initialData?: ArticleFormData
}

interface OptionType {
  value: string
  label: string
}

const ArticleForm = ({ mode, onSubmit, initialData }: ArticleFormProps) => {
  const [tags, setTags] = useState<OptionType[]>([])
  const formattedBody = initialData?.body.replace(/\\n/g, ' ')
  const customStyles: StylesConfig<OptionType, true> = {
    control: (provided, state) => {
      return {
        ...provided,
        marginTop: '10px',
        fontSize: '0.875rem',
        border: '1px solid #e2e8f0',
        boxShadow: state.isFocused
          ? '0 0 0 2px white, 0 0 0 4px #4f46e5'
          : undefined,
        '&:hover': {
          borderColor: 'none',
        },
      }
    },
    option: (provided) => ({
      ...provided,
      fontSize: '0.875rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#64748b',
    }),
  }

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
    control,
    handleSubmit,
    formState: { errors },
  } = form

  const handleFormSubmit = (data: ArticleFormData) => {
    onSubmit(data)
    if (mode === 'create') {
      form.reset()
    }
  }

  useEffect(() => {
    fetchTags()
      .then((tags: string[]) => {
        setTags(tags.map((tag) => ({ value: tag, label: tag })))
      })
      .catch((error) => {
        console.error('Error fetching tags:', error)
      })
  }, [])

  return (
    <Card className='p-2 w-full sm:w-2/3 lg:w-1/3'>
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
            {mode === 'create' && (
              <Controller
                name='tagList'
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <div>
                    <FormLabel className='text-black'>Tags</FormLabel>
                    <CreatableSelect
                      className='focus-visible:ring-indigo-600'
                      isMulti
                      formatCreateLabel={(inputValue) =>
                        `Create tag: ${inputValue}`
                      }
                      placeholder='Choose from existing list of article tags / Enter tag name to create a new one'
                      options={tags}
                      onChange={(selectedOptions) => {
                        const selectedTags = selectedOptions
                          ? selectedOptions.map((option) => option.value)
                          : []
                        field.onChange(selectedTags)
                      }}
                      onCreateOption={(inputValue) => {
                        const newOption: OptionType = {
                          value: inputValue,
                          label: inputValue,
                        }
                        setTags((prevTags) => [...prevTags, newOption])
                        field.onChange([...field.value, inputValue])
                      }}
                      value={tags.filter((tag) =>
                        field.value.includes(tag.value)
                      )}
                      styles={customStyles}
                    />
                    {errors?.tagList?.message && (
                      <FormMessage className='mt-2'>
                        {errors.tagList.message}
                      </FormMessage>
                    )}
                  </div>
                )}
              />
            )}
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
                      className='focus-visible:ring-indigo-600 min-h-[200px]'
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
