import { USE_CASE_ALIASES, CONTEXT_ALIASES, IO_ALIASES, PREFERENCES_ALIASES } from "./toolUtils";

export function matchTools(tools, wizardState) {
    const normalize = (str) => str.toLowerCase().replace(/\s+/g, "-");

    const includesIgnoreCase = (field, value) => {
        if (!field || !value) return false;
        const normalizedValue = normalize(value);
        if (Array.isArray(field)) {
            return field.some((item) => normalize(item).includes(normalizedValue));
        }
        return normalize(field).includes(normalizedValue);
    };

    const noFiltersSelected =
        !wizardState.useCases.length &&
        !wizardState.modalities.length &&
        !wizardState.preferences.length &&
        !wizardState.context;

    if (noFiltersSelected) return [];

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
            let matchedUseCase = false;
            let matchedModality = false;
            let matchedPreference = false;
            let matchedContext = false;

            // Use case matching
            expandedUseCases.forEach((useCase) => {
                if (
                    includesIgnoreCase(tool.Features, useCase) ||
                    includesIgnoreCase(tool.Why, useCase)
                ) {
                    matchedUseCase = true;
                    score += 2;
                }
            });

            // Modality matching
            expandedModalities.forEach((modality) => {
                if (
                    includesIgnoreCase(tool.Features, modality) ||
                    includesIgnoreCase(tool.Modality, modality)
                ) {
                    matchedModality = true;
                    score += 1.5;
                }
            });

            // Preference matching
            expandedPreferences.forEach((pref) => {
                if (
                    includesIgnoreCase(tool.Tags, pref) ||
                    includesIgnoreCase(tool.Features, pref) ||
                    includesIgnoreCase(tool.Pricing, pref)
                ) {
                    matchedPreference = true;
                    score += 1;
                }
            });


            // Context matching
            if (expandedContext.length) {
                matchedContext = expandedContext.some((ctx) =>
                    tool.Categories?.some((cat) =>
                        normalize(cat.Name).includes(normalize(ctx))
                    )
                );
                if (matchedContext) score += 0.5;
            }


            const matchesAll =
                (!wizardState.useCases.length || matchedUseCase) &&
                (!wizardState.modalities.length || matchedModality) &&
                (!wizardState.preferences.length || matchedPreference) &&
                (!wizardState.context, length || matchedContext);

            return matchesAll ? { ...tool, matchScore: score } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.matchScore - a.matchScore);
}
