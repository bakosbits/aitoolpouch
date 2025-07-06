import Airtable from "airtable";

function getToolsBase() {
    const { AIRTABLE_API_KEY, AIRTABLE_TOOLS_BASE_ID, AIRTABLE_TOOLS_TABLE } =
        process.env;

    if (!AIRTABLE_API_KEY || !AIRTABLE_TOOLS_BASE_ID || !AIRTABLE_TOOLS_TABLE) {
        throw new Error("Missing Airtable environment variables");
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

export async function getToolsByCategory(slug) {
    const toolsBase = getToolsBase();

    const categoryResult = await toolsBase(
        process.env.AIRTABLE_CATEGORIES_TABLE,
    )
        .select({
            filterByFormula: `{Slug} = "${slug}"`,
            fields: ["Name", "Slug", "Tools"],
            maxRecords: 1,
        })
        .all();

    const category = categoryResult[0];
    if (!category) return [];

    const toolIds = category.fields["Tools"] || [];

    const tools = await Promise.all(
        toolIds.map((id) =>
            toolsBase(process.env.AIRTABLE_TOOLS_TABLE).find(id),
        ),
    );

    return tools.map((record) => ({ id: record.id, ...record.fields }));
}

export async function getToolsBySlug(slug) {
    const toolsBase = getToolsBase();
    const records = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
        .select({
            filterByFormula: `SEARCH(LOWER("${slug}"), LOWER(ARRAYJOIN({Slug})))`,
        })
        .all();
    return records.map((record) => ({ id: record.id, ...record.fields }));
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
