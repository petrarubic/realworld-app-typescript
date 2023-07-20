import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .email('Email must be in valid format')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
})

export const registerFormSchema = z.object({
  email: z
    .string()
    .email('Email must be in valid format')
    .nonempty('Email is required'),
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
})

export const articleFormSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  body: z.string().nonempty('Body is required'),
  tagList: z.string().nonempty('At least one tag is required'),
})
