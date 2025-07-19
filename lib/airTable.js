import Airtable from "airtable";

function getToolsBase() {
    const {
        AIRTABLE_API_KEY,
        AIRTABLE_TOOLS_BASE_ID,
        AIRTABLE_TOOLS_TABLE,
        AIRTABLE_CATEGORIES_TABLE,
        AIRTABLE_ARTICLES_TABLE,
    } = process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_TOOLS_BASE_ID ||
        !AIRTABLE_TOOLS_TABLE || !AIRTABLE_CATEGORIES_TABLE || !AIRTABLE_ARTICLES_TABLE) {

        console.error("CRITICAL ERROR: Missing Airtable Environment Variables!");
        if (!AIRTABLE_API_KEY) console.error("   - AIRTABLE_API_KEY is missing.");
        if (!AIRTABLE_TOOLS_BASE_ID) console.error("   - AIRTABLE_TOOLS_BASE_ID is missing.");
        if (!AIRTABLE_TOOLS_TABLE) console.error("   - AIRTABLE_TOOLS_TABLE is missing.");
        if (!AIRTABLE_CATEGORIES_TABLE) console.error("   - AIRTABLE_CATEGORIES_TABLE is missing.");
        if (!AIRTABLE_ARTICLES_TABLE) console.error("   - AIRTABLE_ARTICLES_TABLE is missing.");

        throw new Error("Missing Airtable environment variables. Please check your .env.local file for ALL required variables.");
    }

    console.log("[Airtable] Initializing Airtable base.");
    return new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        AIRTABLE_TOOLS_BASE_ID,
    );
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export async function getFeaturedTools(count = 4) {

    console.log(`[getFeaturedTools] Attempting to fetch ${count} featured tools.`);
    const toolsBase = getToolsBase();

    try {

        console.log(`[getFeaturedTools] Fetching from table: ${process.env.AIRTABLE_TOOLS_TABLE} with filter: AND({Active} = TRUE(), {Featured} = TRUE())`);
        const featuredToolsRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
            .select({
                filterByFormula: `AND({Active} = TRUE(), {Featured} = TRUE())`,
                fields: ["Name", "Slug", "Domain", "Why"],
            })
            .all();

        console.log(`[getFeaturedTools] Found ${featuredToolsRecords.length} active and featured tools.`);

        if (featuredToolsRecords.length === 0) {
            console.log("[getFeaturedTools] No active and featured tools found matching criteria. Returning empty array.");
            return [];
        }

        const shuffledTools = shuffleArray(featuredToolsRecords);
        const selectedTools = shuffledTools.slice(0, count);

        console.log(`[getFeaturedTools] Selected ${selectedTools.length} tools:`, selectedTools.map(t => t.fields.Name));

        const mappedTools = selectedTools.map(record => ({
            Name: record.fields["Name"],
            Slug: record.fields["Slug"] || null,
            Domain: record.fields["Domain"] || null,
            Why: record.fields["Why"] || null,
        }));

        console.log("[getFeaturedTools] Successfully mapped featured tools.");
        return mappedTools;

    } catch (error) {
        console.error("[getFeaturedTools] ERROR fetching featured tools:", error.message, error.stack);
        throw error;
    }
}

export async function getAllTools() {
    console.log("[getAllTools] Attempting to fetch all tools, categories.");
    const toolsBase = getToolsBase();

    try {
        console.log(`[getAllTools] Fetching categories from: ${process.env.AIRTABLE_CATEGORIES_TABLE}`);
        const categoryRecords = await toolsBase(
            process.env.AIRTABLE_CATEGORIES_TABLE,
        )
            .select({ fields: ["Name", "Slug"] })
            .all();
        console.log(`[getAllTools] Found ${categoryRecords.length} categories.`);

        const categoryMap = {};
        categoryRecords.forEach((cat) => {
            categoryMap[cat.id] = {
                id: cat.id,
                Name: cat.fields["Name"],
                Slug: cat.fields["Slug"],
            };
        });
        console.log("[getAllTools] Categories mapped.");

        console.log(`[getAllTools] Fetching active tools from: ${process.env.AIRTABLE_TOOLS_TABLE}`);
        const toolRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
            .select({ filterByFormula: "{Active} = TRUE()" })
            .all();
        console.log(`[getAllTools] Found ${toolRecords.length} active tools.`);

        const mappedTools = toolRecords.map((record) => {
            const categoryIds = record.fields["Categories"] || [];
            const expandedCategories = categoryIds
                .map((id) => categoryMap[id])
                .filter(Boolean);

            return {
                id: record.id,
                ...record.fields,
                Categories: expandedCategories,
            };
        });
        console.log(`[getAllTools] Successfully mapped ${mappedTools.length} tools with categories.`);
        return mappedTools;

    } catch (error) {
        console.error("[getAllTools] ERROR fetching all tools, categories:", error.message, error.stack);
        throw error;
    }
}

export async function getAllCategories() {
    console.log("[getAllCategories] Attempting to fetch all active categories.");

    if (!process.env.AIRTABLE_CATEGORIES_TABLE) { 
        console.error("CRITICAL ERROR: Missing AIRTABLE_CATEGORIES_TABLE environment variable in getAllCategories.");
        throw new Error("Missing AIRTABLE_CATEGORIES_TABLE environment variable");
    }

    const toolsBase = getToolsBase();

    try {

        console.log(`[getAllCategories] Fetching active tools to determine used categories from: ${process.env.AIRTABLE_TOOLS_TABLE}`);
        const activeTools = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
            .select({
                filterByFormula: "{Active} = TRUE()",
                fields: ["Categories"],
            })
            .all();
        console.log(`[getAllCategories] Found ${activeTools.length} active tools.`);

        const usedCategoryIds = new Set();
        for (const tool of activeTools) {
            const categories = tool.fields["Categories"] || [];
            categories.forEach((catId) => usedCategoryIds.add(catId));
        }
        console.log(`[getAllCategories] Found ${usedCategoryIds.size} unique category IDs used by active tools.`);

        console.log(`[getAllCategories] Fetching all categories from: ${process.env.AIRTABLE_CATEGORIES_TABLE}`);
        const categoryRecords = await toolsBase(
            process.env.AIRTABLE_CATEGORIES_TABLE,
        )
            .select({
                fields: ["Name", "Slug", "Description", "Count"],
            })
            .all();
        console.log(`[getAllCategories] Found ${categoryRecords.length} total categories.`);

        const filteredCategories = categoryRecords.filter((record) =>
            usedCategoryIds.has(record.id),
        );
        console.log(`[getAllCategories] Filtered down to ${filteredCategories.length} categories actively used by tools.`);

        const mappedCategories = filteredCategories.map((record) => ({
            id: record.id,
            Name: record.fields["Name"],
            Slug: record.fields["Slug"],
            Description: record.fields["Description"] ?? null,
            Count: record.fields["Count"] ?? 0,
        }));
        console.log("[getAllCategories] Successfully mapped filtered categories.");
        return mappedCategories;

    } catch (error) {
        console.error("[getAllCategories] ERROR fetching categories:", error.message, error.stack);
        throw error;
    }
}

// --- SIMPLIFIED AND CORRECTED getToolsByCategory ---
export async function getToolsByCategory(Slug) {
    console.log(`[getToolsByCategory] Attempting to fetch tools for category Slug: "${Slug}"`);
    const toolsBase = getToolsBase();

    try {
        console.log(`[getToolsByCategory] Fetching category record for Slug: "${Slug}" from ${process.env.AIRTABLE_CATEGORIES_TABLE}`);
        const categoryResult = await toolsBase(
            process.env.AIRTABLE_CATEGORIES_TABLE,
        )
            .select({
                filterByFormula: `{Slug} = "${Slug}"`,
                fields: ["Name", "Tools"],
                maxRecords: 1,
            })
            .all();

        const category = categoryResult[0];
        if (!category) {
            console.warn(`[getToolsByCategory] Category with Slug "${Slug}" not found. Returning empty array.`);
            return [];
        }
        console.log(`[getToolsByCategory] Found category: "${category.fields.Name}" (ID: ${category.id})`);

        const linkedToolIds = category.fields["Tools"] || [];
        console.log(`[getToolsByCategory] Category "${category.fields.Name}" has ${linkedToolIds.length} linked tool IDs.`);

        if (linkedToolIds.length === 0) {
            console.log(`[getToolsByCategory] No linked tools for category "${category.fields.Name}". Returning empty array.`);
            return [];
        }

        const idFilterParts = linkedToolIds.map(id => `RECORD_ID() = '${id}'`);
        const idFilterString = idFilterParts.join(', '); // This joins them correctly for the OR function.
        const combinedFilterFormula = `AND({Active} = TRUE(), OR(${idFilterString}))`;

        console.log(`[getToolsByCategory] Constructed Airtable filter formula: ${combinedFilterFormula}`);

        console.log(`[getToolsByCategory] Fetching tools from: ${process.env.AIRTABLE_TOOLS_TABLE} using combined filter.`);
        const toolsRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
            .select({
                filterByFormula: combinedFilterFormula,
            })
            .all();
        console.log(`[getToolsByCategory] Found ${toolsRecords.length} active tools linked to category "${category.fields.Name}".`);

        const mappedTools = toolsRecords.map((record) => ({ id: record.id, ...record.fields }));
        console.log("[getToolsByCategory] Successfully mapped tools for category.");
        return mappedTools;

    } catch (error) {
        console.error(`[getToolsByCategory] ERROR fetching tools for category "${Slug}":`, error.message, error.stack);
        throw error;
    }
}

export async function getToolBySlug(Slug) {
    console.log(`[getToolBySlug] Attempting to fetch tool by Slug: "${Slug}"`);
    const toolsBase = getToolsBase();

    try {
        console.log(`[getToolBySlug] Fetching from table: ${process.env.AIRTABLE_TOOLS_TABLE} with filter: {Slug} = "${Slug}"`);
        const result = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
            .select({
                filterByFormula: `{Slug} = "${Slug}"`,
                fields: ["Name", "Slug", "Website", /* Add all other fields you need for the tool detail page here */
                         "Description", "Why", "Details", "Features", "Cautions", "Buyer", "Pricing", "Domain", "Base_Model"
                ],
                maxRecords: 1,
            })
            .firstPage();

        if (!result || result.length === 0) {
            console.warn(`[getToolBySlug] Tool with Slug "${Slug}" not found. Returning null.`);
            return null;
        }

        const toolFields = result[0].fields;
        console.log(`[getToolBySlug] Found tool: ${toolFields.Name} (ID: ${result[0].id})`);
        return { id: result[0].id, ...toolFields }; // Include id and all fields

    } catch (error) {
        console.error(`[getToolBySlug] ERROR fetching tool by Slug "${Slug}":`, error.message, error.stack);
        throw error;
    }
}

export async function getAllArticles() {
    console.log("[getAllArticles] Attempting to fetch all published articles.");

    // This check is duplicated, consider putting it in getToolsBase if all functions rely on it
    if (!process.env.AIRTABLE_ARTICLES_TABLE) {
        console.error("CRITICAL ERROR: Missing AIRTABLE_ARTICLES_TABLE environment variable in getAllArticles.");
        throw new Error("Missing AIRTABLE_ARTICLES_TABLE environment variable");
    }

    const toolsBase = getToolsBase();

    try {
        console.log(`[getAllArticles] Fetching from table: ${process.env.AIRTABLE_ARTICLES_TABLE} with filter: {Published} = TRUE() and sort by Date desc.`);
        const records = await toolsBase(process.env.AIRTABLE_ARTICLES_TABLE)
            .select({
                filterByFormula: "{Published} = TRUE()",
                sort: [{ field: "Date", direction: "desc" }],
            })
            .all();
        console.log(`[getAllArticles] Found ${records.length} published articles.`);

        console.log(
            "[getAllArticles] Article Slugs found:",
            records.map((r) => r.get("Slug")),
        );

        const mappedArticles = records
            .map((record) => ({
                id: record.id,
                Title: record.get("Title") || "",
                Slug: record.get("Slug") || "",
                Summary: record.get("Summary") || "",
                Content: record.get("Content") || "",
                Date: record.get("Date") || "",
                Tags: record.get("Tags") || [],
                Image: record.get("Image") || null,
                Author: record.get("Author") || "",
            }))
            .filter((record) => record.Slug); // Filter out any records without a slug

        console.log(`[getAllArticles] Successfully mapped and filtered ${mappedArticles.length} articles.`);
        return mappedArticles;

    } catch (error) {
        console.error("[getAllArticles] ERROR fetching all articles:", error.message, error.stack);
        throw error;
    }
}

export async function getArticleBySlug(Slug) {
    console.log(`[getArticleBySlug] Attempting to fetch article by Slug: "${Slug}"`);
    const toolsBase = getToolsBase();

    try {
        console.log(`[getArticleBySlug] Fetching from table: ${process.env.AIRTABLE_ARTICLES_TABLE} with filter: LOWER({Slug}) = '${Slug.toLowerCase()}'`);
        const records = await toolsBase(process.env.AIRTABLE_ARTICLES_TABLE)
            .select({
                filterByFormula: `LOWER({Slug}) = '${Slug.toLowerCase()}'`,
                maxRecords: 1,
            })
            .firstPage();

        if (!records || records.length === 0) {
            console.warn(`[getArticleBySlug] Article with Slug "${Slug}" not found. Returning null.`);
            return null;
        }

        const record = records[0];
        console.log(`[getArticleBySlug] Found article: "${record.get("Title")}" (ID: ${record.id})`);
        return {
            id: record.id,
            Title: record.get("Title") || "",
            Slug: record.get("Slug") || "",
            Summary: record.get("Summary") || "",
            Content: record.get("Content") || "",
            Date: record.get("Date") || "",
            Tags: record.get("Tags") || [],
            Image: record.get("Image") || null,
            Author: record.get("Author") || "",
        };

    } catch (error) {
        console.error(`[getArticleBySlug] ERROR fetching article by Slug "${Slug}":`, error.message, error.stack);
        throw error;
    }
}