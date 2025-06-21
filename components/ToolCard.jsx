export default function ToolCard({ name, description, category, url }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="text-xs text-blue-600 mt-auto">Category: {category}</div>
      <a href={url} className="mt-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-lg text-center">Visit</a>
    </div>
  );
}
