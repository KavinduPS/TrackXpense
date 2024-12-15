export const dateToMMMDD = (date: Date): string => {
  const newDate = new Date(date).toDateString().slice(4, 10);
  return newDate;
};

export default dateToMMMDD;
