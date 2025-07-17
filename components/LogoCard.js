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
<<<<<<< HEAD
            loading="lazy" 
            onError={() => setSrc(letterLink)}    
=======
            loading="lazy"
            onError={() => setSrc(letterLink)}
>>>>>>> 8e5059e6fddba12de51ea9840fea48a0f2ac6396
            src={src}
            alt={`${name} logo`}
            className={klassName}
        />   
    );
};