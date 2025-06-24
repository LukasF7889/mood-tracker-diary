import { useEntry } from "../context/EntryContext";
import { useModal } from "../context/ModalContext";
import { useLocalStorageContext } from "../context/LocalStorageContext";

const SaveButtons = () => {
  const { entry, entryMode, setEntryMode } = useEntry();
  const { deleteEntry } = useLocalStorageContext();
  const { closeModal } = useModal();

  const handleDelete = (post) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntry(post);
    }

    // setLastEntry();
    closeModal();
  };

  const handleEdit = (post) => {
    setEntryMode("create");
  };

  if (entryMode === "create") {
    return (
      <button
        type="submit"
        className={`btn btn-soft btn-primary ${
          entry.title === "" ? "hidden" : "block"
        }`}
      >
        Save!
      </button>
    );
  }

  if (entryMode === "edit") {
    <button
      type="submit"
      className={`btn btn-soft btn-primary ${
        entry.title === "" ? "hidden" : "block"
      }`}
    >
      Apply changes!
    </button>;
  }

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => handleEdit(entry)}
        className={`btn btn-soft btn-primary`}
      >
        Edit entry
      </button>
      <button
        type="button"
        onClick={() => {
          handleDelete(entry);
        }}
        className={`btn btn-dash btn-error`}
      >
        Delete Entry
      </button>
    </div>
  );
};

export default SaveButtons;
