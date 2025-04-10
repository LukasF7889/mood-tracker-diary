import Entrydetail from "./Entrydetail";
import { useRef } from "react";

const Entrylist = ({ entry, dispatch }) => {
  const modal = useRef();

  return (
    <>
      <div className="bg-blue-400">
        <p>LIST</p>
        <button
          className="btn"
          onClick={() =>
            document.getElementById("entryDetailModal").showModal()
          }
        >
          open modal
        </button>
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
