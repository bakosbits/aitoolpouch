import { getAllTools, getAllCategories } from "@/lib/airtable";
import ToolDetailCard from "@/components/ToolDetailCard";
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
        revalidate: 21600,
    };
}

export default function ComparePage({ toolA, toolB }) {
    if (!toolA || !toolB) return <p>Comparison failed.</p>;

    return (
        <div className="max-w-6xl mx-auto">
            {/* <div className="flex items-center justify-between"> */}
            <div className="h-full flex items-center justify-between border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                <h1 className="text-3xl text-headingWhite font-bold">
                    Comparing {toolA.Name} -to- {toolB.Name}
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
