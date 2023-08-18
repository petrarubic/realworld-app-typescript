import { User } from './User'

export type Author = Pick<User, 'username' | 'bio' | 'image' | 'following'>
