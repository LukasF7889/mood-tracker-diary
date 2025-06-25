// import useLocalStorage from "../hooks/useLocalStorage";
import imgMood1 from "../assets/angry.png";
import imgMood5 from "../assets/lol.png";
import { useEffect, useState } from "react";
import { useEntry } from "../context/EntryContext";
import { useLocalStorageContext } from "../context/LocalStorageContext";
import getYearMonth from "../utils/getYearMonth";

const Analysis = ({ currentMonth, emptyList }) => {
  // const { returnStorage, data } = useLocalStorage();
  const { data } = useLocalStorageContext();
  const [perc, setPerc] = useState(0);
  // const { lastEntry } = useEntry();
  console.log(data);

  const [color, setColor] = useState("bg-amber-300");

  const moodChart = {
    mood1: 1,
    mood2: 2,
    mood3: 3,
    mood4: 4,
    mood5: 5,
  };

  useEffect(() => {
    let sum = 0;
    const filteredData = data.filter(
      (e) => getYearMonth(e.createdAt) === currentMonth
    );
    for (let i = 0; i < filteredData?.length; i++) {
      sum += moodChart[filteredData[i].mood];
    }
    const avg = sum / filteredData.length || 0;
    const percentage = (100 / 5) * avg;
    setPerc(percentage);
    console.log(perc);

    if (percentage < 35) {
      setColor("bg-red-500");
    } else if (percentage < 65) {
      setColor("bg-amber-300");
    } else if (percentage >= 65) {
      setColor("bg-green-300");
    }
  }, [data, currentMonth]);

  if (emptyList) return;

  return (
    <div className="flex flex-col w-[25vw] min-w-[200px] max-w-[400px] h-[2.4rem] text-center">
      <div className="bg-gray-800 rounded-sm h-full flex flex-cols justify-between items-center">
        <div className="flex flex-col w-full px-2 py-2 ">
          {/* <h2>Mood overview</h2> */}
          <div className="flex w-full items-center gap-2">
            <img className="size-[1rem]" src={imgMood1} />
            <div className="rounded-full w-full h-4 bg-gray-400">
              <div
                style={{ width: `${perc}%` }}
                className={`rounded-full h-4 ${color}`}
              ></div>
            </div>
            <img className="size-[1rem]" src={imgMood5} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
