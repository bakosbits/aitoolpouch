export const USE_CASES = [
    "Analyze customer behavior", "Automate outreach", 
    "Build presentations", "Create visual content", "Design user interfaces",  
    "Edit video", "Enrich data", "Generate written content", "Secure systems", 
    "Summarize meetings", "Transcribe audio"
];

export const MODALITIES = [
    "Audio", "Code", "Data", "Image", "Text", "Video"
];

export const PREFERENCES = [
    "API access", "Collaboration", "Customization", 
    "Free tier pricing", "No-code", "Open source", "Privacy-first"
];

export const CONTEXTS = [ 
    "Customer care", "Cybersecurity", "Design", "Development", 
    "Education", "Finance", "Healthcare", "Legal", "Marketing", "Public engagement", "Sales", "Science"
];

export const initialQuestionnaireState = {
  useCases: [],
  modalities: [],
  preferences: [],
  context: [],
};

export function questionnaireReducer(state, action) {
  switch (action.type) {
    case "SET_USE_CASES":
      return { ...state, useCases: action.payload };
    case "SET_MODALITIES":
      return { ...state, modalities: action.payload };
    case "SET_PREFERENCES":
      return { ...state, preferences: action.payload };
    case "SET_CONTEXT":
      return { ...state, context: action.payload };
    case "RESET":
      return initialQuestionnaireState;
    default:
      return state;
  }
}

    
