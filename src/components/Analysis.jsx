import useLocalStorage from "../hooks/useLocalStorage";
import imgMood1 from "../assets/angry.png";
import imgMood5 from "../assets/lol.png";
import { useEffect, useState } from "react";
import { useEntry } from "../context/EntryContext";

const Analysis = () => {
  const { returnStorage } = useLocalStorage();
  const [perc, setPerc] = useState(0);
  const { lastEntry } = useEntry();

  const moodChart = {
    mood1: 1,
    mood2: 2,
    mood3: 3,
    mood4: 4,
    mood5: 5,
  };

  useEffect(() => {
    const data = returnStorage();
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += moodChart[data[i].mood];
    }
    const avg = sum / data.length || 0;
    const percentage = (100 / 5) * avg;
    setPerc(percentage);
    console.log(perc);
  }, [lastEntry]);

  return (
    <>
      <div className="flex flex-col w-[25vw] text-center">
        <h2>Mood overview</h2>
        <div className="bg-white rounded-full flex flex-cols justify-between items-center">
          <img className="size-[3rem]" src={imgMood1} />
          <div className="rounded-full w-full h-4 bg-gray-400">
            <div
              style={{ width: `${perc}%` }}
              className={`rounded-full h-4 bg-amber-300`}
            ></div>
          </div>
          <img className="size-[3rem]" src={imgMood5} />
        </div>
      </div>
    </>
  );
};

export default Analysis;
