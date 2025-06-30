import Link from "next/link";
import { getAllTools } from "@/lib/airtable";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar({ tools }) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();

        if (!Array.isArray(tools)) {
            return;
        }

        const normalized = query.trim().toLowerCase().replace(/\s+/g, "");

        const match = tools.find(
            (tool) =>
                tool.Name?.toLowerCase().replace(/\s+/g, "") === normalized ||
                tool.Slug?.toLowerCase() === normalized,
        );

        if (match) {
            router.push(`/tool/${match.Slug}`);
        } else {
            router.push("/404");
        }
    };

    if (!Array.isArray(tools)) {
        return (
            <div className="p-8 text-red-500 text-xl">
                Error loading tools. Please try refreshing or check your
                Airtable config.
            </div>
        );
    }

    return (
        <form onSubmit={handleSearch} className="w-full max-w-md mx-auto py=12">
            <div className="flex items-center gap-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a tool..."
                        className="w-full px-4 py-2 rounded-md bg-backgroundDark text-whiteHeading placeholder-text-whiteHeading border border-accentGreen"
                    />
                </div>
                <button
                    type="submit"
                    className="p-2 bg-accentGreen rounded-md hover:bg-green-400 transition"
                    aria-label="Search"
                >
                    <svg
                        className="w-6 h-6 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </form>
    );
}
