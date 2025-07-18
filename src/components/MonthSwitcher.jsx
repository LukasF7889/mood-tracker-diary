const MonthSwitcher = ({ currentMonth, setCurrentMonth, filter }) => {
  // function to switch month pagination
  const changeMonth = (direction) => {
    const [year, month] = currentMonth.split("-").map(Number);
    const newDate = new Date(year, month - 1 + direction);
    const newYearMonth = `${newDate.getFullYear()}-${String(
      newDate.getMonth() + 1
    ).padStart(2, "0")}`;
    setCurrentMonth(newYearMonth);
  };

  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  if (filter || filter.length) return;

  return (
    <div className="flex justify-between items-center  gap-4 mb-4 text-white">
      <button
        onClick={() => changeMonth(-1)}
        className="text-xl cursor-pointer hover:-translate-y-0.5"
      >
        ←
      </button>
      <span className="text-lg text-center font-bold min-w-[140px]">
        {new Date(currentMonth + "-01").toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </span>
      {currentMonth === currentYearMonth ? (
        <p></p>
      ) : (
        <button
          onClick={() => changeMonth(1)}
          className="text-xl cursor-pointer hover:-translate-y-0.5"
        >
          →
        </button>
      )}
    </div>
  );
};
export default MonthSwitcher;
