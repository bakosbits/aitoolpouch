import React, { useState } from 'react';

export default function LogoCard({ tool, klassName}) {
    
    const clientId = "1id03xd53EDa-VjPpgF";
    const toolName = tool.Name;
    const toolDomain = tool.Domain;

    const letterLink = `/logos/${toolName.charAt(0).toUpperCase()}.jpg`;
    const logoLink = `https://cdn.brandfetch.io/${toolDomain}/fallback/404/icon?c=${clientId}`;

    const [src, setSrc] = useState(logoLink);

    return (
        <img       
            src={src}
            alt={`${tool.Name} logo`}
            className={klassName}
            onError={() => setSrc(letterLink)}
        />   
    );
};