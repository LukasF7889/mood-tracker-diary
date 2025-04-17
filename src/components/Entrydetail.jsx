import { useRef, useState, useEffect, useReducer } from "react";
import MoodSelector from "./MoodSelector";
// import useLocalStorage from "../hooks/useLocalStorage";
import Select from "react-select";
import { useEntry } from "../context/EntryContext";
import { useModal } from "../context/ModalContext";
import SaveButtons from "./SaveButtons";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const Entrydetail = () => {
  const { closeModal } = useModal();
  const { entry, dispatch, setLastEntry, entryMode } = useEntry();
  const [error, setError] = useState(null);
  //get acces to saveEntry function in useLocalStorage Hook
  const { saveEntry } = useLocalStorageContext();

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "transparent",
      border: state.isFocused ? "2px solid #60A5FA" : "1px solid #E5E7EB", // focus: blue-400, normal: gray-200
      boxShadow: "none",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.5rem", // rounded-lg
      fontSize: "1rem",
      cursor: "pointer",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#BFDBFE", // blue-200
      borderRadius: "0.25rem", // rounded
      padding: "0 0.25rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#1E3A8A", // blue-900
      fontWeight: "500",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#1E3A8A",
      ":hover": {
        backgroundColor: "#93C5FD", // blue-300
        color: "#1E40AF", // blue-800
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#FFFFFF",
      borderRadius: "0.5rem",
      marginTop: "0.5rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06)", // Tailwind shadow-md
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "#DBEAFE" // blue-100
        : state.isSelected
        ? "#BFDBFE" // blue-200
        : "#FFFFFF",
      color: "#1F2937", // gray-800
      padding: "0.5rem 1rem",
      cursor: "pointer",
    }),
  };

  const categories = [
    { value: "work", label: "Work" },
    { value: "social", label: "Social" },
    { value: "outdoor", label: "Outdoor" },
    { value: "sport", label: "Sport" },
    { value: "mental", label: "Mental Health" },
    { value: "selfcare", label: "Self Care" },
    { value: "creativity", label: "Creativity" },
    { value: "hobby", label: "Hobbies" },
  ];

  function selectValues(values) {
    dispatch({ type: "SET_CATEGORIES", payload: values });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //create new entry object to make sure to have the newest state afterwards
    let newEntry;
    if (entry.title != "" && entry.content != "") {
      if (entry.id === "" || entry.createdAt === "") {
        newEntry = {
          ...entry,
          createdAt: new Date().toISOString(),
          id: crypto.randomUUID(),
        };
      } else {
        newEntry = entry;
      }
      saveEntry(newEntry);
      closeModal();
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 200);
    } else {
      setError("Title & description can't be empty :(");
    }
  }

  // Making Textarea grow
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const moodRef = useRef(null);

  useEffect(() => {
    handleInput(titleRef);
    handleInput(contentRef);
  }, [entry.title, entry.content]);

  const handleInput = (ref) => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      setError(null);
    }
  };

  return (
    <>
      {/* ALERTBOX */}
      <div
        role="alert"
        className={`alert alert-error w-full ${error ? "block" : "hidden"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{error}</span>
      </div>
      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          rows={1}
          placeholder="Enter post title..."
          ref={titleRef}
          disabled={entryMode === "create" ? false : true}
          onInput={() => handleInput(titleRef)}
          value={entry.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          className="textarea textarea-ghost focus:outline-none p-0 min-h-0 resize-none w-full overflow-hidden text-3xl font-extrabold"
        />

        <div className={`  ${entry.title === "" ? "hidden" : "block"}`}>
          {/* Show select if create is on */}
          <Select
            isMulti={true}
            styles={customSelectStyles}
            className={entryMode === "create" ? "block" : "hidden"}
            options={categories}
            onChange={selectValues}
            value={entry.categories}
          />
        </div>

        <div
          className={`flex justify-between items-center ${
            entry.title === "" ? "hidden" : "block"
          }`}
          ref={moodRef}
        >
          <MoodSelector
            className="p-4"
            entry={entry}
            dispatch={dispatch}
            moodRef={moodRef}
          />
          {/* Display categories here only if in read mode */}
          <div className={entryMode === "read" ? "block" : "hidden"}>
            {Array.isArray(entry.categories) &&
              entry.categories.map((cat, index) => (
                <div
                  key={index}
                  className="inline-block bg-blue-200 text-blue-900 font-medium rounded px-2 py-1 mr-2 mb-2 text-sm"
                >
                  {cat.label}
                </div>
              ))}
          </div>
        </div>

        <textarea
          rows={1}
          ref={contentRef}
          onInput={() => handleInput(contentRef)}
          value={entry.content}
          disabled={entryMode === "create" ? false : true}
          onChange={(e) =>
            dispatch({ type: "SET_CONTENT", payload: e.target.value })
          }
          className={`textarea textarea-ghost text-lg min-h-0 p-0 focus:outline-none resize-none w-full overflow-hidden ${
            entry.title === "" ? "hidden" : "block"
          }`}
          placeholder="Now enter your text..."
        ></textarea>

        <SaveButtons />
      </form>
    </>
  );
};

export default Entrydetail;
