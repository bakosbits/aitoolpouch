import ToolCard from '../components/ToolCard';

export default function Home({ tools }) {
  return (
    <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.name} {...tool} />
      ))}
    </main>
  );
}
