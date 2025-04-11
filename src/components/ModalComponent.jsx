import { useModal } from "../context/ModalContext";
import Entrydetail from "./Entrydetail";
import { entryReducer, initialState } from "../context/EntryContext";
import { useState } from "react";

const ModalComponent = () => {
  const { modalRef, closeModal } = useModal();

  return (
    <dialog id="entryDetailModal" className="modal" ref={modalRef}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <Entrydetail />
      </div>
    </dialog>
  );
};

export default ModalComponent;
