import { getAllCategories, getToolsByCategory } from '@/lib/airtable';
import ToolCard from '@/components/ToolCard';
import ToolCompareSelector from '@/components/ToolCompareSelector';


export async function getStaticPaths() {
  const categories = await getAllCategories();

  const paths = categories.map((cat) => ({
    params: { slug: cat.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;

  // Fetch categories first so we can use them to get the display name
  const categories = await getAllCategories();

  // Find the full category record by matching slug
  const matchingCategory = categories.find((cat) => cat.slug === slug);

  // If the slug is invalid (no match), return 404
  if (!matchingCategory) {
    return {
      notFound: true,
    };
  }

  // Then get all tools in this category using the slug
  const tools = await getToolsByCategory(slug);

  return {
    props: {
      tools,
      category: matchingCategory.name, // This is the display name for the heading
      categories, // optional, depending on whether you use this in the layout
    },
  };
}


export default function CategoryPage({ tools, category }) {
  if (!category) {
    return <p className="text-red-600 text-center mt-6">Category not found.</p>;
  }

  return (

    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-2xl text-headingWhite font-bold mb-8 capitalize">
        Explore The {category}
      </h1>

      {tools.length > 1 && (
        <div className="mb-8">
          <ToolCompareSelector tools={tools} />
        </div>
      )}

      <div className="w-full">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <li key={tool.id}>
              <ToolCard tool={tool} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
