import { useState } from "react";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Entrylist from "./components/Entrylist";
import Entrydetail from "./components/Entrydetail";
import Searchbar from "./components/Searchbar";

function App() {
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
        <Entrylist />
      </main>
    </>
  );
}

export default App;
