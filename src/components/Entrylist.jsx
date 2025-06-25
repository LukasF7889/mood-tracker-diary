import LoadEntries from "./LoadEntries";
import { useModal } from "../context/ModalContext";
import ModalComponent from "./ModalComponent";
import { useEntry } from "../context/EntryContext";
import { useState, useEffect } from "react";
import MonthSwitcher from "./MonthSwitcher";
import Analysis from "./Analysis";
import NoEntryMsg from "./NoEntryMsg";
import getYearMonth from "../utils/getYearMonth";

import add from "../assets/add.png";

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
  const [isCurrentMonth, setIsCurrentMonth] = useState(true);

  const clickHandler = () => {
    setEntryMode("create");
    dispatch({ type: "RESET" });
    openModal();
  };

  useEffect(() => {
    const now = new Date();
    const currentYearMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    const isCurrent = currentYearMonth === currentMonth;
    setIsCurrentMonth(isCurrent);
  }, [currentMonth]);

  return (
    <>
      <div className="">
        <div className="flex flex-col justify-center items-center pt-8">
          <MonthSwitcher
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
          <Analysis currentMonth={currentMonth} emptyList={emptyList} />
        </div>
        {/* GRID WITH ENTRIES */}
        <div
          className={`grid grid-cols-1 ${
            emptyList
              ? ""
              : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
          }  p-10 px-5 md:px-20 min-h-[75vh] gap-6`}
        >
          {emptyList ? (
            <NoEntryMsg
              clickHandler={clickHandler}
              emptyList={emptyList}
              isCurrentMonth={isCurrentMonth}
            />
          ) : (
            isCurrentMonth && (
              <button
                className="card flex flex-col gap-5 justify-center h-75 p-4 rounded-xl shadow-lg border cursor-pointer border-white/10 backdrop-blur-md bg-white/1 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
                onClick={() => clickHandler()}
              >
                <img src={add} className="w-15 self-center" alt="Plus Icon" />
                Create new entry
              </button>
            )
          )}

          <LoadEntries
            filter={filter}
            setEmptyList={setEmptyList}
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        </div>
      </div>
    </>
  );
};

export default Entrylist;
