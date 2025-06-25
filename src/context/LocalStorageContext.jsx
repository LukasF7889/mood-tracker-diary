import { useContext, createContext, useState, useReducer } from "react";
import { toast } from "react-toastify";

const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
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
    toast("Entry saved", { toastId: "success" });
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
      toast("Entry deleted");
    } catch (err) {
      console.error("Failed to delete entry", err);
    }
  };

  return (
    <LocalStorageContext.Provider
      value={{ data, setData, saveEntry, deleteEntry }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useLocalStorageContext = () => useContext(LocalStorageContext);
