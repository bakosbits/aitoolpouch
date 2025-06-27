import { useRouter } from 'next/router'
import { getAllTools, getAllCategories } from '@/lib/airtable'
import ToolDetailCard from '@/components/ToolDetailCard'
import BackButton from '@/components/BackButton'

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
      categories
    }
  }
}

export default function ToolPage({ tool, categories }) {
  const router = useRouter()
  const isFullWidth =
    router.pathname === '/' ||
    router.pathname === '/categories' ||
    router.pathname.startsWith('/tool')

  return (

    <div className="w-[80%] mx-auto py-12">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Column */}
        <div className="w-full md:w-[35%] flex justify-center items-start">
          <img
            src={`/images/image3.jpg`}
            alt="page image"
            className="w-auto h-auto object-cover rounded-lg shadow-2xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
          />
        </div>

        {/* Spacer */}
        <div className="hidden md:block w-[2%]" />

        {/* Right: Content Column */}
        <div className="w-full md:w-[53%]">
          <div className="flex items-center justify-between mt-6 mb-8">
            <h2 className="text-2xl font-bold text-headingWhite">{tool.Name}</h2>
            <BackButton />
          </div>
          <ToolDetailCard tool={tool} />
        </div>
      </div>
    </div>
  )
}; 