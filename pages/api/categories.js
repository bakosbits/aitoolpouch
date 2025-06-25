import { getAllCategories } from '@/lib/airtable';

export default async function handler(req, res) {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}
