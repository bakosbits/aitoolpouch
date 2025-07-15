import React, { useState, useEffect } from 'react';

export default function LogoCard({ name, domain, klassName}) {

    const clientId = "1id03xd53EDa-VjPpgF";
    
    const [isError, setIsError] = useState(false);

    const letterLink = `/logos/${name.charAt(0).toUpperCase()}.jpg`;
    const logoLink = `https://cdn.brandfetch.io/${domain}/fallback/404/icon?c=${clientId}`;

    useEffect(() => {
        setIsError(false);
    }, [logoLink]);    


    const handleImageError = () => {
        setIsError(true);
    };
    
    return (
        <div>
            {!isError ? (            
                <img
                    onError={handleImageError}
                    src={logoLink}
                    alt={`${name} logo`}
                    className={klassName}
                />
            ) : (
                <img
                    src={letterLink}
                    alt={`${name} logo`}
                    className={klassName}
                />
            )}
        </div>
    );
};