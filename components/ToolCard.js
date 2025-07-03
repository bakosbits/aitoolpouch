import Link from "next/link";

export default function ToolCard({ tool }) {
    return (
        <div className="h-full flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark">
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

            {tool["Base Model"] && (
                <p className="text-headingWhite mb-4">
                    Powered by {tool["Base Model"]}
                </p>
            )}

            <p className=" text-grayText mb-4">{tool.Description}</p>

            <h2 className="text-xl text-headingWhite font-bold">
                Why it matters:
            </h2>
            <p className=" text-grayText mb-4">{tool.Why}</p>
            <div className="mt-auto">
                <a
                    href={`/tool/${tool.Slug}`}
                    className="flex items-center text-accentGreen hover:text-headingWhite font-medium mb-2"
                    rel="noopener noreferrer"
                >
                    <svg
                        className="w-4 h-4 mr-2 fill-current"
                        viewBox="0 0 20 20"
                    >
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
                    <svg
                        className="w-4 h-4 mr-2 fill-current"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 0 L8.6 1.4 15.2 8H0v2h15.2l-6.6 6.6L10 20l10-10z" />
                    </svg>
                    Visit {tool.Name}
                </a>
            </div>
        </div>
    );
}
