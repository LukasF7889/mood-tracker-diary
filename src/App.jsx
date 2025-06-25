import { useState } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Entrylist from "./components/Entrylist";
import { ToastContainer } from "react-toastify";
import ModalComponent from "./components/ModalComponent";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar filter={filter} setFilter={setFilter} />

      <main className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <Entrylist filter={filter} />
      </main>
      <footer>
        <p className="py-2 px-2">
          This is a student project by Lukas Fritsch, created as part of a
          coding bootcamp
        </p>
      </footer>

      <ModalComponent />
    </>
  );
}

export default App;
