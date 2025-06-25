import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ToolCompareSelector({ tools }) {
  const [selectedToolA, setSelectedToolA] = useState('');
  const [selectedToolB, setSelectedToolB] = useState('');
  const router = useRouter();

  const handleCompare = () => {
    if (selectedToolA && selectedToolB) {
      router.push(`/compare/${selectedToolA}/vs/${selectedToolB}`);
    }
  };

  return (
    <div className="bg-gray-100 rounded">
      <div className="max-w-4xl w-full px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label htmlFor="toolA" className="block text-sm font-medium mb-1">
              Select Your 1st Vendor:
            </label>
            <select
              id="toolA"
              value={selectedToolA}
              onChange={e => setSelectedToolA(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Select --</option>
              {tools.map(tool => (
                <option key={tool.Slug} value={tool.Slug}>
                  {tool.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="toolB" className="block text-sm font-medium mb-1">
              Select Your 2nd Vendor:
            </label>
            <select
              id="toolB"
              value={selectedToolB}
              onChange={e => setSelectedToolB(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Select --</option>
              {tools.map(tool => (
                <option key={tool.Slug} value={tool.Slug}>
                  {tool.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-2 md:mt-0">
            <button
              onClick={handleCompare}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-colors duration-150"
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
