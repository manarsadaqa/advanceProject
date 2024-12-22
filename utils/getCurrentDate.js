const getCurrentDate = () => {
  const currentDate = new Date();
  const [year, month, day] = currentDate.toISOString().slice(0, 10).split("-");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

module.exports = { getCurrentDate };
