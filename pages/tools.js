import { useState } from "react";
import { useEffect } from "react";
import { getAllTools } from "@/lib/airtable";
import ToolCard from "@/components/ToolCard";
import BackButton from "@/components/BackButton";

const ITEMS_PER_PAGE = 12;

export async function getStaticProps() {
    const tools = await getAllTools();

    return {
        props: {
            tools,
        },
        revalidate: 21600,
    };
}

export default function ToolsPage({ tools }) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    const sortedTools = [...tools].sort((a, b) =>
        (a.Name || "").localeCompare(b.Name || ""),
    );

    const totalPages = Math.ceil(sortedTools.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTools = sortedTools.slice(startIndex, endIndex);

    return (
        <div className="w-full lg:w-[80%] mx-auto flex flex-col items-start py-12">
            <div className="w-full flex justify-between items-center mb-2">
                <h1 className="text-3xl text-headingWhite font-bold Capitalize">
                    Browsing All Tools
                </h1>
                <BackButton />
            </div>

            <div className="w-full">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginatedTools.map((tool) => (
                        <li key={tool.Name}>
                            <ToolCard tool={tool} />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-end w-full mt-10 space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded ${
                                    currentPage === page
                                        ? "bg-accentGreen text-black font-bold"
                                        : "bg-gray-700 text-white"
                                }`}
                            >
                                {page}
                            </button>
                        ),
                    )}
                </div>
            )}
        </div>
    );
}
