import React, { useState, useEffect, useContext, useRef } from 'react';
import LoadingSpinner from './LoadingSpinner'; // Ensure this path is correct
import { showMessageBox } from './MessageBox'; // Ensure this path is correct
import { AuthContext } from '../context/AuthContext'; // Ensure this path is correct

// --- Airtable Configuration (REPLACE THESE WITH YOUR ACTUAL VALUES) ---
// For a Next.js app, consider using environment variables:
// process.env.NEXT_PUBLIC_AIRTABLE_API_KEY
// process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID
const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY'; // Example: 'patXXXXXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
const AIRTABLE_BASE_ID = 'YOUR_AIRTABLE_BASE_ID'; // Example: 'appXXXXXXXXXXXXXXXX'

const DataPage = ({ title, collectionName, fields }) => {
    const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({});

    // Function to fetch data from Airtable
    const fetchItems = async () => {
        // Only fetch if currentUser exists (meaning locally authenticated)
        if (!currentUser) {
            console.log('User not authenticated locally. Cannot fetch data from Airtable.');
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${collectionName}`,
                {
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Airtable API error: ${errorData.error.message}`);
            }
            const data = await response.json();
            const fetchedItems = data.records.map(record => ({
                id: record.id,
                ...record.fields
            }));
            setItems(fetchedItems);
        } catch (error) {
            console.error("Error fetching data from Airtable:", error);
            showMessageBox(`Error fetching ${collectionName}: ${error.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch data on component mount and when currentUser changes
    useEffect(() => {
        fetchItems();
    }, [currentUser, collectionName]); // Depend on currentUser and collectionName

    const handleInputChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            showMessageBox("User not authenticated. Please log in.", 'error');
            return;
        }

        const isFormValid = fields.every(field => newItem[field.name] && String(newItem[field.name]).trim() !== '');
        if (!isFormValid) {
            showMessageBox("Please fill in all fields.", 'error');
            return;
        }

        setLoading(true);
        try {
            const fieldsToSend = { ...newItem };
            if (collectionName === 'Tools' && fieldsToSend.tags) {
                fieldsToSend.tags = fieldsToSend.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
            }

            const response = await fetch(
                `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${collectionName}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    },
                    body: JSON.stringify({ records: [{ fields: fieldsToSend }] })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Airtable API error: ${errorData.error.message}`);
            }

            setNewItem({});
            showMessageBox(`${title} added successfully!`, 'success');
            fetchItems(); // Re-fetch data to update the list
        } catch (e) {
            console.error("Error adding record to Airtable: ", e);
            showMessageBox(`Error adding ${title}: ${e.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (id) => {
        if (!currentUser) {
            showMessageBox("User not authenticated. Please log in.", 'error');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${collectionName}?records[]=${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Airtable API error: ${errorData.error.message}`);
            }

            showMessageBox(`${title} deleted successfully!`, 'success');
            fetchItems(); // Re-fetch data to update the list
        } catch (e) {
            console.error("Error deleting record from Airtable: ", e);
            showMessageBox(`Error deleting ${title}: ${e.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-xl mt-8 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">{title} Admin</h2>

            {/* Add New Item Form */}
            <form onSubmit={handleAddItem} className="mb-8 p-6 bg-gray-100 rounded-lg shadow-inner">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add New {title.slice(0, -1)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {fields.map(field => (
                        <div key={field.name} className="flex flex-col">
                            <label htmlFor={field.name} className="text-gray-700 text-sm font-medium mb-1">
                                {field.label}:
                            </label>
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={newItem[field.name] || ''}
                                onChange={handleInputChange}
                                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md transform hover:scale-105"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : `Add ${title.slice(0, -1)}`}
                </button>
            </form>

            {/* Item List */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Existing {title}</h3>
            {loading ? (
                <LoadingSpinner />
            ) : items.length === 0 ? (
                <p className="text-gray-500 text-center">No {title.toLowerCase()} found. Add some above!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tl-lg">ID</th>
                                {fields.map(field => (
                                    <th key={field.name} className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        {field.label}
                                    </th>
                                ))}
                                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="py-3 px-4 text-sm text-gray-800 font-mono">{item.id.substring(0, 6)}...</td>
                                    {fields.map(field => (
                                        <td key={field.name} className="py-3 px-4 text-sm text-gray-700">
                                            {Array.isArray(item[field.name]) ? item[field.name].join(', ') : item[field.name]}
                                        </td>
                                    ))}
                                    <td className="py-3 px-4 text-sm">
                                        <button
                                            onClick={() => handleDeleteItem(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-red-600 transition duration-300 shadow-sm transform hover:scale-105"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DataPage;
