export default function ToolDetailCard({ tool }) {
    const featuresText = tool.Features; // assuming "Features" is the Airtable field name
    const featuresList = featuresText
        .split("\n")
        .filter((line) => line.trim() !== "");
    const cautionsText = tool.Cautions; // assuming "Features" is the Airtable field name
    const cautionsList = cautionsText
        .split("\n")
        .filter((line) => line.trim() !== "");
    const pricingList = Array.isArray(tool.Pricing) ? tool.Pricing : [];

    return (
        <div className="h-full flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark">
            {/* Link to detail page */}
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={tool.Logo}
                    alt={`${tool.Name} logo`}
                    className="h-12 w-12 object-contain"
                />
                <h2 className="text-lg font-bold text-headingWhite">
                    {tool.Name}
                </h2>
            </div>

            {tool["Base Model"] && (
                <p className="text-headingWhite mb-4">
                    Powered by {tool["Base Model"]}
                </p>
            )}
            <p className="text-grayText mb-4">{tool.Description}</p>

            <h2 className="text-xl text-headingWhite font-bold mb-1">
                Why it matters:
            </h2>
            <p className="text-grayText mb-4">{tool.Why}</p>
            <h2 className="text-xl text-headingWhite font-bold mb-1">
                Details:
            </h2>
            <p className="text-grayText mb-4">{tool.Details}</p>
            <h2 className="text-xl text-headingWhite font-bold mb-1">
                Top Features:
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-grayText mb-4">
                {featuresList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2 className="text-xl text-headingWhite font-bold mb-1">
                Top Cautions:
            </h2>
            <ul className="list-disc ml-6 space-y-2 text-grayText mb-4">
                {cautionsList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h2 className="text-lg font-bold text-headingWhite mb-1">
                Who's It For?
            </h2>
            <p className="text-grayText mb-4">{tool.Buyer}</p>
            {pricingList.length > 0 && (
                <div>
                    <h2 className="text-lg font-bold text-headingWhite mb-1">
                        Pricing Options:
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {pricingList.map((item, index) => (
                            <span key={index}>
                                <p className="text-grayText">{item} </p>
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <div className="mt-auto">
                <a
                    href={tool.Link}
                    className="flex items-center text-accentGreen hover:text-headingWhite font-medium mt-6 mb-2"
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
