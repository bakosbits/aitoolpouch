import { getPublishedArticles } from '@/lib/airtable'
import Link from 'next/link'

export async function getStaticProps() {
  const articles = await getPublishedArticles()
  return { props: { articles } }
}

export default function BlogPage({ articles }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">AI Tool Pouch Blog</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id} className="border-b pb-4">
            <Link href={`/blog/${article.Slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{article.Title}</h2>
            </Link>
            <p className="text-sm text-gray-700">{article.Excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
