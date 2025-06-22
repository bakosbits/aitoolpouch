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


export default function CategoryPage({ tools, category, categories }) {
  if (!category) {
    return <p className="text-red-600 text-center mt-6">Category not found.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 capitalize">{category.name}</h1>

      {/* Comparison dropdowns (ToolCompareSelector) */}
      {tools.length > 1 && (
        <div className="mb-8">
          <ToolCompareSelector tools={tools} />
        </div>
      )}

      {/* Tool cards */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <li key={tool.id}>
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
    </div>
  );
}


// export async function getStaticPaths() {
//   const tools = await getAllTools()
//   const paths = []

//   tools.forEach(toolA => {
//     tools.forEach(toolB => {
//       if (toolA.Slug !== toolB.Slug) {
//         paths.push({
//           params: {
//             slugA: toolA.Slug.toLowerCase(),
//             slugB: toolB.Slug.toLowerCase()
//           }
//         })
//       }
//     })
//   })

//   return { paths, fallback: false }
// }

// export async function getStaticProps({ params }) {
//   const tools = await getAllTools()
//   const categories = await getAllCategories()

//   const toolA = tools.find(t => t.Slug.toLowerCase() === params.slugA)
//   const toolB = tools.find(t => t.Slug.toLowerCase() === params.slugB)

//   return {
//     props: {
//       toolA: toolA || null,
//       toolB: toolB || null,
//       categories
//     }
//   }
// }


// export default function ComparePage({ toolA, toolB, categories }) {
//   if (!toolA || !toolB) {
//     return (
//         <p className="text-center text-red-600 mt-6">Comparison failed. Tool not found.</p>
//     )
//   }

//   return (
//       <div className="p-6 max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">
//           Compare {toolA.Name} vs {toolB.Name}
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <ToolCard tool={toolA} />
//           <ToolCard tool={toolB} />
//         </div>
//       </div>
//   )
// }

