import Link from "next/link";
import LogoCard from "@/components/LogoCard";

export default function QuestionnaireToolCard({ tool, compareList = [], toggleCompare }) {
    return (
        <Link
            href={`/tool/${tool.Slug}`}
            className="block h-full"
            title={tool.Name}
            passHref
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
        </Link>
    );
}
