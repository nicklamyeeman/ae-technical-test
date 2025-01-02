export const localeFormattedDate = () => {
  return new Date().toLocaleString("en-EN", { timeZone: "Indian/Reunion" });
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.toLocaleDateString("en-EN") === date2.toLocaleDateString("en-EN")
  );
};

export const formatTimeDiff = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return `${hours < 10 ? "0" + hours : hours}h ${
    minutes < 10 ? "0" + minutes : minutes
  }min`;
};
