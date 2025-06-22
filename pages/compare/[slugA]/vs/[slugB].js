import { getAllTools, getAllCategories } from '@/lib/airtable'
import Layout from '@/components/Layout'

export async function getStaticPaths() {
  const tools = await getAllTools()

  const paths = []

  tools.forEach(toolA => {
    tools.forEach(toolB => {
      if (toolA.Slug !== toolB.Slug) {
        paths.push({
          params: {
            slugA: toolA.Slug.toLowerCase(),
            slugB: toolB.Slug.toLowerCase()
          }
        })
      }
    })
  })

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const tools = await getAllTools()
  const categories = await getAllCategories()

  const toolA = tools.find(t => t.Slug.toLowerCase() === params.slugA)
  const toolB = tools.find(t => t.Slug.toLowerCase() === params.slugB)

  return {
    props: {
      toolA,
      toolB,
      categories
    }
  }
}

export default function ComparePage({ toolA, toolB }) {
  if (!toolA || !toolB) return <p>Comparison failed.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Compare {toolA.Name} vs {toolB.Name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[toolA, toolB].map((tool, index) => (
          <div key={index} className="p-6 bg-white border rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">{tool.Name}</h2>
            <p className="text-gray-700 mb-4">{tool.Description}</p>

            {tool['Base Model'] && (
              <p className="text-sm text-blue-500 mb-2">
                Powered by <strong>{tool['Base Model']}</strong>
              </p>
            )}

            {tool.Why && (
              <p className="text-sm text-gray-600 italic mb-4">
                Why it matters: {tool.Why}
              </p>
            )}

            {tool.Link && (
              <a
                href={tool.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Visit Tool Website
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
