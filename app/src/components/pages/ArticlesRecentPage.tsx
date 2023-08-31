import { fetchArticles } from '../../service/articleService'
import ArticleGrid from '../shared/ArticleGrid'

function ArticlesRecentPage() {
  return (
    <ArticleGrid
      queryKey='articles-recent'
      fetchFn={(limit, offset) => fetchArticles(limit, offset)}
    />
  )
}

export default ArticlesRecentPage
