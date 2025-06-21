import { useState } from 'react'
import Link from 'next/link'

export default function Sidebar({ categories }) {
  const [showCategories, setShowCategories] = useState(true)
  const [showBlog, setShowBlog] = useState(true)

  return (
    <div>
      {/* Categories Accordion */}
      <button
        onClick={() => setShowCategories(!showCategories)}
        className="w-full text-left font-semibold text-gray-700 hover:text-blue-600 mb-2"
      >
        {showCategories ? '▼ Browse Categories' : '▶ Browse Categories'}
      </button>

      {showCategories && (
        <ul className="space-y-1 pl-2 mb-4">
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="block text-gray-700 hover:text-blue-500"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
        </ul>
      )}

      {/* Blog Accordion */}
      <button
        onClick={() => setShowBlog(!showBlog)}
        className="w-full text-left font-semibold text-gray-700 hover:text-blue-600 mb-2"
      >
        {showBlog ? '▼ Blog Posts' : '▶ Blog Posts'}
      </button>

      {showBlog && (
        <ul className="space-y-1 pl-2">
          <li>
            <Link href="/blog/welcome" className="block text-gray-700 hover:text-blue-500">
              Welcome to AI Tool Pouch
            </Link>
          </li>
          <li>
            <Link href="/blog/top-tools" className="block text-gray-700 hover:text-blue-500">
              Top 5 AI Tools for 2025
            </Link>
          </li>
          {/* Add more blog links here */}
        </ul>
      )}
    </div>
  )
}
