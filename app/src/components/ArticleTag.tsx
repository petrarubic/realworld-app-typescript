function ArticleTag({ tag }: { tag: string }) {
  return (
    <span className='inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2'>
      {tag}
    </span>
  )
}

export default ArticleTag
