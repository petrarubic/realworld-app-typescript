import { User } from './User'

export type LoginCredentials = Pick<User, 'email' | 'password'>
