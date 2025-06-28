
import { getPublishedArticles } from '@/lib/airtable'
import Link from 'next/link'

export async function getStaticProps() {
  const articles = await getPublishedArticles()
  return { props: { articles } }
}

export default function BlogPage({ articles }) {
  return (
    <div className="bg-backgroundDark max-w-4xl mx-auto w-full px-4 py-4">
      <h1 className="text-3xl text-headingWhite font-bold mb-6">AI Tool Pouch Blog</h1>
      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.id} className="bg-gray-100 border border-gray-300 p-4 rounded">
            <Link href={`/blog/${article.Slug}`}>
              <h2 className="text-xl text-headingWhite font-bold text-blue-700 hover:test.headingWhite">{article.Title}</h2>
            </Link>
            <p className=" text-grayText mt-2">{article.Excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
