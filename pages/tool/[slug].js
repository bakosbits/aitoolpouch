import { getAllTools } from '@/lib/airtable'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  const tools = await getAllTools()
  const paths = tools.map((tool) => ({
    params: { slug: tool.Slug.toLowerCase() }
  }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const tools = await getAllTools()
  const tool = tools.find((t) => t.Slug.toLowerCase() === params.slug.toLowerCase())
  return { props: { tool } }
}

export default function ToolDetail({ tool }) {
  const router = useRouter()
  if (!tool) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{tool.Name}</h1>
      <p className="text-gray-700 mb-4">{tool.Description}</p>
      {tool['Base Model'] && (
        <p className="text-sm text-blue-500 mb-2">
          Powered by <strong>{tool['Base Model']}</strong>
        </p>
      )}
      {tool.Y && (
        <p className="text-sm text-gray-600 italic mb-4">Why it matters: {tool.Y}</p>
      )}
      {tool.Link && (
        <a href={tool.Link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Visit Tool Website
        </a>
      )}
    </div>
  )
}
