import { useState } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Entrylist from "./components/Entrylist";
import Searchbar from "./components/Searchbar";
import useLocalStorage from "./hooks/useLocalStorage";
import Analysis from "./components/Analysis";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main className="bg-gradient-to-r from-violet-600 to-indigo-600">
        <header>
          <Header />
        </header>
        <div className="flex flex-cols justify-between p-0 px-20 items-end">
          <Searchbar filter={filter} setFilter={setFilter} />
          <Analysis />
        </div>

        <Entrylist filter={filter} />
      </main>
    </>
  );
}

export default App;
