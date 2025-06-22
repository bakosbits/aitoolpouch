// Layout.js
import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import { useRouter } from 'next/router';
import generateBreadcrumbs from '@/utils/generateBreadcrumbs';

export default function Layout({ children, categories }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const breadcrumbs = generateBreadcrumbs(router.asPath);  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
        <h1 className="text-lg font-bold">Header</h1>
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}  // Toggle the mobile menu
          aria-label="Toggle menu"
          type="button"
        >
          ☰
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-200 border-b shadow-md z-50">
          <MobileMenu categories={categories} />
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Always rendered */}
        <aside className="hidden md:block w-64 bg-gray-200 border-r">
          <Sidebar categories={categories} />
        </aside>

        <div className="flex flex-col flex-1 max-w-7xl mx-auto px-4 w-full">
          <main className="flex-1 overflow-y-auto">{children}</main>

          <footer className="border-t py-4 text-gray-600">
            <nav className="flex justify-center space-x-6">
              <a href="/about" className="hover:underline">About</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <a href="/legal" className="hover:underline">Legal</a>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  );
}
