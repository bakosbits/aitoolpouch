import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import { showMessageBox } from './MessageBox';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logout();
            showMessageBox("Logged out successfully!", "success");
            router.push('/admin/auth'); // Redirect to admin login page after logout
        } catch (error) {
            console.error("Error logging out:", error);
            showMessageBox(`Logout failed: ${error.message}`, "error");
        }
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-lg rounded-b-lg">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-3xl font-extrabold text-white mb-4 md:mb-0">AI ToolPouch Admin</h1>
                <div className="flex flex-wrap justify-center space-x-4">
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Home
                    </button>
                    <button
                        onClick={() => router.push('/admin/tools')}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Tools
                    </button>
                    <button
                        onClick={() => router.push('/admin/categories')}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Categories
                    </button>
                    <button
                        onClick={() => router.push('/admin/articles')}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Articles
                    </button>
                    <button
                        onClick={() => router.push('/admin/tags')}
                        className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md transform hover:scale-105"
                    >
                        Tags
                    </button>
                </div>
                {currentUser && (
                    <div className="text-white text-sm mt-4 md:mt-0 md:ml-4 flex items-center space-x-2">
                        <span>Logged in as: <span className="font-mono bg-blue-800 px-2 py-1 rounded-md">{currentUser.email}</span></span>
                        <button
                            onClick={handleLogout}
                            className="ml-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
