import { useState, useEffect, useReducer } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Entrylist from "./components/Entrylist";
import Entrydetail from "./components/Entrydetail";
import Searchbar from "./components/Searchbar";
import useLocalStorage from "./hooks/useLocalStorage";
import { entryReducer, initialState } from "./utils/entryReducer";

function App() {
  const [data, setData] = useState(useLocalStorage());
  const [entry, dispatch] = useReducer(entryReducer, initialState);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <header>
        <Header />
      </header>
      <main>
        <Searchbar />
        <Entrylist entry={entry} dispatch={dispatch} />
      </main>
    </>
  );
}

export default App;
