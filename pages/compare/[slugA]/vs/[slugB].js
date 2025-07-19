import { getAllTools, getAllCategories } from "@/lib/airTable";

import DetailToolCard from "@/components/DetailToolCard";
import SeoHead from "@/components/SeoHead";

// Server-side: getStaticPaths
export async function getStaticPaths() {

    console.log("[getStaticPaths] Generating paths for compare pages. Using fallback: 'blocking'.");

    const tools = await getAllTools(); 
    const paths = [];
    console.log(`[getStaticPaths] Returning ${paths.length} paths for build (if any). Relying on 'blocking' fallback for dynamic paths.`);

    return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
    const { slugA, slugB } = params;
    console.log(`[getStaticProps] Fetching data for comparison: "${slugA}" vs "${slugB}"`);


    const tools = await getAllTools();
    console.log(`[getStaticProps] Fetched ${tools.length} total tools from Airtable.`);

    console.log(`[getStaticProps] Searching for toolA with slug: "${slugA}"`);
    const toolA = tools.find((t) => t.Slug.toLowerCase() === params.slugA);
    console.log(`[getStaticProps] Tool A found: ${toolA ? toolA.Name : 'NOT FOUND'}`);

    console.log(`[getStaticProps] Searching for toolB with slug: "${slugB}"`);
    const toolB = tools.find((t) => t.Slug.toLowerCase() === params.slugB);
    console.log(`[getStaticProps] Tool B found: ${toolB ? toolB.Name : 'NOT FOUND'}`);

    if (!toolA || !toolB) {
        console.warn(`[getStaticProps] One or both tools not found for comparison (${slugA} vs ${slugB}). Returning notFound: true.`);
        return { notFound: true };
    }

    const categoriesA = Array.isArray(toolA?.Categories)
        ? toolA.Categories.map((cat) =>
                typeof cat === "object" ? cat.Name : cat,
            )
        : [];
    console.log(`[getStaticProps] Categories for ${toolA.Name}:`, categoriesA.join(', '));

    const categoriesB = Array.isArray(toolB?.Categories)
        ? toolB.Categories.map((cat) =>
                typeof cat === "object" ? cat.Name : cat,
            )
        : [];
    console.log(`[getStaticProps] Categories for ${toolB.Name}:`, categoriesB.join(', '));


    const hasSharedCategory = categoriesA.some((cat) =>
        categoriesB.includes(cat),
    );
    console.log(`[getStaticProps] Shared category between ${toolA.Name} and ${toolB.Name}: ${hasSharedCategory}`);

    console.log(`[getStaticProps] Successfully prepared data for comparison: ${toolA.Name} vs ${toolB.Name}.`);
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
    console.log(`[ComparePage] Component rendered. Comparing: ${toolA?.Name || 'N/A'} vs ${toolB?.Name || 'N/A'}`);

    if (
        !toolA || !toolB ||
        !toolA.Name || !toolB.Name ||
        !toolA.Slug || !toolB.Slug
    ) {
        console.error("[ComparePage] Missing tool data on client-side render. Displaying error message.");
        return (
            <div className="max-w-2xl mx-auto py-12 text-center text-headingWhite">
                <h2 className="text-xl font-bold mb-2">Comparison Not Available</h2>
                <p>Sorry, one or both tools could not be loaded. Please try again later.</p>
            </div>
        );
    }
    console.log(`[ComparePage] Setting SEO title: "Compare ${toolA.Name} Against ${toolB.Name}"`);

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
                    {[toolA, toolB].map((tool) => (
                        <DetailToolCard key={tool.Slug || tool.Name} tool={tool} />
                    ))}
                </div>
            </div>
        </>
    );
}