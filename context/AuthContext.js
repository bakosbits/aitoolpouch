import React, { useState, useEffect, createContext, useRef } from 'react';

// Export AuthContext so it can be used by useContext in other components
export const AuthContext = createContext();

// Export AuthProvider so it can wrap the application in _app.js
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Represents the locally authenticated user
    const [loadingAuth, setLoadingAuth] = useState(true);

    // Hardcoded users for local authentication (not for production!)
    const LOCAL_USERS = useRef([
        { email: 'admin@example.com', password: 'password123' },
        // Add more local users here if needed for testing
    ]);

    useEffect(() => {
        // Check if a user was previously logged in locally
        const storedLocalUserEmail = localStorage.getItem('localAuthUser');
        if (storedLocalUserEmail) {
            setCurrentUser({ email: storedLocalUserEmail });
        }
        setLoadingAuth(false); // Auth loading is complete after checking localStorage
    }, []);

    const signup = async (email, password) => {
        return new Promise((resolve, reject) => {
            if (LOCAL_USERS.current.some(user => user.email === email)) {
                reject(new Error("User with this email already exists locally."));
                return;
            }
            LOCAL_USERS.current.push({ email, password });
            localStorage.setItem('localAuthUser', email);
            setCurrentUser({ email });
            resolve({ email });
        });
    };

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            const user = LOCAL_USERS.current.find(u => u.email === email && u.password === password);
            if (user) {
                localStorage.setItem('localAuthUser', email);
                setCurrentUser({ email });
                resolve(user);
            } else {
                reject(new Error("Invalid email or password."));
            }
        });
    };

    const logout = async () => {
        localStorage.removeItem('localAuthUser');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loadingAuth,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {loadingAuth ? ( // Show loading spinner while auth state is being determined
                <div className="flex justify-center items-center h-screen bg-gray-100">
                    {/* Ensure LoadingSpinner component is correctly imported or defined if used here */}
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="ml-2 text-gray-700">Loading authentication...</p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
