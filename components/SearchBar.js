import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    console.log("SearchBar component rendered.");

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        console.log(`Search initiated. Query input: "${query}"`);

        if (query.trim()) {
            const encodedQuery = encodeURIComponent(query.trim());
            console.log(`Valid query found: "${query.trim()}". Navigating to: /tools?q=${encodedQuery}`);
            router.push(`/tools?q=${encodedQuery}`);
        } else {
            console.log("Search attempted with empty or whitespace-only query. No action taken.");
        }
    };

    return (
        <form onSubmit={handleSearch} className="gap-4">
            <div className="w-full flex justify-start gap-4">
                <div className="flex-grow">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            //console.log(`Search input changed: "${e.target.value}"`);
                            setQuery(e.target.value);
                        }}
                        placeholder="Search tools..."
                        className="w-full px-4 py-2 rounded-md bg-backgroundDark text-whiteHeading placeholder-text-whiteHeading border border-accentGreen"
                    />
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-1 bg-accentGreen text-backgroundDark px-3 py-1.5 rounded font-semibold hover:bg-headingWhite transition"
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
                    Search
                </button>
            </div>
        </form>
    );
}