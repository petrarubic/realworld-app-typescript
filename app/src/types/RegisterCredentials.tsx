import { User } from './User'

export type RegisterCredentials = Pick<User, 'email' | 'username' | 'password'>
