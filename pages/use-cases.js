import { useReducer, useMemo, useState, useEffect } from "react"; // Added useEffect for client-side render log
import { getAllTools, getAllAliases } from "@/lib/airTable";
import { useCasesReducer, initialUseCasesState } from "@/lib/useCasesUtils";
import { matchTools } from "@/lib/matchTools";

import CompareBar from "@/components/CompareBar";
import UseCasesToolCard from "@/components/UseCasesToolCard";
import SeoHead from "@/components/SeoHead";

// Server-side: getStaticProps
export async function getStaticProps() {
    console.log("[UseCasesPage - getStaticProps] Starting data fetch for useCAses page.");
    try {
        const allTools = await getAllTools();
        console.log(`[UseCasesPage - getStaticProps] Fetched ${allTools.length} total tools.`);

        const allAliases = await getAllAliases(); // Fetch aliases here
        console.log(`[UseCasesPage - getStaticProps] Fetched all aliases.`);

        console.log("[UseCasesPage - getStaticProps] Data prepared. Returning props for useCases page.");
        return {
            props: {
                allTools,
                allAliases // Pass aliases as a prop
            },
            revalidate: 300,
        };
    } catch (error) {
        console.error("[UseCasesPage - getStaticProps] ERROR fetching data for useCases page:", error.message, error.stack);
        return {
            props: {
                allTools: [],
                allAliases: {} // Provide a fallback empty object
            },
            revalidate: 60,
        };
    }
}

function toggleSelection(array, value) {
    return array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value];
}

export default function UseCasesPage({ allTools, allAliases }) {

    const USE_CASES = Object.keys(allAliases["UseCases"] || {}).sort((a, b) => a.localeCompare(b));
    const CONTEXTS = Object.keys(allAliases["Contexts"] || {}).sort((a, b) => a.localeCompare(b));
    const MODALITIES = Object.keys(allAliases["Modalities"] || {}).sort((a, b) => a.localeCompare(b));
    const PREFERENCES = Object.keys(allAliases["Preferences"] || {}).sort((a, b) => a.localeCompare(b));

    useEffect(() => {
        console.log(`[UseCasesPage] Component rendered. Initial tools count: ${allTools?.length || 0}`);
        console.log("[UseCasesPage] Sorted USE_CASES for display:", USE_CASES); // Log to confirm
    }, [allTools, allAliases]);

    const [state, dispatch] = useReducer(useCasesReducer, initialUseCasesState);
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        console.log("[UseCasesPage] UseCases state updated:", JSON.stringify(state));
    }, [state]);

    const matchedTools = useMemo(
        () => {
            console.log("[UseCasesPage] Recalculating matched tools...");
            // Assuming matchTools returns the matched items WITHOUT sorting them.
            const matches = matchTools(allTools, state, allAliases);
            // Sort only for display
            const sortedMatches = [...matches].sort((a, b) => a.Name.localeCompare(b.Name));
            console.log(`[UseCasesPage] Matched and sorted ${sortedMatches.length} tools for display.`);
            return sortedMatches;
        },
        [allTools, state, allAliases]
    );

    const isAnyFilterActive = useMemo(() => {
        return (
            state.useCases.length > 0 ||
            state.modalities.length > 0 ||
            state.preferences.length > 0 ||
            state.contexts.length > 0
        );
    }, [state]);

    const toggleCompare = (tool) => {
        setCompareList((prev) => {
            const exists = prev.find((t) => t.id === tool.id);
            let newState;
            if (exists) {
                newState = prev.filter((t) => t.id !== tool.id);
                console.log(`[UseCasesPage] Tool "${tool.Name}" removed from compare list via toggleCompare.`);
            } else {
                newState = prev.length < 2 ? [...prev, tool] : prev;
                if (newState.length > prev.length) {
                    console.log(`[UseCasesPage] Tool "${tool.Name}" added to compare list via toggleCompare. Current count: ${newState.length}`);
                } else {
                    console.warn(`[UseCasesPage] Attempted to add "${tool.Name}" to compare list, but already at max (2).`);
                }
            }
            return newState;
        });
    };


    return (
        <>
            <SeoHead
                title={`Find the top AI tool for marketing, writing, content creation, solopreneurs`}
                description={`Search by profession and use case to find the right AI tool for you.`}
                url={`https://aitoolpouch.com/usecases`}
            />
            <div className="w-full mb-6">
                <CompareBar
                    compareList={compareList}
                    toggleCompare={toggleCompare}
                />
            </div>
            <div className="w-full lg:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-[40%_60%] gap-6">
                {/* Top row: spans both columns */}
                <div className="md:col-span-2">
                    <div>
                        <h1 className="text-2xl text-headingWhite font-bold mb-4">Alignment By Use Case | Task | Project</h1>
                        <div className="hidden md:block">
                            <h1 className="text-GrayText mb-4">Answer Questions To Quickly Match A Tool To Your Needs</h1>
                        </div>
                    </div>
                </div>

                {/* Left column */}
                <div className="flex flex-col">
                    {/* Professional Context */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">✨ Would you like results that are aligned to a profession?</h1>
                    <div className="w-full border border-gray-700 p-4 rounded-lg bg-cardDark mb-6">
                        {CONTEXTS.map((contexts) => (
                            <button
                                key={contexts}
                                onClick={() => {
                                    console.log(`[UseCasesPage] Context selected: "${contexts}"`);
                                    dispatch({
                                        type: "SET_CONTEXT",
                                        payload: toggleSelection(state.contexts, contexts),
                                    });
                                }}
                                className={state.contexts.includes(contexts) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {contexts}
                            </button>
                        ))}
                    </div>
                    {/* Use Case */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">💡 What's your use case? What do you want to do?</h1>
                    <div className="w-full border border-gray-700 p-4 rounded-lg bg-cardDark mb-6">
                        {USE_CASES.map((useCase) => (
                            <button
                                key={useCase}
                                onClick={() => {
                                    console.log(`[UseCasesPage] Use Case selected: "${useCase}"`);
                                    dispatch({
                                        type: "SET_USE_CASES",
                                        payload: toggleSelection(state.useCases, useCase),
                                    });
                                }}
                                className={state.useCases.includes(useCase) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {useCase}
                            </button>
                        ))}
                    </div>
                    {/* Modality Selection */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">🧩 Are you working with data? What format is it in?</h1>
                    <div className="w-full border border-gray-700 p-4 rounded-lg bg-cardDark mb-6">
                        {MODALITIES.map((modality) => (
                            <button
                                key={modality}
                                onClick={() => {
                                    console.log(`[UseCasesPage] Modality selected: "${modality}"`);
                                    dispatch({
                                        type: "SET_MODALITIES",
                                        payload: toggleSelection(state.modalities, modality),
                                    });
                                }}
                                className={state.modalities.includes(modality) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {modality}
                            </button>
                        ))}
                    </div>
                    {/* Preferences */}
                    <h1 className="text-xl text-headingWhite font-bold mb-2">⚙️ Do you have preferences or constraints you'd like to add?</h1>
                    <div className="w-full border border-gray-700 p-4 rounded-lg bg-cardDark mb-6">
                        {PREFERENCES.map((pref) => (
                            <button
                                key={pref}
                                onClick={() => {
                                    console.log(`[UseCasesPage] Preference selected: "${pref}"`);
                                    dispatch({
                                        type: "SET_PREFERENCES",
                                        payload: toggleSelection(state.preferences, pref),
                                    });
                                }}
                                className={state.preferences.includes(pref) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
                            >
                                {pref}
                            </button>
                        ))}
                    </div>
                </div>
                {/* Right column */}

                 <div className="flex flex-col lg:px-6">
                    {matchedTools.length > 0 ? (
                        // Case 1: Tools are found
                        <>
                            {console.log("[UseCasesPage] Displaying matched tools results.")}
                            <h1 className="text-xl text-headingWhite font-bold mb-2">🧠 Your Results</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {matchedTools.map((tool) => (
                                    <UseCasesToolCard
                                        key={tool.id}
                                        tool={tool}
                                        compareList={compareList}
                                        toggleCompare={toggleCompare}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        // Case 2: No tools found, but differentiate between "no selection" and "no match"
                        <>
                            {isAnyFilterActive ? (
                                // Sub-case 2a: Filters are active, but no tools match
                                <>
                                    {console.log("[UseCasesPage] Displaying 'Nothing Found' (filters active).")}
                                    <h1 className="text-xl text-headingWhite font-bold mb-2">🧠 Your Results</h1>
                                     <div className="flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark">
                                        <p>Nothing found. Try adjusting your selections!</p>
                                    </div>
                                </>
                            ) : (
                                // Sub-case 2b: No filters are active, show original instructions
                                <>
                                    {console.log("[UseCasesPage] Displaying instructions (no filters active).")}
                                    <h1 className="text-xl text-headingWhite font-bold mb-2"> 🌐 Instructions</h1>
                                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark">
                                        <p className="text-grayText">Answer at least 1 of the questions to get started. You're not required to answer every question. Each question can have multiple answers.
                                            Apply as many filters in any combination you wish, but remember - The amount of context you add impacts the results. Enjoy.
                                        </p>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}