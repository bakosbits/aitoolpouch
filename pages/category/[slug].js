import { getToolsByCategory, getAllCategories } from '@/lib/airtable'
import ToolCard from '@/components/ToolCard'
import Layout from '@/components/Layout'

// Generate all category paths at build time
export async function getStaticPaths() {
  const categories = await getAllCategories()

  const paths = categories.map((cat) => ({
    params: { slug: cat.slug } // e.g., 'sales-engineering'
  }))

  return {
    paths,
    fallback: false
  }
}

// Fetch data for each category page
export async function getStaticProps({ params }) {
  const decodedSlug = params.slug.replace(/-/g, ' ') // match Airtable format
  const tools = await getToolsByCategory(decodedSlug)
  const categories = await getAllCategories()

  return {
    props: {
      tools,
      category: decodedSlug,
      categories
    }
  }
}

// Render page
export default function CategoryPage({ tools, category, categories }) {
  return (
    <>
      <h1 className="text-2xl font-bold capitalize mb-4">{category}</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
    </>
  )
}
