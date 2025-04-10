import { useState, useEffect } from "react";

const useLocalStorage = (entry) => {
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("entries");
    return storedData ? JSON.parse(storedData) : [];
  });

  const saveEntry = (entry) => {
    const newData = [...data, entry];
    localStorage.setItem("entries", JSON.stringify(newData));
    setData(newData);
  };

  return { data, saveEntry };
};

export default useLocalStorage;
