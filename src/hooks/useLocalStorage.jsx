import { useState } from "react";
import { useEntry } from "../context/EntryContext";

const useLocalStorage = () => {
  const { lastEntry, setLastEntry } = useEntry();
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("entries");
    return storedData ? JSON.parse(storedData) : [];
  });

  const returnStorage = () => {
    const storedData = localStorage.getItem("entries");
    return storedData ? JSON.parse(storedData) : [];
  };

  const saveEntry = (entry) => {
    let newData;
    const storedData = JSON.parse(localStorage.getItem("entries")) || [];
    const existingItem = storedData.find(({ id }) => id === entry.id);
    console.log("Saving entry with ID:", entry.id);
    console.log(
      "Existing entries:",
      data.map((d) => d.id)
    );

    if (!existingItem) {
      newData = [...storedData, entry];
    } else {
      newData = storedData.map((e) => {
        if (e.id === entry.id) {
          return { ...entry };
        } else {
          return e;
        }
      });
    }

    localStorage.setItem("entries", JSON.stringify(newData));
    setData(newData);
    console.log(newData);
    // const date = new Date();
    // setLastEntry(date);
    // console.log(lastEntry);
  };

  const deleteEntry = (entry) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("entries")) || [];
      const newData = storedData.filter(
        (e) => String(e.id) !== String(entry.id)
      );
      localStorage.setItem("entries", JSON.stringify(newData));
      setData(newData);
      console.log(newData);
      // const date = new Date();
      // setLastEntry(date);
      // console.log(lastEntry);
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  return { data, saveEntry, returnStorage, deleteEntry };
};

export default useLocalStorage;
