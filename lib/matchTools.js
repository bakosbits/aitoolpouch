import { USE_CASE_ALIASES, CONTEXT_ALIASES, IO_ALIASES, PREFERENCES_ALIASES } from "./toolUtils";

export function matchTools(tools, wizardState) {
    console.log("Running matchTools with", tools.length, "tools");
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
        !wizardState.useCases.length &&
        !wizardState.modalities.length &&
        !wizardState.preferences.length &&
        !wizardState.context.length
    ) return [];


    // Expand aliases
    const expandedUseCases = wizardState.useCases.flatMap(
        (uc) => [uc, ...(USE_CASE_ALIASES[uc] || [])]
    );

    const expandedContext = wizardState.context?.flatMap(
        (ctx) => [ctx, ...(CONTEXT_ALIASES[ctx] || [])]
    ) || [];


    const expandedModalities = wizardState.modalities.flatMap(
        (mod) => [mod, ...(IO_ALIASES[mod] || [])]
    );

    const expandedPreferences = wizardState.preferences.flatMap(
        (pref) => [pref, ...(PREFERENCES_ALIASES[pref] || [])]
    );


    return tools
        .map((tool) => {
            let score = 0;
            let matchedUseCase = true;
            let matchedModality = true;
            let matchedPreference = true;
            let matchedContext = true;


            if (wizardState.useCases.length) {
                matchedUseCase = wizardState.useCases.every((uc) => {
                    const aliases = [uc, ...(USE_CASE_ALIASES[uc] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) ||
                        includesIgnoreCase(tool.Pricing, alias)
                    );
                });
                if (matchedUseCase) score += 2;
            }

            if (wizardState.modalities.length) {
                matchedModality = wizardState.modalities.every((mod) => {
                    const aliases = [mod, ...(IO_ALIASES[mod] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) ||
                        includesIgnoreCase(tool.Pricing, alias)
                    );
                });
                if (matchedModality) score += 2;
            }

            if (wizardState.preferences.length) {
                matchedPreference = wizardState.preferences.every((pref) => {
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

            if (wizardState.context.length) {
                matchedContext = wizardState.context.every((cx) => {
                    const aliases = [cx, ...(CONTEXT_ALIASES[cx] || [])];
                    return aliases.some((alias) =>
                        includesIgnoreCase(tool.Features, alias) ||
                        includesIgnoreCase(tool.Why, alias) ||
                        includesIgnoreCase(tool.Details, alias) ||
                        includesIgnoreCase(tool.Description, alias) ||
                        includesIgnoreCase(tool.Pricing, alias)
                    );
                });
                if (matchedContext) score += 2;
            }

            console.log({
                title: tool.Title,
                matchedUseCase,
                matchedModality,
                matchedPreference,
                matchedContext,
                expandedUseCases,
                expandedPreferences,
            });


            const matches = matchedUseCase && matchedModality && matchedPreference && matchedContext;

            return matches ? { ...tool, matchScore: score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.matchScore - a.matchScore);
}
