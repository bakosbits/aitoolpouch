import { useRouter } from 'next/router'

export async function getStaticPaths() {
  // Replace with real Airtable fetch later
  const slugs = ['ai-for-copywriters', 'choosing-ai-tools']

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Replace with real Airtable fetch later
  const article = {
    title: 'AI for Copywriters',
    content: 'This is a placeholder for a full article body.',
    author: 'Jane Doe',
    publishedDate: '2025-06-20',
  }

  return {
    props: { article },
  }
}

export default function BlogPost({ article }) {
  const router = useRouter()
  if (router.isFallback) return <p>Loading...</p>

  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-8">By {article.author} · {article.publishedDate}</p>
      <article className="prose prose-lg max-w-none">
        <p>{article.content}</p>
      </article>
    </main>
  )
}
