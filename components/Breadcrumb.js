import Link from 'next/link';

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;
      
  return (
    <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <ol className="list-reset flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-1">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:underline text-blue-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
