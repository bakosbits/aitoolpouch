import { getAllTools, getAllCategories } from '@/lib/airtable'
import ToolDetailCard from '@/components/ToolDetailCard'

export async function getStaticPaths() {
  const tools = await getAllTools()

  const paths = tools.map((tool) => ({
    params: { slug: tool.Slug.toLowerCase() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const tools = await getAllTools()
  const categories = await getAllCategories()

  const tool = tools.find(t => t.Slug.toLowerCase() === params.slug)

  return {
    props: {
      tool,
      categories // ✅ ADD THIS
    }
  }
}

export default function ToolPage({ tool, categories }) {
  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-4">
      <ToolDetailCard tool={tool} />
    </div>
  )
}
