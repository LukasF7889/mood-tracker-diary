import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEntry } from "../context/EntryContext";

const LoadEntries = () => {
  const { returnStorage } = useLocalStorage();
  const { lastEntry } = useEntry();
  const [data, setData] = useState(returnStorage());

  useEffect(() => {
    const updatedData = returnStorage();
    setData(updatedData);
  }, [lastEntry]);

  return (
    <>
      {data.map((e) => (
        <div
          key={e.id}
          className="card w-full h-full p-4 rounded-xl shadow-lg border cursor-pointer border-white/20 backdrop-blur-md bg-white/10 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
        >
          {/* <figure>s
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure> */}
          <div className="card-body">
            <h2 className="card-title text-2xl">{e.title}</h2>
            <p>
              {e.content.slice(0, 100)}
              {e.content.length > 100 ? "..." : null}
            </p>
            <div className="card-actions justify-end">
              {console.log(e.categories)}
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
    </>
  );
};

export default LoadEntries;
