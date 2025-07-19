import Link from "next/link";
import LogoCard from "@/components/LogoCard";

export default function ToolCard({ tool, compareList = [], toggleCompare }) {
    console.log(`ToolCard rendered for: ${tool.Name} (Slug: ${tool.Slug})`);

    const isChecked = compareList.some((t) => t.id === tool.id);
    console.log(`  - Is currently in compare list: ${isChecked}`);

    return (
        <Link
            href={`/tool/${tool.Slug}`}
            className="block h-full group"
            title={tool.Name}
            passHref
            onClick={(e) => {
                // Prevent the link from triggering if the click originated from the "Visit" link or "Compare" label/input
                if (e.target.closest('a[href^="/go/"]') === null && e.target.closest('label') === null) {
                    console.log(`ToolCard clicked (excluding 'Visit' and 'Compare' controls): Navigating to ${tool.Name} (Slug: ${tool.Slug})`);
                }
            }}
        >
            <div className="h-full flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark group-hover:bg-gray-800 transition-colors">
                <div className="flex items-center space-x-4 mb-2">
                    <LogoCard name={tool.Name} domain={tool.Domain} klassName="object-contain h-14 w-14" />
                    <h1 className="text-2xl font-bold text-headingWhite">
                        {tool.Name}
                    </h1>
                </div>
                {tool["Base_Model"] && (
                    <p className="text-headingWhite mb-4">
                        Powered by {tool["Base_Model"]}
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
                <p className="text-grayText mb-4">
                    {tool.Why?.length > 100
                        ? tool.Why.slice(0, 100) + "..."
                        : tool.Why}
                </p>
                <div className="mt-auto text-sm">
                    <a
                        href={`/go/${tool.Slug}`}
                        className="flex items-center text-accentGreen hover:text-headingWhite font-medium mb-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents the parent <Link> from being triggered
                            console.log(`"Visit Tool" link clicked for: ${tool.Name} (URL: /go/${tool.Slug})`);
                            // analytics.track('Visit Tool Clicked', { tool_name: tool.Name, tool_slug: tool.Slug, location: 'ToolCard' });
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
                        onClick={(e) => {
                            e.stopPropagation(); // Prevents the card's link from being triggered
                            const newCheckedState = !compareList.some((t) => t.id === tool.id);
                            console.log(`Compare checkbox toggled for ${tool.Name} (ID: ${tool.id}). New state: ${newCheckedState ? 'Added' : 'Removed'}`);
                            // analytics.track('Compare Checkbox Toggled', { tool_name: tool.Name, tool_id: tool.id, action: newCheckedState ? 'add' : 'remove', location: 'ToolCard' });
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isChecked} // Use the derived `isChecked` state
                            onChange={() => toggleCompare(tool)} // `onChange` is for input elements
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