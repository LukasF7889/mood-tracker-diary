export const initialState = {
  id: "",
  title: "",
  content: "",
  categories: "",
  mood: "mood3", // Default mood set to mood3
  createdAt: "",
};

export function entryReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...initialState,
      };
    case "SET_ID":
      return {
        ...state,
        id:
          Date.now().toString(36) +
          Math.floor(
            Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
          ).toString(36),
      };
    case "SET_TITLE":
      return { ...state, title: action.payload.trim() };
    case "SET_CONTENT":
      return { ...state, content: action.payload.trim() };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_MOOD":
      return { ...state, mood: action.payload };
    case "SET_DATE":
      return { ...state, createdAt: new Date().toISOString() };
  }
}
