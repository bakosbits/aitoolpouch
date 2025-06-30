import Link from "next/link";

export default function ToolCard({ tool }) {
    return (
        <div className="bg-cardDark p-4 rounded-md">
            <div className="flex items-center space-x-4 mb-2">
                <img
                    src={tool.Logo}
                    alt={`${tool.Name} logo`}
                    className="h-10 w-10 object-contain"
                />
                <h2 className="text-2xl font-bold text-headingWhite">
                    {tool.Name}
                </h2>
            </div>

            <p className=" text-grayText mb-2 mt-6">{tool.Description}</p>

            {tool["Base Model"] && (
                <p className="text-xs text-grayText mb-4">
                    Powered by {tool["Base Model"]}
                </p>
            )}

            <h2 className="text-xl text-headingWhite font-bold mt-6 mb-4">
                Why it matters:
            </h2>
            <p className=" text-grayText mb-4">{tool.Why}</p>
            <a
                href={`/tool/${tool.Slug}`}
                className="flex items-center text-accentGreen hover:text-headingWhite font-medium mt-6 mb-2"
                rel="noopener noreferrer"
            >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                    <path d="M10 0 L8.6 1.4 15.2 8H0v2h15.2l-6.6 6.6L10 20l10-10z" />
                </svg>
                Read more
            </a>
            <a
                href={`${tool.Link}`}
                className="flex items-center text-accentGreen hover:text-headingWhite font-medium"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                    <path d="M10 0 L8.6 1.4 15.2 8H0v2h15.2l-6.6 6.6L10 20l10-10z" />
                </svg>
                Visit {tool.Name}
            </a>
        </div>
    );
}
