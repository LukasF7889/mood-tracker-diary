import { demoPosts } from "../utils/demoPosts";
import useLocalStorage from "../hooks/useLocalStorage";

const Navbar = () => {
  const { saveEntry } = useLocalStorage();
  return (
    <>
      <div className="flex flex-cols justify-between px-2 py-1">
        <p className="font-bold">Mood Diary!</p>
        <button onClick={() => demoPosts(5, saveEntry)}>Add demo posts</button>
      </div>
    </>
  );
};

export default Navbar;
