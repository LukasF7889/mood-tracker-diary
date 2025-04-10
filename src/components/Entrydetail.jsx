import { useRef, useState, useEffect, useReducer } from "react";
import MoodSelector from "./MoodSelector";
import useLocalStorage from "../hooks/useLocalStorage";

const Entrydetail = ({ entry, dispatch, modal }) => {
  const { saveEntry } = useLocalStorage();

  function handleSubmit(e) {
    e.preventDefault();
    //create new entry object to make sure to have the newest state afterwards
    const newEntry = {
      ...entry,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    };
    saveEntry(newEntry);
    dispatch({ type: "RESET" });
    modal.current.close();
  }

  // Making Textarea grow
  const textareaRef = useRef(null);
  const moodRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title..."
          value={entry.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          className="input input-ghost text-2xl font-extrabold"
        />
        <div
          className={`flex gap-4 ${
            entry.title === "" ? "invisible" : "visible"
          }`}
          ref={moodRef}
        >
          <MoodSelector entry={entry} dispatch={dispatch} moodRef={moodRef} />
        </div>
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          value={entry.content}
          onChange={(e) =>
            dispatch({ type: "SET_CONTENT", payload: e.target.value })
          }
          className={`textarea textarea-ghost resize-none w-full overflow-hidden ${
            entry.title === "" ? "invisible" : "visible"
          }`}
          placeholder="Now enter your text..."
        ></textarea>
        <button
          type="submit"
          className={`btn btn-soft btn-primary ${
            entry.title === "" ? "invisible" : "visible"
          }`}
        >
          Save!
        </button>
      </form>
    </>
  );
};

export default Entrydetail;
