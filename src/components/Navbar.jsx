import Searchbar from "./Searchbar";

const Navbar = ({ filter, setFilter }) => {
  return (
    <>
      <div className="sticky top-0 z-50 flex flex-cols px-8 py-2 bg-gray-900 justify-center gap-6 items-center">
        <p className="font-bold text-xl md:text-2xl flex-1 text-nowrap">
          Mood Diary!
        </p>

        <Searchbar filter={filter} setFilter={setFilter} />
      </div>
    </>
  );
};

export default Navbar;
