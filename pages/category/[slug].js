import { useState, useEffect, useCallback, useMemo } from "react";
import { getAllCategories, getToolsByCategory } from "@/lib/airTable";

import ToolCard from "@/components/ToolCard";
import SeoHead from "@/components/SeoHead";
import CompareBar from "@/components/CompareBar";
import Pagination from "@/components/Pagination";

// Server-side: getStaticPaths
export async function getStaticPaths() {
    console.log("[getStaticPaths] Generating paths for category pages...");
    try {
        const categories = await getAllCategories();
        console.log(`[getStaticPaths] Found ${categories.length} categories.`);

        const paths = categories.map((cat) => ({
            params: { slug: cat.Slug },
        }));
        console.log(`[getStaticPaths] Generated ${paths.length} paths. Example: ${paths.slice(0, 3).map(p => p.params.slug).join(', ')}`);

        return { paths, fallback: false };
    } catch (error) {
        console.error("[getStaticPaths] ERROR generating paths:", error.message, error.stack);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    const slug = params.slug;

    console.log(`[getStaticProps] Fetching data for category slug: "${slug}"`);

    try {
        const categories = await getAllCategories();
        console.log(`[getStaticProps] Fetched ${categories.length} total categories.`);

        const matchingCategory = categories.find((cat) => cat.Slug === slug);

        if (!matchingCategory) {
            console.warn(`[getStaticProps] Category with slug "${slug}" not found. Returning 404.`);
            return {
                notFound: true,
            };
        }
        console.log(`[getStaticProps] Matching category found: "${matchingCategory.Name}"`);

        const tools = await getToolsByCategory(slug);
        console.log(`[getStaticProps] Fetched ${tools.length} tools for category "${matchingCategory.Name}".`);

        console.log(`[getStaticProps] Returning props for "${matchingCategory.Name}" category.`);
        return {
            props: {
                tools,
                category: matchingCategory.Name,
                categories,
            },
            revalidate: 300,
        };
    } catch (error) {
        console.error(`[getStaticProps] ERROR fetching data for slug "${slug}":`, error.message, error.stack);
        return {
            notFound: true,
        };
    }
}

export default function CategoryPage({ tools, category }) {
    console.log(`[CategoryPage] Component rendered for category: "${category}". Tools count: ${tools.length}`);

    const validTools = Array.isArray(tools) ? tools : [];
    const validCategory = typeof category === "string" ? category : "Unknown";

    const [compareList, setCompareList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const toggleCompare = useCallback((tool) => {
        setCompareList((prev) => {
            const exists = prev.find((t) => t.id === tool.id);
            let newState;
            if (exists) {
                newState = prev.filter((t) => t.id !== tool.id);
                console.log(`[CategoryPage] Tool "${tool.Name}" removed from compare list.`);
            } else {
                newState = prev.length < 2 ? [...prev, tool] : prev;
                if (newState.length > prev.length) { // Only log if added
                    console.log(`[CategoryPage] Tool "${tool.Name}" added to compare list. Current count: ${newState.length}`);
                } else {
                    console.warn(`[CategoryPage] Attempted to add "${tool.Name}" to compare list, but already at max (2).`);
                }
            }
            return newState;
        });
    }, []);

    const ITEMS_PER_PAGE = 12;
    const sortedTools = useMemo(() => {
        const sorted = [...validTools].sort((a, b) => a.Name.localeCompare(b.Name));
        console.log(`[CategoryPage] Tools sorted. Total: ${sorted.length}`);
        return sorted;
    }, [validTools]);

    const totalPages = Math.ceil(sortedTools.length / ITEMS_PER_PAGE);
    console.log(`[CategoryPage] Pagination calculated: ${sortedTools.length} tools, ${ITEMS_PER_PAGE} per page, Total Pages: ${totalPages}`);

    const paginatedTools = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const currentBatch = sortedTools.slice(startIndex, endIndex);
        console.log(`[CategoryPage] Paginated tools for page ${currentPage}: ${currentBatch.length} items (from index ${startIndex} to ${endIndex-1})`);
        return currentBatch;
    }, [sortedTools, currentPage]);

    // This useEffect is good, but the commented one is usually important for resetting pagination
    // useEffect(() => {
    //     console.log("[CategoryPage] Tools/category changed, resetting current page to 1.");
    //     setCurrentPage(1);
    // }, [tools, category]); // Re-enable this if tools or category changing should reset pagination

    useEffect(() => {
        console.log(`[CategoryPage] Scrolling to top for page change to ${currentPage}.`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    console.log(`[CategoryPage] Setting SEO title: "AI Tools in ${validCategory}"`);

    return (
        <>
            <SeoHead
                title={`AI Tools in ${validCategory}`}
                description={`AI Tools in ${validCategory}. Research And Compare AI Tools Side By Side. Grouped By Profession.`}
                url={`https://aitoolpouch.com/category/${validCategory}/`}
            />
            <div className="w-full mb-6">
                <CompareBar
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                    compareDisabled={
                        compareList.length === 2
                    }
                />
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="w-full grid grid-cols-1 justify-between items-center mb-4">
                    <h1 className="text-2xl text-headingWhite font-bold">
                        Compare Tools for {validCategory}
                    </h1>
                </div>
                <div className="w-full">
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                        {paginatedTools.map((tool) => (
                            <li key={tool.id}>
                                <ToolCard
                                    tool={tool}
                                    compareList={compareList}
                                    toggleCompare={toggleCompare}
                                    compareDisabled={
                                        compareList.length === 2 && !compareList.some((t) => t.id === tool.id)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => {
                            console.log(`[CategoryPage] Pagination: Changing to page ${page}.`);
                            setCurrentPage(page);
                        }}
                    />
                )}
            </div>
        </>
    );
}