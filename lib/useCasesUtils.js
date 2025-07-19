export const initialUseCasesState = {
  useCases: [],
  modalities: [],
  preferences: [],
  contexts: [],
};

export function useCasesReducer(state, action) {
  switch (action.type) {
    case "SET_USE_CASES":
      return { ...state, useCases: action.payload };
    case "SET_MODALITIES":
      return { ...state, modalities: action.payload };
    case "SET_PREFERENCES":
      return { ...state, preferences: action.payload };
    case "SET_CONTEXT":
      return { ...state, contexts: action.payload };
    case "RESET":
      return initialUseCasesState;
    default:
      return state;
  }
}

    
