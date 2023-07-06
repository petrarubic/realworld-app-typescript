import { Article } from '../types/Article'
import { formatDateString } from '../utils/utils'
import ArticleTag from './ArticleTag'

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white'>
      <div className='bg-indigo-600 p-2'>
        <div className='text-sm flex justify-between items-center text-white'>
          <p className='font-semibold'>{article.author.username}</p>
          <p className='text-xs'>{formatDateString(article.createdAt)}</p>
        </div>
      </div>
      <div className='p-2'>
        <p className='font-bold text-xl mb-2'>{article.title}</p>
        <p className='text-gray-700 text-base'>{article.description}</p>
        <div className='pt-4'>
          {article.tagList.map((t) => (
            <ArticleTag tag={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
