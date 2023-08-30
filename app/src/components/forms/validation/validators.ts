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
  tagList: z.array(z.string()).nonempty('At least one tag is required'),
})

export const commentFormSchema = z.object({
  body: z.string().nonempty('Body is required'),
})

export const profileFormSchema = z.object({
  image: z.string().optional(),
  email: z
    .string()
    .email('Email must be in a valid format')
    .nonempty('Email is required'),
  username: z.string().nonempty('Username is required'),
  bio: z.string().optional(),
})
