import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

export default function DropdownPortal({ children }) {
    const [mounted, setMounted] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (dropdownOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            });
        }
    }, [dropdownOpen]);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || typeof document === 'undefined') return null;

    return createPortal(
        <div className="relative z-[9999] overflow-visible">
            <button
                ref={buttonRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-blue-600 transition-colors duration-150"
            >
                The Categories
            </button>

            {dropdownOpen && (
                <div className="absolute z-[9999] bg-white border border-gray-300 rounded shadow min-w-[12rem] overflow-visible">
                    <ul style={{ top: `${position.top}px`, left: `${position.left}px` }}>
                        {categories.map((cat) => (
                            <li key={cat.slug}>
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    {cat.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>,
        document.body
    );
}
