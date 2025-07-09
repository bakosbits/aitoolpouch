import { getAllTools, getAllCategories } from "@/lib/airtable";
import { useState } from "react";
import DetailToolCard from "@/components/DetailToolCard";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const tools = await getAllTools();
    const paths = [];

    tools.forEach((toolA) => {
        tools.forEach((toolB) => {
            if (toolA.Slug !== toolB.Slug) {
                paths.push({
                    params: {
                        slugA: toolA.Slug.toLowerCase(),
                        slugB: toolB.Slug.toLowerCase(),
                    },
                });
            }
        });
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const tools = await getAllTools();

    const toolA = tools.find((t) => t.Slug.toLowerCase() === params.slugA);
    const toolB = tools.find((t) => t.Slug.toLowerCase() === params.slugB);

    const categoriesA = Array.isArray(toolA?.Categories)
        ? toolA.Categories.map((cat) =>
              typeof cat === "object" ? cat.name : cat,
          )
        : [];

    const categoriesB = Array.isArray(toolB?.Categories)
        ? toolB.Categories.map((cat) =>
              typeof cat === "object" ? cat.name : cat,
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
        revalidate: 21600,
    };
}

export default function ComparePage({ toolA, toolB, hasSharedCategory }) {
    const [showWarning, setShowWarning] = useState(true);

    return (
        <>
            <SeoHead
                title={`Compare ${toolA.Name} Against ${toolB.Name}`}
                description={`Compare ${toolA.Name} and ${toolB.Name} across features, pricing, and ideal use cases.`}
                url={`https://aitoolpouch.com/compare/${toolA.Slug}/vs/${toolB.Slug}`}
            />
            <div className="max-w-6xl mx-auto">
                {showWarning && !hasSharedCategory && (
                    <div className="h-full flex items-center justify-between border border-red-600 p-6 rounded-lg text-headingWhite bg-backgroundDark mb-6">
                        <span>
                            Heads up! These tools belong to different
                            categories. For best results consider comparing
                            tools in the same
                            <a
                                href="/categories"
                                className="text-accentGreen hover:text-headingWhite transition-colors duration-150"
                            >
                                <span bg-backgroundDark> category.</span>
                            </a>
                        </span>
                        <button
                            onClick={() => setShowWarning(false)}
                            className="ml-4 text-red-600 hover:text-red-800 text-xl font-bold"
                            aria-label="Close warning"
                        >
                            ×
                        </button>
                    </div>
                )}
                <div className="h-full flex items-center justify-between mb-6">
                    <h1 className="text-2xl text-headingWhite font-bold">
                        Comparing {toolA.Name} -to- {toolB.Name}
                    </h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Map into the ToolCard */}
                    {[toolA, toolB].map((tool, index) => (
                        <DetailToolCard key={index} tool={tool} />
                    ))}
                    {/* end map */}
                </div>
            </div>
        </>
    );
}
