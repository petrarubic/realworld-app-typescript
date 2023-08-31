import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { fetchFollowedAuthors } from '@/service/articleService'
import { Author } from '@/types/Author'
import { useEffect, useState } from 'react'
import Spinner from '../shared/Spinner'

function FollowedAuthorsList() {
  const [followedAuthors, setFollowedAuthors] = useState<Author[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const authors = await fetchFollowedAuthors()

        const uniqueAuthors = authors.reduce(
          (unique: Author[], author: Author) => {
            if (
              !unique.some(
                (existingAuthor: Author) =>
                  existingAuthor.username === author.username
              )
            ) {
              unique.push(author)
            }
            return unique
          },
          []
        )

        setFollowedAuthors(uniqueAuthors)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching followed authors:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center mt-5'>
        <Spinner
          fillBackground='fill-gray-200'
          fillForeground='fill-gray-600'
          dimensions='w-10 h-10'
        />
      </div>
    )
  }

  return (
    <div className='flex space-x-4 overflow-x-scroll hide-scrollbar py-4'>
      {followedAuthors.map((author) => (
        <TooltipProvider key={author.username}>
          <Tooltip>
            <TooltipTrigger>
              <Avatar className='w-20 h-20'>
                <AvatarImage
                  src={
                    author.image &&
                    author.image !==
                      'https://api.realworld.io/images/demo-avatar.png'
                      ? author.image
                      : `https://i.pravatar.cc/300?u=${author.username}`
                  }
                  alt={author.username}
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{author.username}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

export default FollowedAuthorsList
