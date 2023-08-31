import { fetchFavoriteArticles } from '../../service/articleService'
import { useUserData } from '@/auth'
import ArticleGrid from '../shared/ArticleGrid'

function ArticlesFavoritePage() {
  const currentUser = useUserData()

  return (
    <ArticleGrid
      queryKey='articles-favorite'
      fetchFn={(limit, offset) =>
        fetchFavoriteArticles(limit, offset, currentUser?.username)
      }
    />
  )
}

export default ArticlesFavoritePage
