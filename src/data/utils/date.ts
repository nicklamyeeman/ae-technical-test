export const localeFormattedDate = () => {
  return new Date().toLocaleString("en-EN", { timeZone: "Indian/Reunion" });
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.toLocaleDateString("en-EN") === date2.toLocaleDateString("en-EN")
  );
};
