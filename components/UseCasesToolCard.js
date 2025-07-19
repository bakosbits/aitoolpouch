import Link from "next/link";
import LogoCard from "@/components/LogoCard";

export default function UseCasesToolCard({ tool, compareList = [], toggleCompare }) {
    console.log(`UseCasesToolCard rendered for: ${tool.Name} (Slug: ${tool.Slug})`);

    const isChecked = compareList.some((t) => t.id === tool.id);
    console.log(`  - Is currently in compare list: ${isChecked}`);


    return (
        <Link
            href={`/tool/${tool.Slug}`}
            className="block h-full"
            title={tool.Name}
            passHref

            onClick={(e) => {
                if (e.target.closest('label') === null) {
                    console.log(`UseCasesToolCard clicked (excluding compare checkbox): Navigating to ${tool.Name} (Slug: ${tool.Slug})`);
                }
            }}
        >
            <div className="h-full flex flex-col justify-between border-gray-700 p-6 rounded-lg bg-cardDark hover:bg-gray-800 transition-colors">

                <div className="w-full flex items-center space-x-4">
                    <LogoCard name={tool.Name} domain={tool.Domain} klassName="object-contain h-10 w-10 mb-4" />
                    <h1 className="text-lg font-bold text-headingWhite mb-4">
                        {tool.Name}
                    </h1>
                </div>
                <p className="text-sm text-whiteText mb-4">
                    {tool.Why?.length > 100
                        ? tool.Why.slice(0, 100) + "..."
                        : tool.Why}
                </p>
                <label
                    className="flex items-center gap-2 cursor-pointer mt-auto"
                    // Important: `e.stopPropagation()` prevents the click from bubbling up to the parent <Link>
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents the card's link from being triggered
                        const newCheckedState = !compareList.some((t) => t.id === tool.id);
                        console.log(`Compare checkbox toggled for ${tool.Name} (ID: ${tool.id}). New state: ${newCheckedState ? 'Added' : 'Removed'}`);
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
        </Link>
    );
}