import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllTools } from "@/lib/airtable";
import ToolCard from "@/components/ToolCard";
import CompareBar from '@/components/CompareBar';
import BackButton from "@/components/BackButton";
import SearchBar from "@/components/SearchBar";
import SeoHead from "@/components/SeoHead";
import Pagination from "@/components/Pagination";

const ITEMS_PER_PAGE = 12;

export async function getStaticProps() {
    const tools = await getAllTools();

    return {
        props: {
            tools,
        },
        revalidate: 1800,
    };
}

export default function ToolsPage({ tools }) {
    const router = useRouter();
    const query = router.query.q?.toLowerCase() || '';

    const [filteredTools, setFilteredTools] = useState(tools);
    const [currentPage, setCurrentPage] = useState(1);


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

    // Filter tools based on the search query
    useEffect(() => {
        if (query) {
            const filtered = tools.filter((tool) => {
                const name = tool.Name?.toLowerCase() || '';
                const desc = tool.Description?.toLowerCase() || '';
                const detail = tool.Detail?.toLowerCase() || '';
                const features =
                    Array.isArray(tool.Features)
                        ? tool.Features.join(' ').toLowerCase()
                        : (tool.Features || '').toLowerCase();

                return (
                    name.includes(query) ||
                    desc.includes(query) ||
                    detail.includes(query) ||
                    features.includes(query)
                );
            })
                .sort((a, b) => a.Name.localeCompare(b.Name));

            setFilteredTools(filtered);
            setCurrentPage(1);

        } else {
            const sorted = [...tools].sort((a, b) => a.Name.localeCompare(b.Name));
            setFilteredTools(sorted);
        }
    }, [query, tools]);

    const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTools = filteredTools.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const isSearch = query.trim() !== '';

    return (
        <>
            <SeoHead
                title={isSearch ? `Search Results for "${query}"` : 'Browse All Tools'}
                description={isSearch ? `Tools matching "${query}"` : 'Explore our full library of AI tools'}
                url={`https://aitoolpouch.com/tools/`}
            />

            <div className="max-w-6xl mx-auto flex flex-col items-start">
                <div className="w-full mb-6">
                    <CompareBar compareList={compareList} toggleCompare={toggleCompare} />
                </div>
                <div className="w-full mb-6">
                    < SearchBar tools={tools} />
                </div>
                <div className="w-full flex justify-between items-center  mb-6">
                    <h1 className="text-2xl text-headingWhite font-bold">
                        {isSearch ? `Search Results for "${query}"` : 'Browsing All Tools'}
                    </h1>
                </div>
                <div className="w-full">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {paginatedTools.map((tool) => (
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

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </>
    );
}
