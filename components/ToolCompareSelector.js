import { useState } from "react";
import { useRouter } from "next/router";

export default function ToolCompareSelector({ tools }) {
    const [selectedToolA, setSelectedToolA] = useState("");
    const [selectedToolB, setSelectedToolB] = useState("");
    const router = useRouter();

    const handleCompare = () => {
        if (selectedToolA && selectedToolB) {
            router.push(`/compare/${selectedToolA}/vs/${selectedToolB}`);
        }
    };

    return (
        <div className="bg-cardDark rounded">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label
                            htmlFor="toolA"
                            className="text-headingWhite block  font-medium mb-1"
                        >
                            Select Your 1st Tool:
                        </label>
                        <select
                            id="toolA"
                            value={selectedToolA}
                            onChange={(e) => setSelectedToolA(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">-- Select --</option>
                            {tools.map((tool) => (
                                <option key={tool.Slug} value={tool.Slug}>
                                    {tool.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1">
                        <label
                            htmlFor="toolB"
                            className="text-headingWhite block  font-medium mb-1"
                        >
                            Select Your 2nd Tool:
                        </label>
                        <select
                            id="toolB"
                            value={selectedToolB}
                            onChange={(e) => setSelectedToolB(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">-- Select --</option>
                            {tools.map((tool) => (
                                <option key={tool.Slug} value={tool.Slug}>
                                    {tool.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-2 md:mt-0">
                        <button
                            onClick={handleCompare}
                            className="flex items-center gap-1 bg-accentGreen text-backgroundDark px-3 py-1.5 rounded font-semibold hover:bg-headingWhite transition"
                        >
                            <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0 L8.6 1.4 15.2 8H0v2h15.2l-6.6 6.6L10 20l10-10z" />
                            </svg>
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
