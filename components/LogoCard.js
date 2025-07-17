import React, { useState, useEffect } from 'react';

export default function LogoCard({ name, domain, klassName}) {
    
    const clientId = "1id03xd53EDa-VjPpgF";
    const letter = name.charAt(0).toUpperCase();
    const letterLink = `/logos/${letter}.jpg`;
    const logoLink = `https://cdn.brandfetch.io/${domain}/fallback/404/icon?c=${clientId}`;

    useEffect(() => {
    setSrc(`https://cdn.brandfetch.io/${domain}/fallback/404/icon?c=${clientId}`);
    }, [domain]);

    const [src, setSrc] = useState(logoLink);

    return (
        <img       
            loading="lazy"
            onError={() => setSrc(letterLink)}
            src={src}
            alt={`${name} logo`}
            className={klassName}
        />   
    );
};