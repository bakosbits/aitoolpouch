import Link from 'next/link'

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/tool/${tool.Slug}`}
      className="block bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-lg font-semibold">{tool.Name}</h2>
      <p className="text-sm text-gray-600">{tool.Description}</p>
      {tool['Base Model'] && (
        <p className="text-xs text-blue-500 mt-2">
          Powered by {tool['Base Model']}
        </p>
      )}
    </Link>
  )
}
