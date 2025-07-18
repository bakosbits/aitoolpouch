import { getAllTools, getAllCategories } from "@/lib/airTable";
import { useState } from "react";
import DetailToolCard from "@/components/DetailToolCard";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const tools = await getAllTools();
    const paths = [];


    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const tools = await getAllTools();

    const toolA = tools.find((t) => t.Slug.toLowerCase() === params.slugA);
    const toolB = tools.find((t) => t.Slug.toLowerCase() === params.slugB);

    if (!toolA || !toolB) {
        return { notFound: true };
    }

    const categoriesA = Array.isArray(toolA?.Categories)
        ? toolA.Categories.map((cat) =>
              typeof cat === "object" ? cat.Name : cat,
          )
        : [];

    const categoriesB = Array.isArray(toolB?.Categories)
        ? toolB.Categories.map((cat) =>
              typeof cat === "object" ? cat.Name : cat,
          )
        : [];

    const hasSharedCategory = categoriesA.some((cat) =>
        categoriesB.includes(cat),
    );


    return {
        props: {
            toolA,
            toolB,
            hasSharedCategory,
        },
        revalidate: 300,
    };
}

export default function ComparePage({ toolA, toolB, hasSharedCategory }) {

    return (
        <>
            <SeoHead
                title={`Compare ${toolA.Name} Against ${toolB.Name}`}
                description={`Compare ${toolA.Name} and ${toolB.Name} across features, pricing, and ideal use cases.`}
                url={`https://aitoolpouch.com/compare/${toolA.Slug}/vs/${toolB.Slug}`}
            />
            <div className="max-w-7xl mx-auto">
                <div className="h-full flex items-center justify-between mb-6">
                    <h1 className="text-2xl text-headingWhite font-bold">
                        Comparing {toolA.Name} -to- {toolB.Name}
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Map into the ToolCard */}
                    {[toolA, toolB].map((tool) => (
                        <DetailToolCard key={tool.Slug} tool={tool} />
                    ))}
                    {/* end map */}
                </div>
            </div>
        </>
    );
}
