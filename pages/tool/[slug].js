import Image from "next/image";
import { getAllTools, getAllCategories } from "@/lib/airTable";
import DetailToolCard from "@/components/DetailToolCard";
import Link from "next/link";
import SeoHead from "@/components/SeoHead";
import LogoCard from "@/components/LogoCard";

export async function getStaticPaths() {
    const tools = await getAllTools();

    const paths = tools.map((tool) => ({
        params: { slug: tool.Slug.toLowerCase() },
    }));

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const tools = await getAllTools();

    const tool = tools.find((t) => t.Slug.toLowerCase() === params.slug);

    if (!tool) {
        return { notFound: true };
    }

    return {
        props: {
            tool,
        },
        revalidate: 300,
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
                url={`https://aitoolpouch.com/tool/${tool.Slug}/`}
            />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="w-full max-w-6xl">
                    {/* Top Row */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h1 className="text-2xl text-headingWhite font-bold">
                            Reviewing {tool.Name}
                        </h1>
                    </div>
                    {/* Left column */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-[80%] flex">
                            <DetailToolCard tool={tool} />
                        </div>
                        {/* Right column */}
                        <div className="w-full md:w-[20%] flex flex-col items-start text-left mt-6 md:mt-0">
                            <LogoCard
                                name={tool.Name}
                                domain={tool.Domain}
                                klassName="object-cover rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)] mb-4"
                            />
                            <h1 className="text-xl font-bold text-headingWhite mb-2">
                                Found in:
                            </h1>
                            <p className="text-left">
                                {tool.Categories?.length > 0
                                    ? tool.Categories.map((cat, idx) => (
                                        <Link
                                            key={cat.Slug || cat.Name}
                                            href={`/category/${cat.Slug || cat.Name.toLowerCase()}`}
                                            className="text-accentGreen hover:text-headingWhite"
                                        >
                                            {cat.Name}
                                        </Link>
                                    ))
                                        .reduce((acc, curr, idx) => acc.concat(idx > 0 ? [", ", curr] : [curr]), [])
                                    : "Uncategorized"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
