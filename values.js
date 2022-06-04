const monthNames = [
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

const day = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const hours = ["00", "01", "02", "03", "04", "05"];

mongo_string =
  "mongodb+srv://database:database@cluster0.94uc3lz.mongodb.net/?retryWrites=true&w=majority";

module.exports = { monthNames, day, hours, mongo_string };
