import { useRouter } from 'next/router';
import ToolCard from '../../components/ToolCard';

export default function CategoryPage({ tools }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug} Tools</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
}
