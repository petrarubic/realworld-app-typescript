import { User } from './User'

export type ProfileFormData = Pick<User, 'email' | 'username' | 'bio' | 'image'>
