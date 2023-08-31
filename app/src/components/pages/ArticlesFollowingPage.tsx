import { fetchFollowedArticles } from '../../service/articleService'
import ArticleGrid from '../shared/ArticleGrid'

function ArticlesFollowingPage() {
  return (
    <ArticleGrid
      queryKey='articles-following'
      fetchFn={(limit, offset) => fetchFollowedArticles(limit, offset)}
    />
  )
}

export default ArticlesFollowingPage
