
import Link from 'next/link'

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/tool/${tool.Slug}`}
      className="block bg-gray-100 border border-gray-300 p-4 rounded-md hover:bg-gray-200 transition group"
    >
      <h2 className="text-lg font-bold text-gray-900 group-hover:underline transition-all duration-150">
        {tool.Name}
      </h2>
      <p className="text-sm text-gray-600">{tool.Description}</p>
      {tool['Base Model'] && (
        <p className="text-xs text-blue-500 mt-2">
          Powered by {tool['Base Model']}
        </p>
      )}
    </Link>
  )
}
