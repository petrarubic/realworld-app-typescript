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
