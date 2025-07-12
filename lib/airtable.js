
import Airtable from "airtable";

function getToolsBase() {
    const { 
        AIRTABLE_API_KEY, 
        AIRTABLE_TOOLS_BASE_ID,
        AIRTABLE_TOOLS_TABLE,  
        AIRTABLE_CATEGORIES_TABLE, 
        AIRTABLE_ARTICLES_TABLE    
    } = process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_TOOLS_BASE_ID || 
        !AIRTABLE_TOOLS_TABLE || !AIRTABLE_CATEGORIES_TABLE || !AIRTABLE_ARTICLES_TABLE) {
        
        console.error("CRITICAL ERROR: Missing Airtable Environment Variables!");
        if (!AIRTABLE_API_KEY) console.error("  - AIRTABLE_API_KEY is missing.");
        if (!AIRTABLE_TOOLS_BASE_ID) console.error("  - AIRTABLE_TOOLS_BASE_ID is missing.");
        if (!AIRTABLE_TOOLS_TABLE) console.error("  - AIRTABLE_TOOLS_TABLE is missing.");
        if (!AIRTABLE_CATEGORIES_TABLE) console.error("  - AIRTABLE_CATEGORIES_TABLE is missing.");
        if (!AIRTABLE_ARTICLES_TABLE) console.error("  - AIRTABLE_ARTICLES_TABLE is missing.");
        
        throw new Error("Missing Airtable environment variables. Please check your .env.local file for ALL required variables.");
    }

    return new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
        AIRTABLE_TOOLS_BASE_ID,
    );
}

export async function getAllTools() {
    const toolsBase = getToolsBase();

    // Step 1: Fetch all categories
    const categoryRecords = await toolsBase(
        process.env.AIRTABLE_CATEGORIES_TABLE,
    )
        .select({ fields: ["Name", "Slug"] })
        .all();

    // Step 2: Map categories by their Airtable record ID
    const categoryMap = {};
    categoryRecords.forEach((cat) => {
        categoryMap[cat.id] = {
            id: cat.id,
            name: cat.fields["Name"],
            slug: cat.fields["Slug"],
        };
    });

    // Step 3: Fetch all tools
    const toolRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
        .select({ filterByFormula: "{Active} = TRUE()" })
        .all();

    // Step 4: Merge tools with expanded category info
    return toolRecords.map((record) => {
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
}

export async function getAllCategories() {
    const toolsBase = getToolsBase();

    // 1. Fetch all active tools
    const activeTools = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
        .select({
            filterByFormula: "{Active} = TRUE()",
            fields: ["Categories"], // or "Category" if it's a single field
        })
        .all();

    // 2. Collect category IDs from those tools
    const usedCategoryIds = new Set();
    for (const tool of activeTools) {
        const categories = tool.fields["Categories"] || [];
        categories.forEach((catId) => usedCategoryIds.add(catId));
    }

    // 3. Fetch all categories
    const categoryRecords = await toolsBase(
        process.env.AIRTABLE_CATEGORIES_TABLE,
    )
        .select({
            fields: ["Name", "Slug", "Description"],
        })
        .all();

    // 4. Filter categories to only include ones used by active tools
    const filteredCategories = categoryRecords.filter((record) =>
        usedCategoryIds.has(record.id),
    );

    // 5. Return mapped list
    return filteredCategories.map((record) => ({
        id: record.id,
        name: record.fields["Name"],
        slug: record.fields["Slug"],
        description: record.fields["Description"] ?? null,
    }));
}

// --- SIMPLIFIED AND CORRECTED getToolsByCategory ---
export async function getToolsByCategory(slug) {
    const toolsBase = getToolsBase();

    // 1. Fetch the category to get its linked tool IDs
    const categoryResult = await toolsBase(
        process.env.AIRTABLE_CATEGORIES_TABLE,
    )
        .select({
            filterByFormula: `{Slug} = "${slug}"`,
            fields: ["Name", "Tools"], 
            maxRecords: 1, 
        })
        .all();

    const category = categoryResult[0];
    if (!category) {
        console.warn(`[getToolsByCategory] Category with slug "${slug}" not found.`);
        return [];
    }

    const linkedToolIds = category.fields["Tools"] || [];

    if (linkedToolIds.length === 0) {
        console.log(`[getToolsByCategory] Category "${category.fields.Name}" has no linked tools.`);
        return [];
    }

    // 2. Build a combined filter for Airtable:
    const idFilterParts = linkedToolIds.map(id => `RECORD_ID() = '${id}'`);

    const idFilterString = idFilterParts.join(', ');

    const combinedFilterFormula = `AND({Active} = TRUE(), OR(${idFilterString}))`;

    // 3. Fetch tools using the combined filter
    const toolsRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
        .select({
            filterByFormula: combinedFilterFormula,
        })
        .all();

    return toolsRecords.map((record) => ({ id: record.id, ...record.fields }));
}

export async function getToolBySlug(slug) {
    const toolsBase = getToolsBase();

    const result = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
        .select({
            filterByFormula: `{Slug} = "${slug}"`,
            fields: ["Name", "Slug", "Website"],
            maxRecords: 1,
        })
        .firstPage();

    return result[0]?.fields ? { ...result[0].fields } : null;
}

export async function getAllArticles() {
    const toolsBase = getToolsBase();

    const records = await toolsBase(process.env.AIRTABLE_ARTICLES_TABLE)
        .select({
            filterByFormula: "{Published} = TRUE()",
            sort: [{ field: "Date", direction: "desc" }],
        })
        .all();

    console.log(
        "Slugs:",
        records.map((r) => r.get("Slug")),
    );
    return records
        .map((record) => ({
            id: record.id,
            title: record.get("Title") || "",
            slug: record.get("Slug") || "",
            summary: record.get("Summary") || "",
            content: record.get("Content") || "",
            date: record.get("Date") || "",
            tags: record.get("Tags") || [],
            image: record.get("Image") || null,
            author: record.get("Author") || "",
        }))
        .filter((record) => record.slug);
}

export async function getArticleBySlug(slug) {
    const toolsBase = getToolsBase();

    const records = await toolsBase(process.env.AIRTABLE_ARTICLES_TABLE)
        .select({
            filterByFormula: `LOWER({Slug}) = '${slug.toLowerCase()}'`,
            maxRecords: 1,
        })
        .firstPage();

    if (!records || records.length === 0) {
        return null;
    }

    const record = records[0];
    return {
        id: record.id,
        title: record.get("Title") || "",
        slug: record.get("Slug") || "",
        summary: record.get("Summary") || "",
        content: record.get("Content") || "",
        date: record.get("Date") || "",
        tags: record.get("Tags") || [],
        image: record.get("Image") || null,
        author: record.get("Author") || "",
    };
}
