import { useUserData } from '@/auth'
import { Badge } from '@/components/ui/badge'
import { fetchFavoriteTags } from '@/service/tagsService'
import { useEffect, useState } from 'react'
import Spinner from '../shared/Spinner'
import { generateHashCode, intToRGB } from '@/utils/utils'

function getColorForTag(tag: string) {
  const colorCode = intToRGB(generateHashCode(tag))
  return colorCode
}

function FavoriteTagsList() {
  const [favoriteTags, setFavoriteTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const currentUser = useUserData()

  useEffect(() => {
    async function fetchData() {
      try {
        const tags = await fetchFavoriteTags(currentUser?.username)

        setFavoriteTags(tags)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching favorite tags:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  })

  if (isLoading || favoriteTags.length < 1) {
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
    <div className='flex flex-wrap gap-1 py-4'>
      {favoriteTags.map(
        (t, index) =>
          t !== '' && (
            <Badge
              variant='secondary'
              key={index}
              className='h-6 mb-2 whitespace-nowrap'
              style={{ backgroundColor: getColorForTag(t) }}
            >
              {t}
            </Badge>
          )
      )}
    </div>
  )
}

export default FavoriteTagsList
