import moment from "moment";
const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];
const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

export const getCurrentTime = () => {
  const date = new Date(moment().format());
  // console.log(date);
  const hours = date.getHours();
  const dayName = days[date.getDay()];
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const month = date.getMonth();
  const monthName = months[month];
  const year = date.getFullYear();
  const day = date.toString().split(" ")[2];
  return { hours, minutes, month, monthName, year, day, dayName };
};
