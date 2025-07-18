export const initialWizardState = {
  useCases: [],
  modalities: [],
  preferences: [],
  context: [],
};

export function wizardReducer(state, action) {
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
      return initialWizardState;
    default:
      return state;
  }
}
