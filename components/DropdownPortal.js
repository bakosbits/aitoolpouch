import { useState, useRef } from 'react';

export default function DropdownPortal({ categories = [] }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  //Early return if categories are missing or empty
  if (!Array.isArray(categories) || categories.length === 0) return null;

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150); // small delay to prevent flicker
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        position: 'relative',
        zIndex: 9999, // ✅ boost entire container's stacking context
      }}
    >
      <span
        style={{
          color: '#111827',
          fontSize: '16px',
          fontWeight: '500',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#1D4ED8')}
        onMouseLeave={(e) => (e.target.style.color = '#111827')}
      >
        Categories
      </span>

      {dropdownOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: 'white',
            color: '#111827',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: '8px 0',
            zIndex: 9999,
            minWidth: '160px',
            marginTop: '4px',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {[...categories].sort((a, b) => a.name.localeCompare(b.name)).map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`/category/${cat.slug}`}
                  style={{
                    display: 'block',
                    padding: '8px 16px',
                    color: '#111827',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#F3F4F6')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
