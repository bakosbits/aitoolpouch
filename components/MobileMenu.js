import { useState } from 'react'
import Link from 'next/link'

export default function MobileMenu({ categories }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden bg-white border-b px-4 py-3">
      <button onClick={() => setOpen(!open)} className="text-sm font-medium text-gray-700">
        {open ? 'Close Menu' : 'Browse Categories'}
      </button>
      {open && (
        <ul className="mt-4 space-y-2">
          {Array.isArray(categories) && categories.map((cat) => (
            <li key={cat.slug}>
              <Link href={`/category/${cat.slug}`} className="block text-gray-700 hover:text-blue-600">
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
