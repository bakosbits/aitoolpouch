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
  const decodedSlug = params.slug.replace(/-/g, ' ');
  const tools = await getToolsByCategory(decodedSlug);
  const categories = await getAllCategories();

  return {
    props: {
      tools,
      category: decodedSlug,
      categories,
    },
  };
}

export default function CategoryPage({ tools, category }) {
  if (!category) {
    return <p className="text-red-600 text-center mt-6">Category not found.</p>;
  }

  return (

    <div className=" max-w-4xl mx-auto px-4 py-10">

      {/* <div className="max-w-6xl mx-auto w-full px-4 py-10"> */}
      <h1 className="text-3xl font-bold mb-6 capitalize">{category.name}</h1>

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
