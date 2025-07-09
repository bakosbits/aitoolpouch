import Link from "next/link";

export default function CompareBar({ compareList = [], toggleCompare }) {
    if (compareList.length === 0) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-backgroundDark border-b border-accentGreen p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4 flex-wrap">
                <span className="text-whiteHeading font-bold">Comparing:</span>
                {compareList.map((tool) => (
                    <div
                        key={tool.id}
                        className="bg-gray-800 px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                        <span>{tool.Name}</span>
                        <button
                            onClick={() => toggleCompare(tool)}
                            className="text-red-400 hover:text-red-200"
                        >
                            ✖
                        </button>
                    </div>
                ))}
            </div>
            {compareList.length === 2 &&
                compareList[0].Slug &&
                compareList[1].Slug && (
                    <Link
                        href={`/compare/${compareList[0].Slug}/vs/${compareList[1].Slug}`}
                        className="bg-accentGreen text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-300 transition"
                    >
                        Compare Now →
                    </Link>
                )}
        </div>
    );
}
