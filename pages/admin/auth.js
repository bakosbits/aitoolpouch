import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext'; // Adjusted import path
import { showMessageBox } from '../../components/MessageBox'; // Adjusted import path
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjusted import path

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
    const [loading, setLoading] = useState(false);
    const { login, signup, currentUser, loadingAuth } = useContext(AuthContext); // Get loadingAuth
    const router = useRouter();

    useEffect(() => {
        if (!loadingAuth && currentUser) { // Only redirect if auth is loaded and user exists
            router.push('/admin'); // Redirect to the new admin home if already logged in
        }
    }, [currentUser, loadingAuth, router]);

    if (loadingAuth) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (currentUser) {
        return null; // Render nothing while redirecting
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isLogin) {
                await login(email, password);
                showMessageBox("Logged in successfully!", "success");
            } else {
                await signup(email, password);
                showMessageBox("Signed up successfully! You are now logged in.", "success");
                showMessageBox("Note: New users are currently stored in-memory for this demo. They will not persist across browser sessions.", "info");
            }
            router.push('/admin'); // Redirect to admin home after successful auth
        } catch (error) {
            console.error("Authentication error:", error);
            showMessageBox(`Authentication failed: ${error.message}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {isLogin ? 'Login' : 'Sign Up'} for AI ToolPouch Admin
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-600 hover:underline"
                        disabled={loading}
                    >
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
