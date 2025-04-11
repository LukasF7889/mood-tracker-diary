import Entrydetail from "./Entrydetail";
import LoadEntries from "./LoadEntries";
import { useRef } from "react";
import add from "../assets/add.png";

const Entrylist = ({ entry, dispatch }) => {
  const modal = useRef();

  return (
    <>
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <p>LIST</p>
        {/* GRID WITH ENTRIES */}
        <div className="grid grid-cols-4 p-20 gap-4">
          {/* <div 

          // className="card w-full h-full p-4 rounded-xl shadow-lg border cursor-pointer border-white/20 backdrop-blur-md bg-white/10 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out">
            Create new entry
          </div> */}
          <button
            className="card flex flex-col gap-5 justify-center w-full h-full p-4 rounded-xl shadow-lg border cursor-pointer border-white/10 backdrop-blur-md bg-white/1 text-white hover:bg-white/20 hover:-translate-1 transition duration-500 ease-in-out"
            onClick={() =>
              document.getElementById("entryDetailModal").showModal()
            }
          >
            <img src={add} className="w-15 self-center" alt="Plus Icon" />
            Create new entry
          </button>
          <LoadEntries />
        </div>

        {/* MODAL CONTENT */}
        <dialog id="entryDetailModal" className="modal" ref={modal}>
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <Entrydetail entry={entry} dispatch={dispatch} modal={modal} />
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Entrylist;
