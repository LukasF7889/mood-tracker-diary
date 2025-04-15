import { useContext, createContext, useReducer, useState } from "react";

const EntryContext = createContext();

export const initialState = {
  id: "",
  title: "",
  content: "",
  categories: [],
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
      return { ...state, id: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_CONTENT":
      return { ...state, content: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_MOOD":
      return { ...state, mood: action.payload };
    case "SET_DATE":
      return { ...state, createdAt: action.payload };
  }
}

export const EntryProvider = ({ children }) => {
  const [entry, dispatch] = useReducer(entryReducer, initialState);
  const [lastEntry, setLastEntry] = useState(initialState);
  const [entryMode, setEntryMode] = useState("create");

  return (
    <EntryContext.Provider
      value={{
        entry,
        dispatch,
        lastEntry,
        setLastEntry,
        entryMode,
        setEntryMode,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export const useEntry = () => useContext(EntryContext);
