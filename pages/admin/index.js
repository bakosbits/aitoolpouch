import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'; // Adjusted import path
import { AuthContext } from '../../context/AuthContext'; // Adjusted import path
import AuthForm from '../../components/AuthForm'; // Adjusted import path
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjusted import path

const HomePage = () => {
    const router = useRouter();
    const { currentUser, loadingAuth } = useContext(AuthContext);

    // Redirect to auth page if not logged in and auth is no longer loading
    useEffect(() => {
        if (!loadingAuth && !currentUser) {
            router.push('/admin/auth'); // Redirect to the new admin auth page
        }
    }, [currentUser, loadingAuth, router]);

    if (loadingAuth) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!currentUser) {
        return null; // Render nothing while redirecting
    }

    return (
        <div className="min-h-screen bg-gray-100 font-inter antialiased">
            <Navbar />
            <main className="container mx-auto p-8 bg-white rounded-lg shadow-xl mt-8 animate-fade-in">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Welcome to AI ToolPouch Admin Panel!</h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Manage your website content including tools, categories, articles, and tags.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button
                        onClick={() => router.push('/admin/tools')}
                        className="flex flex-col items-center justify-center p-6 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105"
                    >
                        <span className="text-5xl mb-3">🛠️</span>
                        <span className="text-xl font-semibold">Manage Tools</span>
                    </button>
                    <button
                        onClick={() => router.push('/admin/categories')}
                        className="flex flex-col items-center justify-center p-6 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
                    >
                        <span className="text-5xl mb-3">📂</span>
                        <span className="text-xl font-semibold">Manage Categories</span>
                    </button>
                    <button
                        onClick={() => router.push('/admin/articles')}
                        className="flex flex-col items-center justify-center p-6 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition duration-300 transform hover:scale-105"
                    >
                        <span className="text-5xl mb-3">📝</span>
                        <span className="text-xl font-semibold">Manage Articles</span>
                    </button>
                    <button
                        onClick={() => router.push('/admin/tags')}
                        className="flex flex-col items-center justify-center p-6 bg-orange-500 text-white rounded-xl shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105"
                    >
                        <span className="text-5xl mb-3">🏷️</span>
                        <span className="text-xl font-semibold">Manage Tags</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
