import { demoPosts } from "../utils/demoPosts";
import { useLocalStorageContext } from "../context/LocalStorageContext";

import diarypng from "../assets/diary.png";
import add from "../assets/add.png";

const NoEntryMsg = ({ clickHandler, emptyList, isCurrentMonth }) => {
  const { data, saveEntry } = useLocalStorageContext();
  if (emptyList && !isCurrentMonth)
    return (
      <div className="flex flex-col w-full justify-center items-center gap-8">
        <img
          src={diarypng}
          className="h-auto w-[10vw] max-w-[500px]"
          alt="diary with an heart on it"
        />
        <h1 className="text-4xl font-extrabold">Diary empty</h1>
        <p className="w-[50%] text-center">There is no entry for this month</p>
      </div>
    );

  return (
    <div className="flex flex-col w-full justify-center items-center gap-8">
      <img
        src={diarypng}
        className="h-auto w-[10vw] max-w-[500px]"
        alt="diary with an heart on it"
      />
      <h1 className="text-4xl font-extrabold">Welcome to Little Mood Diary</h1>
      <p className="w-[50%] text-center">
        Create a little entry every day and track your mood. You can see a mood
        overview for each month.
      </p>
      <div className="flex gap-2 flex-wrap">
        <button
          className="btn btn-soft btn-primary py-2"
          onClick={() => clickHandler()}
        >
          <img src={add} className="h-full self-center" alt="Plus Icon" />
          Create first entry
        </button>
        <button
          className="cursor-pointer btn btn-soft btn-secondary"
          onClick={() => demoPosts(20, saveEntry)}
        >
          Add demo posts
        </button>
      </div>
    </div>
  );
};

export default NoEntryMsg;
