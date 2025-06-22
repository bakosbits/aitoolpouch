// pages/tools/[toolSlug].js
import { getToolBySlug } from '@/lib/airtable'; // Function to fetch tool details

export async function getStaticPaths() {
  const tools = await getAllTools(); // Fetch all tools from Airtable
  const paths = tools.map((tool) => ({
    params: { toolSlug: tool.Slug }, // Generate paths based on tool slug
  }));

  return { paths, fallback: false }; // Static generation for tool pages
}

export async function getStaticProps({ params }) {
  const { toolSlug } = params;

  // Fetch the specific tool by its slug
  const tool = await getToolBySlug(toolSlug);

  return {
    props: {
      tool, // Pass tool data to the page
    },
  };
}

export default function ToolPage({ tool }) {
  // Render tool details (no comparison functionality here)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{tool.Name}</h1>
      <p className="text-gray-700 mb-4">{tool.Description}</p>
      {/* Render additional tool details here */}
    </div>
  );
}
