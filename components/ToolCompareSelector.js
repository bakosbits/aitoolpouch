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
    <div className="bg-gray-100 p-4 rounded mb-4">
      <label htmlFor="toolA">Select Tool A:</label>
      <select id="toolA" value={selectedToolA} onChange={e => setSelectedToolA(e.target.value)}>
        <option value="">-- Select --</option>
        {tools.map(tool => (
          <option key={tool.Slug} value={tool.Slug}>
            {tool.Name}
          </option>
        ))}
      </select>

      <label htmlFor="toolB">Select Tool B:</label>
      <select id="toolB" value={selectedToolB} onChange={e => setSelectedToolB(e.target.value)}>
        <option value="">-- Select --</option>
        {tools.map(tool => (
          <option key={tool.Slug} value={tool.Slug}>
            {tool.Name}
          </option>
        ))}
      </select>

      <button onClick={handleCompare} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Compare
      </button>
    </div>
  );
}
