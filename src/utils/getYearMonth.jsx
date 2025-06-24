// Helper function turns date string into year-month
const getYearMonth = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}`;
};
export default getYearMonth;
