import LoadEntries from "./LoadEntries";
import add from "../assets/add.png";
import { useModal } from "../context/ModalContext";
import ModalComponent from "./ModalComponent";
import { useEntry } from "../context/EntryContext";
import { useState } from "react";
import diarypng from "../assets/diary.png";
import MonthSwitcher from "./MonthSwitcher";
import Analysis from "./Analysis";

const Entrylist = ({ filter }) => {
  const { openModal } = useModal();
  const { setEntryMode, dispatch } = useEntry();
  const [emptyList, setEmptyList] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const clickHandler = () => {
    setEntryMode("create");
    dispatch({ type: "RESET" });
    openModal();
  };

  return (
    <>
      <div className="">
        <MonthSwitcher
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <div className="flex flex-cols justify-between flex-wrap gap-4 p-0 px-20 items-end">
          <Analysis currentMonth={currentMonth} />
        </div>
        {/* GRID WITH ENTRIES */}
        <div
          className={`grid grid-cols-1 ${
            emptyList
              ? ""
              : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          }  p-10 px-20 min-h-[75vh] gap-6`}
        >
          {emptyList ? (
            <div className="flex flex-col w-full justify-center items-center gap-8">
              <img
                src={diarypng}
                className="h-auto w-[25%]"
                alt="diary with an heart on it"
              />
              <h1 className="text-4xl font-extrabold">
                Welcome to Little Mood Diary
              </h1>
              <p className="w-[50%] text-center">
                Create a little entry every day and track your mood. You can see
                a mood overview for each month.
              </p>
              <button
                className="btn btn-soft btn-primary py-2"
                onClick={() => clickHandler()}
              >
                <img src={add} className="h-full self-center" alt="Plus Icon" />
                Create first entry
              </button>
            </div>
          ) : (
            <button
              className="card flex flex-col gap-5 justify-center h-75 p-4 rounded-xl shadow-lg border cursor-pointer border-white/10 backdrop-blur-md bg-white/1 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
              onClick={() => clickHandler()}
            >
              <img src={add} className="w-15 self-center" alt="Plus Icon" />
              Create new entry
            </button>
          )}

          <LoadEntries
            filter={filter}
            setEmptyList={setEmptyList}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
      </div>
      <ModalComponent />
    </>
  );
};

export default Entrylist;
