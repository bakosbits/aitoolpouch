import Airtable from 'airtable'

function getToolsBase() {
  const { AIRTABLE_API_KEY, AIRTABLE_TOOLS_BASE_ID, AIRTABLE_TOOLS_TABLE } = process.env

  if (!AIRTABLE_API_KEY || !AIRTABLE_TOOLS_BASE_ID || !AIRTABLE_TOOLS_TABLE) {
    throw new Error('Missing Airtable environment variables')
  }

  return new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_TOOLS_BASE_ID)
}

export async function getAllTools() {
  const toolsBase = getToolsBase()

  // Step 1: Fetch all categories
  const categoryRecords = await toolsBase(process.env.AIRTABLE_CATEGORIES_TABLE)
    .select({ fields: ['Name', 'Slug'] })
    .all()

  // Step 2: Map categories by their Airtable record ID
  const categoryMap = {}
  categoryRecords.forEach((cat) => {
    categoryMap[cat.id] = {
      id: cat.id,
      name: cat.fields['Name'],
      slug: cat.fields['Slug'],
    }
  })

  // Step 3: Fetch all tools
  const toolRecords = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
    .select()
    .all()

  // Step 4: Merge tools with expanded category info
  return toolRecords.map((record) => {
    const categoryIds = record.fields['Categories'] || []
    const expandedCategories = categoryIds.map((id) => categoryMap[id]).filter(Boolean)

    return {
      id: record.id,
      ...record.fields,
      Categories: expandedCategories, // ✅ Now includes name & slug
    }
  })
}


export async function getAllCategories() {
  const toolsBase = getToolsBase()
  const records = await toolsBase(process.env.AIRTABLE_CATEGORIES_TABLE)
    .select({ fields: ['Name', 'Slug', 'Description'] })
    .all()

  return records.map((record) => ({
    id: record.id,
    name: record.fields['Name'],
    slug: record.fields['Slug'], // ✅ Use stored slug
    description: record.fields['Description'] ?? null, //
  }))
}

export async function getToolsByCategory(slug) {
  const toolsBase = getToolsBase()

  const categoryResult = await toolsBase(process.env.AIRTABLE_CATEGORIES_TABLE)
    .select({
      filterByFormula: `{Slug} = "${slug}"`,
      fields: ['Name', 'Slug', 'Tools'],
      maxRecords: 1,
    })
    .all()

  const category = categoryResult[0]
  if (!category) return []

  const toolIds = category.fields['Tools'] || []

  const tools = await Promise.all(
    toolIds.map((id) =>
      toolsBase(process.env.AIRTABLE_TOOLS_TABLE).find(id)
    )
  )

  return tools.map((record) => ({ id: record.id, ...record.fields }))
}



export async function getToolsBySlug(slug) {
  const toolsBase = getToolsBase()
  const records = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
    .select({
      filterByFormula: `SEARCH(LOWER("${slug}"), LOWER(ARRAYJOIN({Slug})))`
    })
    .all()
  return records.map((record) => ({ id: record.id, ...record.fields }))
}

