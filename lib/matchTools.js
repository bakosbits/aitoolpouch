import { USE_CASE_ALIASES, CONTEXT_ALIASES, IO_ALIASES, PREFERENCES_ALIASES } from "@/lib/matchUtils";

export function matchTools(tools, questionnaireState) {

    console.log("[matchTools] Starting tool matching process.");
    console.log("[matchTools] Questionnaire State:", JSON.stringify(questionnaireState));

    const normalize = (str) => str.toLowerCase().replace(/\s+/g, "-");

    const includesIgnoreCase = (field, value) => {
        if (!field || !value) return false;
        const normalizedValue = normalize(value);
        if (Array.isArray(field)) {
            return field.some((item) => normalize(item).includes(normalizedValue));
        }
        return normalize(field).includes(normalizedValue);
    };


    if (
        !questionnaireState.useCases.length &&
        !questionnaireState.modalities.length &&
        !questionnaireState.preferences.length &&
        !questionnaireState.context.length
    ) {
        console.log("[matchTools] No questionnaire criteria selected. Returning empty array.");
        return [];
    }


    // Expand aliases
    const expandedUseCases = questionnaireState.useCases.flatMap(
        (uc) => [uc, ...(USE_CASE_ALIASES[uc] || [])]
    );
    console.log("[matchTools] Expanded Use Cases:", expandedUseCases);


    const expandedContext = questionnaireState.context?.flatMap(
        (ctx) => [ctx, ...(CONTEXT_ALIASES[ctx] || [])]
    ) || [];
    console.log("[matchTools] Expanded Contexts:", expandedContext);


    const expandedModalities = questionnaireState.modalities.flatMap(
        (mod) => [mod, ...(IO_ALIASES[mod] || [])]
    );
    console.log("[matchTools] Expanded Modalities:", expandedModalities);


    const expandedPreferences = questionnaireState.preferences.flatMap(
        (pref) => [pref, ...(PREFERENCES_ALIASES[pref] || [])]
    );
    console.log("[matchTools] Expanded Preferences:", expandedPreferences);


    return tools
        .map((tool) => {
            let score = 0;
            let matchedUseCase = true;
            let matchedModality = true;
            let matchedPreference = true;
            let matchedContext = true;

            console.group(`[matchTools] Evaluating tool: ${tool.Name} (ID: ${tool.id || 'N/A'})`);

            if (questionnaireState.useCases.length) {
                matchedUseCase = questionnaireState.useCases.every((uc) => {
                    const aliases = [uc, ...(USE_CASE_ALIASES[uc] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) 
                    );
                });
                if (matchedUseCase) score += 3.5;
            }

            if (questionnaireState.modalities.length) {
                matchedModality = questionnaireState.modalities.every((mod) => {
                    const aliases = [mod, ...(IO_ALIASES[mod] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias)
                    );
                });
                if (matchedModality) score += 1.5;
            }

            if (questionnaireState.preferences.length) {
                matchedPreference = questionnaireState.preferences.every((pref) => {
                    const aliases = [pref, ...(PREFERENCES_ALIASES[pref] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) ||
                        includesIgnoreCase(tool.Pricing, alias)
                    );
                });
                if (matchedPreference) score += 2;
            }

            if (questionnaireState.context.length) {
                matchedContext = questionnaireState.context.every((cx) => {
                    const aliases = [cx, ...(CONTEXT_ALIASES[cx] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias)
                    );
                });
                if (matchedContext) score += 3;
            }


            const matches = matchedUseCase && matchedModality && matchedPreference && matchedContext;

            return matches ? { ...tool, matchScore: score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.matchScore - a.matchScore);
}        

