import Head from "next/head";
import Link from "next/link";

export default function AdminDashboard() {
    return (
        <>
            <Head>
                <title>Admin Dashboard | AI Tool Pouch</title>
            </Head>
            <div className="min-h-screen flex flex-col items-center justify-center bg-backgroundDark">
                <h1 className="text-3xl font-bold text-headingWhite mb-8">
                    Admin Dashboard
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
                    <AdminCard
                        title="Tools"
                        description="Manage all AI tools."
                        href="/admin/tools"
                    />
                    <AdminCard
                        title="Categories"
                        description="Edit and organize categories."
                        href="/admin/categories"
                    />
                    <AdminCard
                        title="Articles"
                        description="Publish and update articles."
                        href="/admin/articles"
                    />
                </div>
            </div>
        </>
    );
}

function AdminCard({ title, description, href }) {
    return (
        <Link href={href} className="block bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-accentGreen transition">
            <h2 className="text-xl font-bold text-headingWhite mb-2">{title}</h2>
            <p className="text-whiteHeading">{description}</p>
        </Link>
    );
}