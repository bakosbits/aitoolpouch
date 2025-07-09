import { useRouter } from "next/router";
import { getAllTools, getAllCategories } from "@/lib/airtable";
import DetailToolCard from "@/components/DetailToolCard";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const tools = await getAllTools();

    const paths = tools.map((tool) => ({
        params: { slug: tool.Slug.toLowerCase() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const tools = await getAllTools();

    const tool = tools.find((t) => t.Slug.toLowerCase() === params.slug);

    return {
        props: {
            tool,
        },
        revalidate: 1800,
    };
}

export default function ToolPage({ tool }) {
    const categoriesList = Array.isArray(tool.Categories)
        ? tool.Categories
        : [];

    return (
        <>
            <SeoHead
                title={`${tool.Name}`}
                description={`Detailed Information about ${tool.Name}`}
                url={`https://aitoolpouch.com/tool/${tool.Name}/`}
            />
            <div className="flex mx-auto items-center justify-center">
                <div className="w-full mx-auto max-w-6xl">
                    <div className="flex">
                            <h1 className="text-2xl text-headingWhite font-bold mb-4">
                                Reviewing {tool.Name}
                            </h1>
                    </div>

                    <div className="flex gap-6">
                        <div className="w-full flex">
                            <DetailToolCard tool={tool} />
                        </div>

                        {/* Right column: image + categories stacked */}
                        <div className="w-full w-[20%] hidden md:flex md:flex-col flex items-start text-left">
                            <img
                                src={`https://cdn.brandfetch.io/${tool.Domain}/icon?c=1id03xd53EDa-VjPpgF`}
                                alt={tool.Name}
                                className="object-cover rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)] mb-4"
                            />
                            <h1 className="text-xl font-bold text-headingWhite mb-2">
                                Found in:
                            </h1>
                            <p className="text-left">
                                {""}
                                {tool.Categories && tool.Categories.length > 0
                                    ? tool.Categories.map((cat, idx) => (
                                        <span key={cat.slug || cat.name}>
                                            <Link
                                                href={`/category/${cat.slug || cat.name.toLowerCase()}`}
                                                className="text-left text-accentGreen hover:text-headingWhite"
                                            >
                                                {cat.name}
                                            </Link>
                                            {idx < tool.Categories.length - 1
                                                ? ", "
                                                : ""}
                                        </span>
                                    ))
                                    : "Uncategorized"}
                            </p>
                        </div>                            
                    </div>
                </div>                        
            </div>
        </>
    );
}