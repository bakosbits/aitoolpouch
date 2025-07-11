import Link from "next/link";

export default function ToolCard({ tool, compareList = [], toggleCompare }) {
    return (
        <Link
            href={`/tool/${tool.Slug}`}
            className="block h-full group"
            passHref
        >
            <div className="h-full flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark group-hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-4 mb-2">
                    <img
                        src={`https://cdn.brandfetch.io/${tool.Domain}/icon?c=1id03xd53EDa-VjPpgF`}
                        alt={`${tool.Name} logo`}
                        className="h-14 w-14 object-contain"
                    />
                    <h1 className="text-xl font-bold text-headingWhite">
                        {tool.Name}
                    </h1>
                </div>
                {tool["Base Model"] && (
                    <p className="text-headingWhite mb-4">
                        Powered by {tool["Base Model"]}
                    </p>
                )}
                <p className=" text-grayText mb-4">
                    {tool.Description?.length > 100
                        ? tool.Description.slice(0, 100) + "..."
                        : tool.Description}
                </p>
                <h1 className="text-xl text-headingWhite font-bold">
                    Why it matters:
                </h1>
                <p className=" text-grayText mb-4">
                    {tool.Why?.length > 100
                        ? tool.Why.slice(0, 100) + "..."
                        : tool.Why}
                </p>
                <div className="mt-auto text-sm">
                    <a
                        href={`/go/${tool.Slug}`}
                        className="flex items-center text-accentGreen hover:text-headingWhite font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <svg
                            className="w-4 h-4 mr-2 fill-current"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 0 L8.6 1.4 15.2 8H0v2h15.2l-6.6 6.6L10 20l10-10z" />
                        </svg>
                        Visit {tool.Name}
                    </a>
                    <label
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            type="checkbox"
                            checked={compareList.some((t) => t.id === tool.id)}
                            onChange={() => toggleCompare(tool)}
                        />
                        <span className="text-accentGreen font-medium">
                            Compare
                        </span>
                    </label>
                </div>
            </div>
        </Link>
    );
}
