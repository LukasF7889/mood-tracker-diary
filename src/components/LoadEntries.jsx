import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEntry } from "../context/EntryContext";
import imgMood1 from "../assets/angry.png";
import imgMood2 from "../assets/sarcastic.png";
import imgMood3 from "../assets/neutral.png";
import imgMood4 from "../assets/smile.png";
import imgMood5 from "../assets/lol.png";
import { useModal } from "../context/ModalContext";
import ModalComponent from "./ModalComponent";

const LoadEntries = ({ filter }) => {
  const { openModal } = useModal();
  const { returnStorage } = useLocalStorage();
  const { lastEntry, dispatch, entryMode, setEntryMode } = useEntry();
  const [data, setData] = useState(returnStorage());

  const showMood = (mood) => {
    switch (mood) {
      case "mood1":
        return imgMood1;
      case "mood2":
        return imgMood2;
      case "mood3":
        return imgMood3;
      case "mood4":
        return imgMood4;
      case "mood5":
        return imgMood5;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-EN", {
      // weekday: "long", // Wochentag (z.B. Montag)
      year: "numeric", // Jahr (z.B. 2025)
      month: "long", // Monat (z.B. Januar)
      day: "numeric", // Tag (z.B. 11)
      hour: "2-digit", // Stunde (z.B. 14)
      minute: "2-digit", // Minute (z.B. 30)
      // second: "2-digit", // Sekunde (z.B. 45)
    });
  };

  const showEntry = (entry) => {
    setEntryMode("read");
    dispatch({ type: "SET_TITLE", payload: entry.title });
    dispatch({ type: "SET_MOOD", payload: entry.mood });
    dispatch({ type: "SET_CONTENT", payload: entry.content });
    dispatch({ type: "SET_CATEGORIES", payload: entry.categories });
    dispatch({ type: "SET_ID", payload: entry.id });
    dispatch({ type: "SET_DATE", payload: entry.createdAt });
    openModal();
  };

  useEffect(() => {
    const updatedData = returnStorage();
    setData(updatedData);
  }, [lastEntry]);

  return (
    <>
      {data
        .filter((e) => e.title.includes(filter))
        .sort((first, second) => {
          return new Date(second.createdAt) - new Date(first.createdAt);
        })
        .map((e) => (
          <div
            key={e.id}
            className="card overflow-hidden w-full h-75 p-4 rounded-xl shadow-lg border cursor-pointer border-white/20 backdrop-blur-md bg-white/10 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
            onClick={() => showEntry(e)}
          >
            <img
              src={showMood(e.mood)}
              className="absolute w-10 -mt-2 -mr-2 self-end"
            />
            <div className="card-body">
              <small>{formatDate(e.createdAt)}</small>
              <h2 className="card-title text-2xl wrap-anywhere">
                {e.title.replace(/(\r\n|\n|\r)/gm, "").slice(0, 45)}
                {e.title.length > 45 ? "..." : null}
              </h2>
              <p className="wrap-anywhere">
                {e.content.replace(/(\r\n|\n|\r)/gm, "").slice(0, 100)}
                {e.content.length > 100 ? "..." : null}
              </p>
              <div className="card-actions justify-start ">
                {Array.isArray(e.categories) &&
                  e.categories.map((cat, index) => (
                    <div key={index} className="badge badge-outline">
                      {cat.label}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      <ModalComponent />
    </>
  );
};

export default LoadEntries;
