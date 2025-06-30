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

                {/* Left: Image + Caption Column */}
                <div className="w-full md:w-[35%] flex flex-col items-center text-center">
                    <img
                        src="/images/wrench1.jpg"
                        style={{
                            filter: 'grayscale(.5) saturate(110%) brightness(0.95) contrast(0.98)',
                        }}
                        alt="AI Wrenches"
                        className="w-auto h-auto object-cover rounded-lg shadow-3xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                    />

                    {/* Spacer */}
                    <p className="text-headingWhite mt-12 mb-2"></p>

                    <p className="text-headingWhite mt-12 mb-4">
                        {tool.Name} Can Be Found In The Following Categories:
                    </p>

                    <p className="text-headingWhite">{' '}
                        {tool.Categories && tool.Categories.length > 0
                            ? tool.Categories.map((cat, idx) => (
                                <span key={cat.slug || cat.name}>
                                    <Link
                                        href={`/category/${cat.slug || cat.name.toLowerCase()}`}
                                        className="text-accentGreen hover:text-headingWhite"
                                    >
                                        {cat.name}
                                    </Link>
                                    {idx < tool.Categories.length - 1 ? ', ' : ''}
                                </span>
                            ))
                            : 'Uncategorized'}
                    </p>
                    <p className="text-grayText mt-4 mb-12">
                        We encourage you to visit our
                        < a href={`/categories`} className="text-accentGreen hover:text-headingWhite"> categories </a>
                        page. There you'll be able to research differnt categories and compare similar tools side-by-side.
                    </p>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[2%]" />

                { /* Right: Content Column */}
                <div className="w-full md:w-[53%]">

                    {/* Heading on its own line */}


                    {/* Flex container with left/right items on same row */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl text-headingWhite font-bold mb-2">
                            {tool.Name}
                        </h1>
                      
                            <BackButton />
                    
                    </div>
                    <ToolDetailCard tool={tool} />
                </div>
            </div>
        </div>
    )
} 