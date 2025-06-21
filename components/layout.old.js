import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';

export default function Layout({ children, categories }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top header */}
      <header className="w-full h-16 bg-gray-800 text-white flex items-center px-4">
        <h1 className="text-lg font-bold">Your Site</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-64 bg-gray-200 border-r">
          <Sidebar categories={categories} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
