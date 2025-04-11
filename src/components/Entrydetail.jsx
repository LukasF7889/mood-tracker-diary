import { useRef, useState, useEffect, useReducer } from "react";
import MoodSelector from "./MoodSelector";
import useLocalStorage from "../hooks/useLocalStorage";
import Select from "react-select";

const Entrydetail = ({ entry, dispatch, modal }) => {
  const [error, setError] = useState(null);

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

  //get acces to saveEntry function in useLocalStorage Hook
  const { saveEntry } = useLocalStorage();

  function selectValues(values) {
    dispatch({ type: "SET_CATEGORIES", payload: values });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //create new entry object to make sure to have the newest state afterwards

    if (entry.title != "" && entry.content != "") {
      const newEntry = {
        ...entry,
        createdAt: new Date().toISOString(),
        id: crypto.randomUUID(),
      };
      saveEntry(newEntry);
      modal.current.close();
      setTimeout(() => {
        dispatch({ type: "RESET" });
      }, 1000);
    } else {
      setError("Title & description can't be empty :(");
    }
  }

  // Making Textarea grow
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const moodRef = useRef(null);

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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          rows={1}
          placeholder="Enter post title..."
          ref={titleRef}
          onInput={() => handleInput(titleRef)}
          value={entry.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          className="textarea textarea-ghost focus:outline-none p-0 min-h-0 resize-none w-full overflow-hidden text-3xl font-extrabold"
        />
        <div className={`  ${entry.title === "" ? "hidden" : "block"}`}>
          <Select isMulti={true} options={categories} onChange={selectValues} />
        </div>
        <div
          className={`flex gap-4 ${entry.title === "" ? "hidden" : "block"}`}
          ref={moodRef}
        >
          <MoodSelector
            className="p-4"
            entry={entry}
            dispatch={dispatch}
            moodRef={moodRef}
          />
        </div>
        <textarea
          rows={1}
          ref={contentRef}
          onInput={() => handleInput(contentRef)}
          value={entry.content}
          onChange={(e) =>
            dispatch({ type: "SET_CONTENT", payload: e.target.value })
          }
          className={`textarea textarea-ghost text-lg min-h-0 p-0 focus:outline-none resize-none w-full overflow-hidden ${
            entry.title === "" ? "hidden" : "block"
          }`}
          placeholder="Now enter your text..."
        ></textarea>
        <button
          type="submit"
          className={`btn btn-soft btn-primary ${
            entry.title === "" ? "hidden" : "block"
          }`}
        >
          Save!
        </button>
      </form>
    </>
  );
};

export default Entrydetail;
