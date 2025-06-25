import Airtable from 'airtable'


function getToolsBase() {
  const { AIRTABLE_API_KEY, AIRTABLE_TOOLS_BASE_ID, AIRTABLE_TOOLS_TABLE } = process.env

  if (!AIRTABLE_API_KEY || !AIRTABLE_TOOLS_BASE_ID || !AIRTABLE_TOOLS_TABLE) {
    throw new Error('Missing Airtable environment variables')
  }

  return new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_TOOLS_BASE_ID)
}

export async function getAllCategories() {
  const toolsBase = getToolsBase()
  const records = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
    .select({ fields: ['Category'] })
    .all()

  const categorySet = new Set()
  records.forEach((record) => {
    const value = record.fields['Category']
    if (Array.isArray(value)) {
      value.forEach((v) => categorySet.add(v.toLowerCase()))
    } else if (typeof value === 'string') {
      categorySet.add(value.toLowerCase())
    }
  })

  return Array.from(categorySet).map((cat) => ({
    slug: cat.replace(/\s+/g, '-'),
    name: cat.replace(/\b\w/g, (l) => l.toUpperCase())
  }))
}

export async function getAllTools() {
  const toolsBase = getToolsBase()
  const records = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
    .select()
    .all()
  return records.map((record) => ({ id: record.id, ...record.fields }))
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

export async function getToolsByCategory(slug) {
  const toolsBase = getToolsBase()
  const records = await toolsBase(process.env.AIRTABLE_TOOLS_TABLE)
    .select({
      filterByFormula: `SEARCH(LOWER("${slug}"), LOWER(ARRAYJOIN({Category})))`
    })
    .all()
  return records.map((record) => ({ id: record.id, ...record.fields }))
}
