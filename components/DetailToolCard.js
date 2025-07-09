export default function DetailToolCard({ tool }) {

    const featuresText = tool.Features;
    const featuresList = featuresText
        .split("\n")
        .filter((line) => line.trim() !== "");

    const cautionsText = tool.Cautions;
    const cautionsList = cautionsText
        .split("\n")
        .filter((line) => line.trim() !== "");

    const pricingList = Array.isArray(tool.Pricing) ? tool.Pricing : [];
    const formattedPricing = pricingList.length > 1
        ? pricingList.slice(0, -1).join(', ') + ' and ' + pricingList[pricingList.length - 1]
        : pricingList[0];

    return (
        <div className="h-full flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark">
            <div className="flex items-center space-x-4 mb-4">
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
            <p className="text-grayText mb-4">{tool.Description}</p>

            <h1 className="text-xl text-headingWhite font-bold mb-1">
                Why it matters:
            </h1>
            <p className="text-grayText mb-4">{tool.Why}</p>
            <h1 className="text-xl text-headingWhite font-bold mb-1">
                Details:
            </h1>
            <p className="text-grayText mb-4">{tool.Details}</p>
            <h1 className="text-xl text-headingWhite font-bold mb-1">
                Top Features:
            </h1>
            <ul className="list-disc ml-6 space-y-2 text-grayText mb-4">
                {featuresList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h1 className="text-xl text-headingWhite font-bold mb-1">
                Top Cautions:
            </h1>
            <ul className="list-disc ml-6 space-y-2 text-grayText mb-4">
                {cautionsList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h1 className="text-xl font-bold text-headingWhite mb-1">
                Who's It For?
            </h1>
            <p className="text-grayText mb-4">{tool.Buyer}</p>
            {pricingList.length > 0 && (
                <div>
                    <h1 className="text-xl font-bold text-headingWhite mb-1">
                        Pricing Options:
                    </h1>
                    <p>{formattedPricing}</p>                
                </div>
            )}
            <div className="mt-auto text-sm ">
                <a
                    href={`/go/${tool.Slug}`}
                    className="flex items-center text-sm text-accentGreen hover:text-headingWhite mt-6 mb-2"
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
