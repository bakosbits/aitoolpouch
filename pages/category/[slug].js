import { getAllCategories, getToolsByCategory } from "@/lib/airtable";
import ToolCard from "@/components/ToolCard";
import ToolCompareSelector from "@/components/ToolCompareSelector";
import BackButton from "@/components/BackButton";
import SeoHead from "@/components/SeoHead";

export async function getStaticPaths() {
    const categories = await getAllCategories();

    const paths = categories.map((cat) => ({
        params: { slug: cat.slug },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    // Fetch categories first so we can use them to get the display name
    const categories = await getAllCategories();

    // Find the full category record by matching slug
    const matchingCategory = categories.find((cat) => cat.slug === slug);

    // If the slug is invalid (no match), return 404
    if (!matchingCategory) {
        return {
            notFound: true,
        };
    }

    // Then get all tools in this category using the slug
    const tools = await getToolsByCategory(slug);

    return {
        props: {
            tools,
            category: matchingCategory.name,
            categories,
        },
        revalidate: 21600,
    };
}

export default function CategoryPage({ tools, category }) {
    if (!category) {
        return (
            <p className="text-red-600 text-center mt-6">Category not found.</p>
        );
    }

    const sortedTools = [...tools].sort((a, b) =>
        (a.Name || "").localeCompare(b.Name || ""),
    );

    return (
        <>
            <SeoHead
                title={`AI Tools in ${category.Name}`}
                description={`AI Tools in ${category.Name}. Research And Compare AI Tools Side By Side. Grouped By Profession.`}
                url={`https://aitoolpouch.com/category/${category.Name}/`}
            />
            <div className="max-w-6xl mx-auto">
                <div className="w-full flex justify-between items-center border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                    <h1 className="text-3xl text-headingWhite font-bold">
                        Compare Tools for {category}
                    </h1>
                    <BackButton />
                </div>

                {tools.length > 1 && (
                    <div className="mb-6">
                        <ToolCompareSelector tools={tools} />
                    </div>
                )}
                <div className="w-full">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {sortedTools.map((tool) => (
                            <li key={tool.Name} className="h-full">
                                <ToolCard tool={tool} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
