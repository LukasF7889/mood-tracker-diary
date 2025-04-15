import LoadEntries from "./LoadEntries";
import add from "../assets/add.png";
import { useModal } from "../context/ModalContext";
import ModalComponent from "./ModalComponent";
import { useEntry } from "../context/EntryContext";

const Entrylist = () => {
  const { openModal } = useModal();
  const { setEntryMode, dispatch } = useEntry();

  const clickHandler = () => {
    setEntryMode("create");
    dispatch({ type: "RESET" });
    openModal();
  };

  return (
    <>
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600">
        {/* GRID WITH ENTRIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-20 gap-6">
          {/* <div 

          // className="card w-full h-full p-4 rounded-xl shadow-lg border cursor-pointer border-white/20 backdrop-blur-md bg-white/10 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out">
            Create new entry
          </div> */}
          <button
            className="card flex flex-col gap-5 justify-center w-full h-full p-4 rounded-xl shadow-lg border cursor-pointer border-white/10 backdrop-blur-md bg-white/1 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
            onClick={() => clickHandler()}
          >
            <img src={add} className="w-15 self-center" alt="Plus Icon" />
            Create new entry
          </button>
          <LoadEntries />
        </div>
      </div>
      <ModalComponent />
    </>
  );
};

export default Entrylist;
