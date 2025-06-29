import { useRouter } from 'next/router'
import { getAllTools, getAllCategories } from '@/lib/airtable'
import ToolDetailCard from '@/components/ToolDetailCard'
import BackButton from '@/components/BackButton'
import Link from 'next/link'

export async function getStaticPaths() {
  const tools = await getAllTools()

  const paths = tools.map((tool) => ({
    params: { slug: tool.Slug.toLowerCase() }
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const tools = await getAllTools()

  const tool = tools.find(t => t.Slug.toLowerCase() === params.slug)

  
  return {
    props: {
      tool
    }
  }
}

export default function ToolPage({ tool }) {

  const categoriesList = Array.isArray(tool.Categories) ? tool.Categories : [];

  return (

    <div className="w-[80%] mx-auto py-12">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* Left: Image Column */}
        <div className="w-full md:w-[35%] flex justify-center items-start">
          <img
          src="/images/wrench1.jpg" 
          style= {{ filter: 'grayscale(.5) saturate(110%) brightness(0.95) contrast(0.98)' }}
          alt="AI Wrenches"
          className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"

          />
        </div>
        
        {/* Spacer */}
        <div className="hidden md:block w-[2%]" />

        { /* Right: Content Column */}
        <div className="w-full md:w-[53%]">
            <h1 className="text-2xl text-headingWhite font-bold mt-6 mb-2 ">{tool.Name}</h1>
            <p className="text-headingWhite mb-2">Categories: {''} 
              {tool.Categories && tool.Categories.length > 0
                ? tool.Categories.map((cat, idx) => (
                    <span key={cat.slug || cat.name}>
                      <Link href={`/category/${cat.slug || cat.name.toLowerCase()}`}
                        className="text-accentGreen hover:text-headingWhite"
                      >
                        {cat.name}
                      </Link>
                      {idx < tool.Categories.length - 1 ? ', ' : ''}
                    </span>
                  ))
                : 'Uncategorized'}
            </p>
            <p className="mb-2"><BackButton /></p>
          <ToolDetailCard tool={tool} />    
        </div>
      </div>
    </div>

  )
} 