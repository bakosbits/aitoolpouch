import React, { useState, useEffect } from 'react';

export default function LogoCard({ name, domain, klassName}) {
    const clientId = "1id03xd53EDa-VjPpgF";
    const letter = name.charAt(0).toUpperCase();
    const letterLink = `/logos/${letter}.jpg`;
    const initialLogoLink = `https://cdn.brandfetch.io/${domain}/fallback/404/icon?c=${clientId}`;

    console.log(`LogoCard rendered for: ${name}, Domain: ${domain}, Initial Logo URL: ${initialLogoLink}`);

    const [src, setSrc] = useState(initialLogoLink);

    useEffect(() => {
        console.log(`LogoCard useEffect: Domain changed to ${domain}, setting src to ${initialLogoLink}`);
        setSrc(initialLogoLink);
    }, [domain, initialLogoLink]); 

    return (
        <img
            loading="lazy"
            onError={() => {
                console.warn(`Logo load error for ${name} (Domain: ${domain}). Falling back to letter logo: ${letterLink}`);
                setSrc(letterLink);
            }}
            src={src}
            alt={`${name} logo`}
            className={klassName}
        />
    );
};