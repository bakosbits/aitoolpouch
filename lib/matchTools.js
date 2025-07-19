export function matchTools(tools, useCasesState, allAliases) {

    console.log("[matchTools] Starting tool matching process.");
    console.log("[matchTools] UseCases State:", JSON.stringify(useCasesState));
    console.log("[matchTools] Aliases provided for matching:", Object.keys(allAliases).join(', '));


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
        !useCasesState.useCases.length &&
        !useCasesState.modalities.length &&
        !useCasesState.preferences.length &&
        !useCasesState.contexts.length
    ) {
        console.log("[matchTools] No useCases criteria selected. Returning empty array.");
        return [];
    }

    const USE_CASE_ALIASES = allAliases["UseCases"] || {};
    const CONTEXT_ALIASES = allAliases["Contexts"] || {};
    const MODALITY_ALIASES = allAliases["Modalities"] || {};
    const PREFERENCES_ALIASES = allAliases["Preferences"] || {};

    return tools
        .map((tool) => {
            let score = 0;
            let matchedUseCase = true;
            let matchedModality = true;
            let matchedPreference = true;
            let matchedContext = true;

            console.group(`[matchTools] Evaluating tool: ${tool.Name} (ID: ${tool.id || 'N/A'})`);

            if (useCasesState.useCases.length) {
                matchedUseCase = useCasesState.useCases.every((uc) => {
                const aliases = USE_CASE_ALIASES[uc] ? [uc, ...USE_CASE_ALIASES[uc]] : [uc];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) 
                    );
                });
                if (matchedUseCase) score += 3.5;
            }

            if (useCasesState.modalities.length) {
                matchedModality = useCasesState.modalities.every((mod) => {
                const aliases = MODALITY_ALIASES[mod] ? [mod, ...MODALITY_ALIASES[mod]] : [mod];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias)
                    );
                });
                if (matchedModality) score += 1.5;
            }

            if (useCasesState.preferences.length) {
                matchedPreference = useCasesState.preferences.every((pref) => {
                const aliases = PREFERENCES_ALIASES[pref] ? [pref, ...PREFERENCES_ALIASES[pref]] : [pref];
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

            if (useCasesState.contexts.length) {
                matchedContext = useCasesState.contexts.every((cx) => {
                const aliases = CONTEXT_ALIASES[cx] ? [cx, ...CONTEXT_ALIASES[cx]] : [cx];
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

