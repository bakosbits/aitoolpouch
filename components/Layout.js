import Link from 'next/link'

export default function Layout({ children, fullWidth = false, categories = [] }) {
  return (
    <div className="flex flex-col min-h-screen bg-backgroundDark text-grayText">
      
      {/* Header */}
      <header className="bg-backgroundDark w-full text-grayText">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-accentGreen hover:text-headingWhite transition-colors duration-150 text-3xl font-extrabold tracking-tight">
            AI Tool Pouch
          </Link>
          <nav className="flex items-center space-x-6 font-semibold">
            <Link href="/" className="hover:text-headingWhite transition-colors duration-150">Home</Link>
            <Link href="/foundational-models" className="hover:text-headingWhite transition-colors duration-150">Foundational Models</Link>
            <Link href="/categories" className="hover:text-headingWhite transition-colors duration-150">Categories</Link>
            <Link href="/tools" className="hover:text-headingWhite transition-colors duration-150">Browse All</Link>
            <Link href="/musings" className="hover:text-headingWhite transition-colors duration-150">Musings</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full px-6 py-4">
        <div className={fullWidth ? 'w-full' : 'max-w-6xl mx-auto'}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-backgroundDark py-4  text-grayText">
        <div className="w-full px-6 max-w-6xl mx-auto font-semibold">
          <nav className="flex justify-center space-x-6">
            <Link href="/about" className="hover:text-headingWhite transition">About</Link>
            <Link href="/contact" className="hover:text-headingWhite transition">Contact</Link>
            <Link href="/legal" className="hover:text-headingWhite transition">Legal</Link>
            <Link href="/privacy" className="hover:text-headingWhite transition">Privacy</Link>
            <Link href="/terms" className="hover:text-headingWhite transition">Terms of Use</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
