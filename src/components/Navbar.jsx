import { demoPosts } from "../utils/demoPosts";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const Navbar = () => {
  const { saveEntry } = useLocalStorageContext();
  return (
    <>
      <div className="flex flex-cols justify-between px-2 py-1">
        <p className="font-bold">Mood Diary!</p>
        <button
          className="cursor-pointer hover:underline"
          onClick={() => demoPosts(5, saveEntry)}
        >
          Add demo posts
        </button>
      </div>
    </>
  );
};

export default Navbar;
