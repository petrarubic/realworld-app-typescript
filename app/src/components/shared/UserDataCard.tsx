import { useUserData } from '@/auth'
import { Card, CardContent } from '@/components/ui/card'
import {
  fetchArticleCountByAuthor,
  fetchFavoritesCountByAuthor,
  fetchFollowedAuthorsCount,
} from '@/service/articleService'
import { useQuery } from 'react-query'
import {
  BookOpenIcon,
  HandThumbUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

type UserData = 'posted-articles' | 'article-likes' | 'followed-authors'

const cardTypeConfig = {
  'posted-articles': {
    label: 'Articles posted',
    icon: <BookOpenIcon />,
    style: 'bg-green-100 border-green-200',
  },
  'article-likes': {
    label: 'Total likes',
    icon: <HandThumbUpIcon />,
    style: 'bg-sky-100 border-sky-200',
  },
  'followed-authors': {
    label: 'Total authors followed',
    icon: <UserGroupIcon />,
    style: 'bg-purple-100 border-purple-200',
  },
}

function UserDataCard({ type }: { type: UserData }) {
  const currentUser = useUserData()
  const { label, icon, style } = cardTypeConfig[type]

  const { isLoading, isError, data, error } = useQuery<number, Error>({
    queryKey: [type, currentUser],
    queryFn: async () => {
      switch (type) {
        case 'posted-articles':
          return currentUser ? fetchArticleCountByAuthor(currentUser) : 0
        case 'article-likes':
          return currentUser ? fetchFavoritesCountByAuthor(currentUser) : 0
        case 'followed-authors':
          return fetchFollowedAuthorsCount()
        default:
          return 0
      }
    },
  })

  return (
    <Card className='w-full h-[80px] bg-gray-100 rounded-2xl border-gray-100'>
      <CardContent className='h-full flex space-x-10 items-center pt-6'>
        <div className={`w-12 h-12 rounded-xl p-3 border-2 ${style}`}>
          {icon}
        </div>
        <div>
          <p className='text-sm'>{label}</p>
          {isLoading && <p className='text-xs'>Loading...</p>}
          {isError && <p className='text-xs'>{error.message}</p>}
          {!isLoading && !isError && (
            <p className='text-xl font-extrabold'>{data}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default UserDataCard
