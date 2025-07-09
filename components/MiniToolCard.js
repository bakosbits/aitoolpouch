import Link from "next/link";

export default function MiniToolCard({ tool }) {
    return (
                <Link
            href={`/tool/${tool.Slug}`}
            className="block h-full group" // Added 'group' class for potential group-hover styling
            passHref // Ensures the href is passed to the underlying <a> tag for proper SEO and accessibility
        >
        <div className="h-full bg-cardDark p-4 rounded-lg shadow-lg flex flex-col items-start group-hover:bg-gray-800 transition-colors">
            <div className="w-full flex items-center space-x-4">
                <img
                    src={`https://cdn.brandfetch.io/${tool.Domain}?c=1id03xd53EDa-VjPpgF`}
                    alt={tool.Name}
                    className="w-10 h-10 object-contain mb-4"
                />
                <h1 className="text-lg font-bold text-headingWhite mb-4">
                    {tool.Name}
                </h1>
            </div>

            <p className="text-sm text-whiteText">
                {tool.Description?.length > 100
                    ? tool.Description.slice(0, 100) + "..."
                    : tool.Description}
            </p>
        </div>
        </Link>
    );
}
