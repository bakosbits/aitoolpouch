import { useRouter } from "next/router";
import { getAllTools, getAllCategories } from "@/lib/airtable";
import ToolDetailCard from "@/components/ToolDetailCard";
import BackButton from "@/components/BackButton";
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
        revalidate: 21600,
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
            {/* OUTER WRAPPER: 90% of screen width, centered */}
            <div className="w-[80%] mx-auto flex flex-col md:flex-row">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start">
                    {/* LEFT COLUMN: 60% of outer container */}
                    <div className="w-full flex justify-center">
                        {/* INNER WRAPPER: 80% of left column, padded on mobile */}
                        <div className="w-full md:w-[90%] px-4 sm:px-6 md:px-0 text-left flex flex-col">
                            <div className="w-full flex justify-between items-center border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                                <h1 className="text-3xl text-headingWhite font-bold ">
                                    Reviewing {tool.Name}
                                </h1>
                                <BackButton />
                            </div>
                            <div>
                                <ToolDetailCard tool={tool} />
                            </div>
                        </div>
                    </div>

                    {/* Right column: image */}
                    <div className="w-full md:w-[20%]">
                        <img
                            src={`${tool.Logo}`}
                            style={{
                                filter: "saturate(110%) brightness(0.95) contrast(1)",
                            }}
                            alt="AI Wrenches"
                            className="object-cover rounded-lg shadow-4xl shadow-[0_6px_16px_rgba(0,255,128,0.25)]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
