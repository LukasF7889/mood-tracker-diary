import { useState } from "react";

const useLocalStorage = () => {
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
    const existingItem = data.find(({ id }) => id === entry.id);
    console.log("Saving entry with ID:", entry.id);
    console.log(
      "Existing entries:",
      data.map((d) => d.id)
    );

    if (!existingItem) {
      newData = [...data, entry];
    } else {
      newData = data.map((e) => {
        if (e.id === entry.id) {
          return { ...entry };
        } else {
          return e;
        }
      });
    }

    localStorage.setItem("entries", JSON.stringify(newData));
    setData(newData);
  };

  const deleteEntry = (entry) => {
    try {
      const storedData = JSON.parse(localStorage.getItem("entries")) || [];
      const newData = storedData.filter(
        (e) => String(e.id) !== String(entry.id)
      );
      localStorage.setItem("entries", JSON.stringify(newData));
      setData(newData);
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  return { data, saveEntry, returnStorage, deleteEntry };
};

export default useLocalStorage;
