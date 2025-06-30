import { getAllTools, getAllCategories } from "@/lib/airtable";
import ToolDetailCard from "@/components/ToolCompareCard";
import BackButton from "@/components/BackButton";

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

    return {
        props: {
            toolA,
            toolB,
        },
    };
}

export default function ComparePage({ toolA, toolB }) {
    if (!toolA || !toolB) return <p>Comparison failed.</p>;

    return (
        <div className="max-w-6xl mx-auto py-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl text-headingWhite font-bold mb-8">
                    Compare {toolA.Name} -to- {toolB.Name}
                </h1>
                <BackButton />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Start here */}
                {[toolA, toolB].map((tool, index) => (
                    <ToolDetailCard key={index} tool={tool} />
                ))}
                {/* end here */}
            </div>
        </div>
    );
}
