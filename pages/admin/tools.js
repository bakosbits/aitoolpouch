import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar'; // Adjusted import path
import DataPage from '../../components/DataPage'; // Adjusted import path
import { AuthContext } from '../../context/AuthContext'; // Adjusted import path
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjusted import path

const toolFields = [
    { name: 'name', label: 'Tool Name' },
    { name: 'description', label: 'Description' },
    { name: 'category', label: 'Category' },
    { name: 'tags', label: 'Tags (comma-separated)' },
    { name: 'url', label: 'URL' }
];

const ToolsPage = () => {
    const { currentUser, loadingAuth } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (!loadingAuth && !currentUser) {
            router.push('/admin/auth'); // Redirect to login if not authenticated
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
        return null; // Or a simple message, as redirect is handled by useEffect
    }

    return (
        <div className="min-h-screen bg-gray-100 font-inter antialiased">
            <Navbar />
            <main className="p-4">
                <DataPage title="Tools" collectionName="Tools" fields={toolFields} />
            </main>
        </div>
    );
};

export default ToolsPage;
