import Link from "next/link";
import MobileMenu from "./MobileMenu"; // adjust path if needed

export default function Layout({
    children,
    fullWidth = false,
    categories = [],
}) {
    return (
        <div className="flex flex-col min-h-screen bg-backgroundDark text-grayText w-full overflow-x-hidden">
            {/* Header */}
            <header className="w-full text-grayText">
                {/* Unified Header */}
                <div className="w-full px-4 py-4 flex items-center justify-between">
                    {/* Logo (always visible) */}
                    <Link
                        href="/"
                        className="text-accentGreen hover:text-headingWhite transition-colors duration-150 text-2xl font-extrabold tracking-tight"
                    >
                        AI Tool Pouch
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center space-x-6 font-semibold">
                        <Link
                            href="/"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Home
                        </Link>
                        <Link
                            href="/foundational-models"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Foundational Models
                        </Link>
                        <Link
                            href="/categories"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Categories
                        </Link>
                        <Link
                            href="/tools"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            All Tools
                        </Link>
                        <Link
                            href="/blog"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Blog
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <MobileMenu categories={categories} />
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 w-full px-6 py-4">
                <div className="mt-4 md:mt-8 lg:mt-16 mb-6">
                    <div className={fullWidth ? "w-full" : "max-w-6xl mx-auto"}>
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-4  text-grayText">
                <div className="w-full px-0 md:px-6 max-w-6xl mx-auto font-semibold">
                    <nav className="flex flex-wrap justify-center space-x-6">
                        <Link
                            href="/about"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/legal"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Legal
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-grayText hover:text-headingWhite transition-colors duration-150"
                        >
                            Terms
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
