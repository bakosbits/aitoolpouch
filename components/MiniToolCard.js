import Link from "next/link";

export default function MiniToolCard({ tool }) {
    return (
        <div className="bg-cardDark p-4 rounded-lg shadow-lg flex flex-col items-start">
            <div className="w-full flex items-center space-x-4">
                <img
                    src={`https://cdn.brandfetch.io/${tool.Domain}?c=1id03xd53EDa-VjPpgF`}
                    alt={tool.Name}
                    className="w-10 h-10 object-contain mb-4"
                />
                <h2 className="text-lg font-bold text-headingWhite mb-4">{tool.Name}</h2>
            </div>

            <p className="text-sm text-whiteText mb-4">
                {tool.Description?.length > 100
                    ? tool.Description.slice(0, 100) + "..."
                    : tool.Description}
            </p>
            <div className="flex-grow"></div>
            <div>
                <a
                    href={`/tool/${tool.Slug}`}
                    className="text-sm flex items-center text-accentGreen hover:text-headingWhite"
                    rel="noopener noreferrer"
                >
                    Read more
                </a>
            </div>
        </div>
    );
}
