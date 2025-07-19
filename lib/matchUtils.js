export const USE_CASE_ALIASES = {
    "Automate outreach": [
        "lead generation", "sales outreach", "email marketing", "CRM integration", "personalized outreach", 
        "marketing automation", "automate workflows", "campaign performance", "sales pipeline"
    ],

    "Create visual content": [ 
        "graphic design", "visual design", "visual collaboration", "visual maps", "create visual content", "content creation"
    ],

    "Summarize meetings": [
        "meeting summaries","note taking", "transcription and summarization", "conversation highlights",
        "summarize meetings", "AI assistant"
    ],
    
    "Build presentations": [
        "AI-powered presentations", "presentation builder", "slide generation", "visual templates", 
        "storyboarding", "content creation"
    ],

    "Generate written content": [
        "content creation", "AI writing assistant", "AI-powered writing", "blog writing", 
        "copy generation", "social media posts", "note taking"
    ],

    "Analyze customer behavior": [
        "customer support", "user analytics", "behavior tracking", "customer segmentation", "funnel analysis", 
        "engagement metrics","retention insights", "campaign performance"
    ],

    "Secure systems": [
        "secure systems", "AI-powered cybersecurity", "threat detection", "security teams", 
        "vulnerability scanning", "data protection", "intelligent automation", "code quality"
    ],

    "Design user interfaces": [
        "UI design", "UX prototyping", "wireframing", "interface builder", "design systems", 
        "component libraries","visual design"
    ],
    "Enrich data": [
        "data augmentation", "metadata tagging", "data cleaning", "information enrichment", 
        "knowledge graph", "contextual labeling", "AI insights"
    ],
    "Transcribe audio": [
        "speech-to-text", "audio transcription", "voice notes", "meeting transcription", "podcast transcriber", 
        "real-time transcription", "transcription and summarization"
    ],
    "Edit video": [
        "video editing", "clip trimming", "scene detection", "AI video assistant", "content repurposing", "visual effects"
    ]
};

export const IO_ALIASES = {
    "text": [
        "content creation", "AI writing assistant", "note taking", "meeting summaries", "transcription and summarization", 
        "copy generation", "blog writing", "social media posts", "conversation highlights", "summarize meetings", "AI assistant", 
        "AI-powered writing", "presentation builder", "slide generation", "storyboarding", "visual templates", "code documentation", "AI insights"
    ],

    "image": [
        "graphic design", "visual design", "visual collaboration", "visual maps", "AI-powered design", "create visual content"
    ],

    "video": [
        "video editing", "clip trimming", "scene detection", "AI video assistant", "content repurposing", "visual effects", 
        "AI-powered video", "AI video generation", "AI-powered presentations"
    ],

    "audio": [
        "audio transcription", "speech-to-text", "voice notes", "meeting transcription", "podcast transcriber", 
        "real-time transcription", "transcription and summarization"
    ],
    "code": [
        "code generation", "code editor", "code snippets", "code quality", "developer productivity", "developer workflows", 
        "AI agents", "AI tools", "intelligent automation"
    ],
    "data": [ 
        "data augmentation", "metadata tagging", "data cleaning", "information enrichment", "knowledge graph", "contextual labeling", 
        "user analytics", "behavior tracking", "customer segmentation", "funnel analysis", "engagement metrics", "retention insights", 
        "campaign performance", "CRM integration", "AI-powered analytics", "AI-powered insights"
    ]
};

export const PREFERENCES_ALIASES = {
    "Free tier pricing": [ 
        "free plan", "freemium", "Free", "no cost", "free trial", "free forever"
    ],

    "No-code": [
        "no-code", "visual builder", "drag-and-drop", "low-code", "workflow automation"
    ],

    "Open source": [
        "open source", "github repo", "MIT license", "self-hosted", "community-driven"
    ],

    "Privacy-first": [
        "local processing", "on-device AI", "no cloud dependency", "privacy-first", "secure by design", "data sovereignty"
    ],

    "API access": [
        "API available", "webhooks", "developer access", "custom integrations", "REST API", "public API"
    ],

    "Collaboration": [
        "multi-user", "shared workspace", "team dashboard", "collaborative editing", "real-time sync", "team features"
    ],

    "Customization": [
        "custom workflows", "editable templates", "UI customization", "configurable output", "flexible setup", "personalized experience"
    ]
};


export const CONTEXT_ALIASES = {
    "Development": [
        "code generation", "code editor", "developer productivity", "developer workflows", "code documentation", "code snippets", "code quality", 
        "AI agents", "AI tools", "intelligent automation", "automate workflows", "Software Developers", "Sales Engineers", "Automation Engineers", "No Code Developers"
    ],

    "Design": [
        "visual design", "graphic design", "visual collaboration", "content creation", "visual maps", "create visual content", "Art and Design", "Content Creators"
    ],

    "Marketing": [
        "marketing automation", "campaign performance", "sales outreach", "personalized outreach", "email marketing", "social media", "AI writing assistant", 
        "content creation", "lead generation", "customer support", "Marketing", "Solopreneurs", "Small Business Owners"
    ],

    "Sales": [
        "lead generation", "sales outreach", "CRM integration", "meeting summaries", "personalized outreach", "customer support", 
        "campaign performance", "sales pipeline", "Sales", "Sales Engineers", "Solopreneurs", "Small Business Owners", "Real Estate", "Finance"

    ],

    "Healthcare": [
        "clinical documentation", "meeting summaries", "note taking", "transcription and summarization", "AI assistant", "secure systems", "Healthcare"
    ],

    "Education": [
        "note taking", "meeting summaries", "AI writing assistant", "transcription and summarization", "summarize meetings", "content creation", "Educators"
    ],

    "Legal": [
        "legal professionals", "contracts", "compliance", "secure systems", "transcription and summarization", "Legal"
    ],

    "Cybersecurity": [
        "secure systems", "AI-powered cybersecurity", "threat detection", "security teams", "vulnerability scanning", "data protection", "intelligent automation", "Cyber Security"
    ],

    "Finance": [
        "Finance", "financial services", "banking", "fintech", "accounting", "revenue forecasting", "expense tracking"
    ],

    "Customer care": [
        "customer support", "help desk", "contact center", "agent assist", "live chat", "ticketing"
    ],

    "Science": [
        "Scientists", "research", "scientific literature", "experiments", "data analysis", "lab automation", "clinical trials"
    ],
    "Public engagement": [
        "Politicians", "policy", "citizen feedback", "community input", "survey tools", "consensus building", "government"
    ]
};

export function getLatestSortedTools(tools, count = 8) {
    return tools
        .filter((tool) => !!tool.Created)
        .sort((a, b) => new Date(b.Created) - new Date(a.Created))
        .slice(0, count)
        .sort((a, b) => a.Name.localeCompare(b.Name));
}
