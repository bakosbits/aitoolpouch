import { useState } from "react";
import { getAllCategories, getToolsByCategory } from "@/lib/airtable";
import ToolCard from "@/components/ToolCard";
import SeoHead from "@/components/SeoHead";
import CompareBar from "@/components/CompareBar";

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
    const [compareList, setCompareList] = useState([]);

    const toggleCompare = (tool) => {
        setCompareList((prev) => {
            const exists = prev.find((t) => t.id === tool.id);
            if (exists) {
                return prev.filter((t) => t.id !== tool.id);
            } else {
                return prev.length < 2 ? [...prev, tool] : prev;
            }
        });
    };

    const sortedTools = [...tools].sort((a, b) => a.Name.localeCompare(b.Name));

    return (
        <>
            <SeoHead
                title={`AI Tools in ${category}`}
                description={`AI Tools in ${category}. Research And Compare AI Tools Side By Side. Grouped By Profession.`}
                url={`https://aitoolpouch.com/category/${category}/`}
            />
            <div className="w-full mb-6">
                <CompareBar compareList={compareList} toggleCompare={toggleCompare} />
            </div>            
            <div className="max-w-6xl mx-auto">
                <div className="w-full flex justify-between items-center mb-6">
                    <h1 className="text-2xl text-headingWhite font-bold">
                        Compare Tools for {category}
                    </h1>
                </div>
                <div className="w-full">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {sortedTools.map((tool) => (
                            <li key={tool.Name}>
                                <ToolCard
                                    tool={tool}
                                    compareList={compareList}
                                    toggleCompare={toggleCompare}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
