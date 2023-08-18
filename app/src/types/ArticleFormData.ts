import { Article } from './Article'

export type ArticleFormData = Pick<
  Article,
  'title' | 'description' | 'body' | 'tagList'
>
