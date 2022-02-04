import moment from "moment";
import { v4 as uuid_v4 } from "uuid";

export const INITIAL_APPLICATIONS = [
  {
    id: uuid_v4(),
    type: "cmd",
    name: "שורת הפקודה",
    open: false,
    minimized: false,
    sizing: false,
  },
  {
    id: uuid_v4(),
    type: "text",
    instructions: true,
    name: "הוראות",
    open: false,
    minimized: false,
    sizing: false,
    text: "",
    saved: true,
    openSaveModal: false,
  },
  {
    id: uuid_v4(),
    type: "game",
    instructions: true,
    name: "כמה מהירים אתם 2",
    open: false,
    minimized: false,
    sizing: false,
    saved: true,
    openSaveModal: false,
  },
];

export const INITIAL_CMD = [
  {
    id: uuid_v4(),
    location: "\\Desktop",
    input: "",
  },
];

export const NEW_FOLDER = {
  name: "תיקייה חדשה",
  type: "folder",
  open: false,
  minimized: false,
  sizing: false,
  appsInFolder: [],
};

export const NEW_TEXTFILE = {
  name: "מסמך טקסט",
  type: "text",
  open: false,
  minimized: false,
  sizing: false,
  text: "",
  saved: true,
  openSaveModal: false,
};

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
  let hours = date.getHours();
  const dayName = days[date.getDay()];
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  let month = date.getMonth();
  const monthName = months[month];
  month += 1;
  month = month < 10 ? `0${month}` : month;

  const year = date.getFullYear();
  const day = date.toString().split(" ")[2];
  return { hours, minutes, month, monthName, year, day, dayName };
};
