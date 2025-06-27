import { getAllTools } from '@/lib/airtable';
import ToolCard from '@/components/ToolCard';


export async function getStaticProps({ params }) {
  const tools = await getAllTools();

  return {
    props: {
      tools
    },
  };
}

export default function ToolsPage({ tools }) {

  return (

    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl text-headingWhite font-bold mb-6 capitalize">Explore All Tools</h1>
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
