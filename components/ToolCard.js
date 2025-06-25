import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ToolCard({ tool }) {
  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-md hover:bg-gray-200 transition group">

      {/* Link to detail page */}
      <Link href={`/tool/${tool.Slug}`} className="block">
        <div className="flex items-center space-x-4 mb-2">
          <img
            src={tool.Logo}
            alt={`${tool.Name} logo`}
            className="h-10 w-10 object-contain"
          />
          <h2 className="text-lg font-bold text-gray-900 group-hover:underline transition-all duration-150">
            {tool.Name}
          </h2>
        </div>

        <p className="text-sm text-gray-600">{tool.Description}</p>
        <p className="text-sm text-gray-600 italic mt-2"><strong>Why it matters:</strong> {tool.Why}</p>
        {tool['Base Model'] && (
          <p className="text-xs text-blue-500 mt-2">
            Powered by {tool['Base Model']}
          </p>
        )}
      </Link>

      {/* Affiliate button link */}
      {tool.Link && (
        <a
          href={tool.Link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Visit Website
        </a>
      )}
    </div>
  )
}
