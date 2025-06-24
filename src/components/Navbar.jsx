import { demoPosts } from "../utils/demoPosts";
// import useLocalStorage from "../hooks/useLocalStorage";
import { useLocalStorageContext } from "../context/LocalStorageContext";
import Searchbar from "./Searchbar";

const Navbar = ({ filter, setFilter }) => {
  const { data, saveEntry } = useLocalStorageContext();
  return (
    <>
      <div className="flex flex-cols justify-between px-2 py-1">
        <Searchbar filter={filter} setFilter={setFilter} />
        <p className="font-bold">Mood Diary!</p>
        {data.length < 20 ? (
          <button
            className="cursor-pointer btn btn-soft btn-secondary"
            onClick={() => demoPosts(20, saveEntry)}
          >
            Add demo posts
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};

export default Navbar;
