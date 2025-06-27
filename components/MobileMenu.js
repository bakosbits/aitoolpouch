import { useState } from 'react';
import Link from 'next/link';

export default function MobileMenu({ categories }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600"
      >
        {/* Hamburger icon */}
        <svg
          className="h-6 w-6 text-grayText"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {open ? (
            // X icon when open
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon when closed
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md border-t border-gray-200 z-50">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link href="/">
                <a className="block text-grayText hover:text-headingWhite">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a className="block text-grayText hover:text-HeadingWhite">Blog</a>
              </Link>
            </li>
            <li>
              <span className="block font-medium text-gray-900 pb-2">Browse Categories</span>
              <ul className="pl-4 border-l border-gray-300 space-y-1">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`}>
                      <a className="block text-grayText hover:text-headingWhite">{cat.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
