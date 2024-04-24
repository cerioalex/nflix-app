export const formatDate = (dateString) => {
  // Create a new Date object from the provided dateString
  const date = new Date(dateString);

  // Array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month, day, and year from the Date object
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
