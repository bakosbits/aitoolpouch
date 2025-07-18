import { useReducer, useEffect, useState } from "react";
import { getAllTools } from "@/lib/airTable";
import { wizardReducer, initialWizardState } from "@/lib/wizardReducer";
import { USE_CASES } from "@/lib/toolUtils";
import { matchTools } from "@/lib/matchTools";
import CompareBar from "@/components/CompareBar";
import WizardToolCard from "@/components/WizardToolCard";

const MODALITIES = ["Text", "Image", "Video", "Audio", "Code", "Data"];
const PREFERENCES = ["Free tier", "No-code", "Open source", "Privacy-first", "API access", "Collaboration", "Customization"];
const CONTEXTS = ["Development", "Design", "Marketing", "Sales", "Healthcare", "Education", "Legal", "Cybersecurity", "Finance", "Customer care", "Science", "Public engagement"];

export async function getStaticProps() {
    const allTools = await getAllTools();

    return {
        props: { allTools },
        revalidate: 300, // Optional: ISR for freshness
    };
}

export default function WizardPage({ allTools }) {

    const [state, dispatch] = useReducer(wizardReducer, initialWizardState);
    const [matchedTools, setMatchedTools] = useState([]);

    const [compareList, setCompareList] = useState([]);

    const toggleCompare = (tool) => {
        setCompareList((prev) => {
            const exists = prev.find((t) => t.id === tool.id);
            if (exists) {
                return prev.filter((t) => t.id !== tool.id);
            } else {
                return prev.length < 2 ? [...prev, tool] : prev;
            }
        });
    };

    useEffect(() => {
        console.log("State changed:", state);
        const matched = matchTools(allTools, state);
        console.log("Matched tools:", matched);
        setMatchedTools(matched);
    }, [state]); ``

    return (
        <>
            <div className="w-full mb-6">
                <CompareBar
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                />
            </div>
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
                {/* Top row: spans both columns */}
                <div className="md:col-span-2">
                    <div>
                        <h1 className="text-2xl text-headingWhite font-bold mb-4">Your Interactive Instant Gratification Research Wizard 😊</h1>
                    </div>
                </div>

                {/* Left column */}
                <div className="flex flex-col">
                    {/* Professional Context */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">✨ Would you like to add context in the form of a profession?</h1>
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {CONTEXTS.map((context) => (
                            <button
                                key={context}
                                onClick={() =>
                                    dispatch({
                                        type: "SET_CONTEXT",
                                        payload: toggleSelection(state.context, context),
                                        // payload: state.context === context ? null : context,
                                    })
                                }
                                className={state.context.includes(context) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                                // className={state.context === context ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {context}
                            </button>
                        ))}
                    </div>
                    {/* Use Case */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">💡 What's your use case? What do you want to do?</h1>
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {USE_CASES.map((useCase) => (
                            <button
                                key={useCase}
                                onClick={() =>
                                    dispatch({
                                        type: "SET_USE_CASES",
                                        payload: toggleSelection(state.useCases, useCase),
                                    })
                                }
                                className={state.useCases.includes(useCase) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {useCase}
                            </button>
                        ))}
                    </div>
                    {/* Modality Selection */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">🧩 Are you working with data? What format is it in?</h1>
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {MODALITIES.map((modality) => (
                            <button
                                key={modality}
                                onClick={() =>
                                    dispatch({
                                        type: "SET_MODALITIES",
                                        payload: toggleSelection(state.modalities, modality),
                                    })
                                }
                                className={state.modalities.includes(modality) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {modality}
                            </button>
                        ))}
                    </div>
                    {/* Preferences */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">⚙️ Do you have preferences or constraints you'd like to add?</h1>
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {PREFERENCES.map((pref) => (
                            <button
                                key={pref}
                                onClick={() =>
                                    dispatch({
                                        type: "SET_PREFERENCES",
                                        payload: toggleSelection(state.preferences, pref),
                                    })
                                }
                                className={state.preferences.includes(pref) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {pref}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Right column */}
                <div className="flex flex-col">
                    {matchedTools.length > 0 ? (
                        <h1 className="text-xl text-headingWhite font-bold mb-2">🧠 Your Results</h1>
                    ) : (
                        <h1 className="text-xl text-headingWhite font-bold mb-2"> 🌐 Instructions</h1>
                    )}
                    {/* Results*/}
                    {matchedTools.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {matchedTools.map((tool) => (
                                    <WizardToolCard
                                       key={tool.slug}
                                        tool={tool}
                                        compareList={compareList}
                                        toggleCompare={toggleCompare}
                                    />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark hover:bg-gray-800 transition-colors">
                            <ul>
                                <li>Answer at least 1 of the questions to get started.</li>
                                <li>Apply filters in any combination you wish.</li>
                                <li>Enjoy.</li>
                            </ul>
                        </div>
                        
                    )}
                </div>
            </div>

        </>
    );
}

function toggleSelection(array, value) {
    return array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value];
}
