import { useUserData } from '@/auth'
import SubNavbar from '../shared/SubNavbar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Article } from '@/types/Article'
import { fetchArticles } from '@/service/articleService'
import Spinner from '../shared/Spinner'

function HomePage() {
  const currentUser = useUserData()
  const { isLoading, isError, data, error } = useQuery<Article[], Error>({
    queryKey: ['dashboard-articles-recent'],
    queryFn: () => fetchArticles(),
  })

  return (
    <div className='bg-gray-100 py-5'>
      <SubNavbar />
      <div className='grid grid-cols-3 gap-20 p-20'>
        <div className='col-span-2 space-y-20'>
          <Card className='border-none rounded-2xl'>
            <CardContent className='grid grid-cols-3 gap-4 pt-6 place-items-center'>
              <div className='flex flex-col col-span-2 space-y-4'>
                <CardTitle className='text-3xl'>
                  <span>Welcome </span>
                  <span className='font-bold'>{currentUser?.username}</span>
                  <span>!</span>
                </CardTitle>
                <CardDescription className='text-md'>
                  We're thrilled to see you here. Your presence inspires the
                  best work in our community, enabling everyone to achieve their
                  goals through knowledge and collaboration. Keep up the great
                  work, and let's continue exploring and sharing insightful
                  articles together!
                </CardDescription>
                <Button
                  asChild
                  className='bg-indigo-600 hover:bg-indigo-900 w-[150px]'
                >
                  <Link to={'/profile'}>
                    <p>View Profile</p>
                  </Link>
                </Button>
              </div>
              <div>
                <img src='/dashboard-graphics.png' />
              </div>
            </CardContent>
          </Card>
          <div>
            <div className='flex w-full justify-between mb-4'>
              <p className='text-xl font-bold'>Recent articles</p>
              <Button asChild variant='link'>
                <Link to={`/articles/recent`}>View All</Link>
              </Button>
            </div>
            <Card className='bg-transparent border-none shadow-none'>
              <CardContent className='grid grid-cols-3 gap-8'>
                {isLoading && (
                  <div className='col-span-3 flex items-center justify-center'>
                    <Spinner />
                  </div>
                )}
                {isError && (
                  <div className='col-span-3'>
                    <p>{error.message}</p>
                  </div>
                )}
                {data?.slice(0, 3).map((article) => (
                  <Card className='border-none rounded-2xl' key={article.slug}>
                    <CardHeader>{article.title}</CardHeader>
                    <CardContent>
                      <CardDescription>{article.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className='border-none rounded-2xl'>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  )
}

export default HomePage
