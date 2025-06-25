import Link from 'next/link';

export default function Layout({ children, categories = [] }) {


    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 relative z-[9999]">
            <header className="bg-white border-white-300">
                <div className="max-w-4xl mx-auto w-full px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="text-3xl font-extrabold tracking-tight text-gray-900">
                        AI Tool Pouch
                    </Link>
<nav className="flex justify-center items-center space-x-8 py-4">
  <ul className="flex items-center space-x-8">
    <li><Link href="/foundations" className="text-slate-900 dark:text-white font-medium hover:underline">The Foundational Models</Link></li>
    <li><DropdownPortal categories={categories} /></li>
    <li><Link href="/soapbox" className="text-slate-900 dark:text-white font-medium hover:underline">The SoapBox</Link></li>
  </ul>
</nav>

                </div>
            </header>

            <main className="relative z-[10] flex-1">
                <div className="max-w-6xl mx-auto w-full px-4 py-10 ">{children}</div>
            </main>

            <footer className="bg-white border-white-300 py-4 text-sm text-gray-600">
                <div className="max-w-4xl mx-auto w-full px-4">
                    <nav className="flex justify-center space-x-6">
                        <Link href="/about" className="hover:text-blue-600 transition">
                            About
                        </Link>
                        <Link href="/contact" className="hover:text-blue-600 transition">
                            Contact
                        </Link>
                        <Link href="/legal" className="hover:text-blue-600 transition">
                            Legal
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
