import { useReducer, useMemo, useState, useEffect } from "react"; // Added useEffect for client-side render log
import { getAllTools } from "@/lib/airTable";
import { questionnaireReducer, initialQuestionnaireState,
    USE_CASES, MODALITIES, PREFERENCES, CONTEXTS } from "@/lib/questionnaireUtils";
import { matchTools } from "@/lib/matchTools";

import CompareBar from "@/components/CompareBar";
import QuestionnaireToolCard from "@/components/QuestionnaireToolCard";
import SeoHead from "@/components/SeoHead";

// Server-side: getStaticProps
export async function getStaticProps() {
    console.log("[QuestionnairePage - getStaticProps] Starting data fetch for questionnaire page.");
    try {
        const allTools = await getAllTools();
        console.log(`[QuestionnairePage - getStaticProps] Fetched ${allTools.length} total tools.`);

        console.log("[QuestionnairePage - getStaticProps] Data prepared. Returning props for questionnaire page.");
        return {
            props: { allTools },
            revalidate: 300, // Revalidate every 5 minutes
        };
    } catch (error) {
        console.error("[QuestionnairePage - getStaticProps] ERROR fetching data for questionnaire page:", error.message, error.stack);
        return {
            props: { allTools: [] }, // Return empty array to avoid client-side crash
            revalidate: 60, // Shorter revalidate on error
        };
    }
}

function toggleSelection(array, value) {
    return array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value];
}

export default function QuestionnairePage({ allTools }) {
    useEffect(() => {
        console.log(`[QuestionnairePage] Component rendered. Initial tools count: ${allTools?.length || 0}`);
    }, [allTools]); // Log on initial render and if allTools somehow changes

    const [state, dispatch] = useReducer(questionnaireReducer, initialQuestionnaireState);
    const [compareList, setCompareList] = useState([]);

    useEffect(() => {
        console.log("[QuestionnairePage] Questionnaire state updated:", JSON.stringify(state));
    }, [state]);

    const matchedTools = useMemo(() => {
        console.log("[QuestionnairePage] Recalculating matched tools...");
        const matches = matchTools(allTools, state);
        console.log(`[QuestionnairePage] Matched ${matches.length} tools based on current questionnaire state.`);
        return matches;
    }, [allTools, state]); // `matchTools` has its own detailed logging, so this is high-level.

    const toggleCompare = (tool) => {
        setCompareList((prev) => {
            const exists = prev.find((t) => t.id === tool.id);
            let newState;
            if (exists) {
                newState = prev.filter((t) => t.id !== tool.id);
                console.log(`[QuestionnairePage] Tool "${tool.Name}" removed from compare list via toggleCompare.`);
            } else {
                newState = prev.length < 2 ? [...prev, tool] : prev;
                if (newState.length > prev.length) { // Only log if actually added
                    console.log(`[QuestionnairePage] Tool "${tool.Name}" added to compare list via toggleCompare. Current count: ${newState.length}`);
                } else {
                    console.warn(`[QuestionnairePage] Attempted to add "${tool.Name}" to compare list, but already at max (2).`);
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
                url={`https://aitoolpouch.com/questionnaire`}
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
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {CONTEXTS.map((context) => (
                            <button
                                key={context}
                                onClick={() => {
                                    console.log(`[QuestionnairePage] Context selected: "${context}"`);
                                    dispatch({
                                        type: "SET_CONTEXT",
                                        payload: toggleSelection(state.context, context),
                                    });
                                }}
                                className={state.context.includes(context) ? "px-4 py-2 text-accentGreen font-semibold" : "px-4 py-2 hover:text-headingWhite transition"}
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
                                onClick={() => {
                                    console.log(`[QuestionnairePage] Use Case selected: "${useCase}"`);
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
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {MODALITIES.map((modality) => (
                            <button
                                key={modality}
                                onClick={() => {
                                    console.log(`[QuestionnairePage] Modality selected: "${modality}"`);
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
                    <div className="w-full border border-gray-700 p-6 rounded-lg bg-cardDark mb-6">
                        {PREFERENCES.map((pref) => (
                            <button
                                key={pref}
                                onClick={() => {
                                    console.log(`[QuestionnairePage] Preference selected: "${pref}"`);
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
                <div className="mx-auto flex flex-col lg:px-6">
                    {matchedTools.length > 0 ? (
                        console.log("[QuestionnairePage] Displaying matched tools results."),
                        <h1 className="text-xl text-headingWhite font-bold mb-2">🧠 Your Results</h1>
                    ) : (
                        console.log("[QuestionnairePage] Displaying instructions (no tools matched yet or no criteria selected)."),
                        <h1 className="text-xl text-headingWhite font-bold mb-2"> 🌐 Instructions</h1>
                    )}
                    {/* Results*/}
                    {matchedTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {matchedTools.map((tool) => (
                                <QuestionnaireToolCard
                                    key={tool.id}
                                    tool={tool}
                                    compareList={compareList}
                                    toggleCompare={toggleCompare}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col border border-gray-700 p-6 rounded-lg bg-cardDark hover:bg-gray-800 transition-colors">
                            <p>Answer at least 1 of the questions to get started. You're not required to answer every question. Each question can have multiple answers.
                                Apply as many filters in any combination you wish, but remember - The amount of context you add impacts the results. Enjoy.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}