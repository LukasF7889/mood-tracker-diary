import { useEffect, useState } from "react";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useEntry } from "../context/EntryContext";
import imgMood1 from "../assets/angry.png";
import imgMood2 from "../assets/sarcastic.png";
import imgMood3 from "../assets/neutral.png";
import imgMood4 from "../assets/smile.png";
import imgMood5 from "../assets/lol.png";
import { useModal } from "../context/ModalContext";
import ModalComponent from "./ModalComponent";
import { useLocalStorageContext } from "../context/LocalStorageContext";
import getYearMonth from "../utils/getYearMonth";

const LoadEntries = ({
  filter,
  setEmptyList,
  currentMonth,
  setCurrentMonth,
}) => {
  const { openModal } = useModal();
  // const { data } = useLocalStorage();
  const { dispatch, setEntryMode } = useEntry();
  // const [data, setData] = useState(returnStorage());
  const { data, setData } = useLocalStorageContext();
  const [currData, setCurrData] = useState(data);

  // function to switch month pagination
  const changeMonth = (direction) => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month - 1 + direction);
    const newYearMonth = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setCurrentMonth(newYearMonth);
  };

  // Show correct mood
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

  // format date for entries
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-EN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
    setCurrData(data);
    if (data.length < 1) {
      setEmptyList(true);
    } else {
      setEmptyList(false);
    }
  }, [data]);

  return (
    <>
      {currData
        .filter((e) => {
          if (filter.trim() === "") {
            //if there is no filtertext, show entries from current month
            return getYearMonth(e.createdAt) === currentMonth;
          } else {
            return (
              e.title.toLowerCase().includes(filter.toLowerCase()) ||
              e.content.toLowerCase().includes(filter.toLowerCase())
            );
          }
        })
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
