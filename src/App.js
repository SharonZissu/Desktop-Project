import React, { useState } from "react";
import { v4 as uuid_v4 } from "uuid";

//components
import TaskBar from "./components/TaskBar";
import Applications from "./components/Applications";
import CMD from "./components/CMD";
import OptionsBar from "./components/OptionsBar";

//styles
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import backgroundImg from "./images/background.jpg";

function App() {
  const [taskBarArr, setTaskBarArr] = useState([]);
  const [applicationsArr, setApplicationArr] = useState([
    { id: uuid_v4(), type: "cmd", name: "שורת הפקודה", open: false },
  ]);
  const [cmdArr, setCmdArr] = useState([
    {
      id: uuid_v4(),
      location: "\\Desktop",
      input: "",
    },
  ]);
  const [cmdSavedCommands, setCmdSavedCommands] = useState({
    commands: [],
    count: 0,
  });
  const [pageX, setPageX] = useState(null);
  const [pageY, setPageY] = useState(null);

  const openApplication = (type) => {
    if (type === "cmd") openCMD();
  };

  const findCmdObj = () => {
    const copyApplicationArr = [...applicationsArr];
    return [
      copyApplicationArr,
      copyApplicationArr.find((app) => app.type === "cmd"),
    ];
  };

  const openCMD = () => {
    const [copyApplicationArr, cmdObj] = findCmdObj();
    cmdObj.open = true;
    setApplicationArr(copyApplicationArr);
  };

  const closeCMD = () => {
    const [copyApplicationArr, cmdObj] = findCmdObj();
    cmdObj.open = false;
    setApplicationArr(copyApplicationArr);
    const filteredTaskArr = taskBarArr.filter((task) => task.type !== "cmd");
    setTaskBarArr(filteredTaskArr);
  };

  const minimizeCMD = () => {
    const [copyApplicationArr, cmdObj] = findCmdObj();
    cmdObj.open = false;
    setApplicationArr(copyApplicationArr);
    const checkIfAlreadyOpen = taskBarArr.find((task) => task.type === "cmd");
    if (!checkIfAlreadyOpen)
      setTaskBarArr([...taskBarArr, { type: "cmd", name: "cmd" }]);
  };

  const openOptionsBar = (e) => {
    if (e.target instanceof HTMLDivElement) {
      console.log(e);
      if (e.screenY > 550) {
        setPageX(e.pageX - 30);
        setPageY(e.pageY - 240);
      } else {
        setPageX(e.pageX - 30);
        setPageY(e.pageY - 40);
      }
    } else {
      closeOptionBar();
    }
  };

  const closeOptionBar = () => {
    setPageX(null);
    setPageY(null);
  };

  const checkIfCMDClicked = () => {
    const cmdObj = applicationsArr.find((app) => app.type === "cmd");
    return cmdObj.open;
  };

  const createFolder = (name) => {
    let newName;
    if (typeof name === "object") newName = "תיקייה חדשה";
    else newName = name;
    const applicationObj = {
      id: uuid_v4(),
      name: newName,
      type: "folder",
    };
    setApplicationArr((prevState) => [...prevState, applicationObj]);
  };

  const createTextFile = (name) => {
    let newName;
    if (typeof name === "object") newName = "מסמך טקסט";
    else newName = name;
    const applicationObj = {
      id: uuid_v4(),
      name: newName,
      type: "text",
    };
    setApplicationArr((prevState) => [...prevState, applicationObj]);
  };

  const changeApplicationName = (id, newAppName) => {
    const copyApplicationArr = [...applicationsArr];
    const findApp = copyApplicationArr.find((app) => app.id === id);
    findApp.name = newAppName;
    setApplicationArr(copyApplicationArr);
  };

  const setCountMinus1 = () => {
    console.log(cmdSavedCommands);
    setCmdSavedCommands({
      ...cmdSavedCommands,
      count: cmdSavedCommands.count - 1,
    });
  };

  const setCountPlus1 = () => {
    setCmdSavedCommands({
      ...cmdSavedCommands,
      count: cmdSavedCommands.count + 1,
    });
  };

  const sendCommand = (command) => {
    let copyCommands = [...cmdSavedCommands.commands];

    copyCommands.push(command);
    const setCommands = new Set(copyCommands);
    const newCommands = [...setCommands];
    const count = newCommands.length;
    setCmdSavedCommands({
      commands: newCommands,
      count,
    });
    let location = "\\Desktop";
    const copyCmdArr = [...cmdArr];
    if (command.startsWith("mkdir ")) {
      const arr = command.split(" ");
      arr.shift();
      arr.forEach((name) => {
        createFolder(name);
      });
    } else if (command.startsWith("cd ")) {
      const arr = command.split(" ");
      arr.shift();
      if (arr.length > 1) {
        console.log("RETURNNNNN");
        return;
      }
      if (arr[0] === "..") {
        copyCmdArr[copyCmdArr.length - 1].input = command;

        const prevLocation = copyCmdArr[copyCmdArr.length - 1].location;
        if (prevLocation === "\\Desktop") {
          copyCmdArr.push({
            id: uuid_v4(),
            location: prevLocation,
            input: "",
          });
        } else {
          let arr = prevLocation.split("\\");
          arr.pop();
          const location = arr.join("\\");
          copyCmdArr.push({
            id: uuid_v4(),
            location,
            input: "",
          });
        }

        setCmdArr(copyCmdArr);
        return;
      }
      const copyApplicationArr = [...applicationsArr];

      const checkIfFolderExists = copyApplicationArr.find(
        (app) => app.type === "folder" && app.name === arr[0]
      );
      if (checkIfFolderExists) {
        location = `${location}\\${arr[0]}`;
      } else {
        copyCmdArr[copyCmdArr.length - 1].input = command;

        copyCmdArr.push({
          id: uuid_v4(),
          error: "The system cannot find the path specified.",
        });
        copyCmdArr.push({
          id: uuid_v4(),
          location: cmdArr[cmdArr.length - 1].location,
          input: "",
        });
        console.log(copyCmdArr);
        setCmdArr(copyCmdArr);
        return;
      }
    } else if (command.trim() === "cls") {
      setCmdArr([
        {
          id: uuid_v4(),
          location: "\\Desktop",
          input: "",
        },
      ]);
      return;
    } else if (command.trim().startsWith("echo.>")) {
      let arr = command.trim().split(">");
      arr.shift();
      arr = arr.join(" ");
      arr = arr.trim().split(" ");
      // console.log(typeof command);
      // console.log(command.trim());
      console.log(arr);
      if (arr.join("") === "") {
        console.log("YESSSSSSSSSSSSS");
        copyCmdArr[copyCmdArr.length - 1].input = command;
        copyCmdArr.push({
          id: uuid_v4(),
          error: "The syntax of the command is incorrect.",
        });
        copyCmdArr.push({
          id: uuid_v4(),
          location: cmdArr[cmdArr.length - 1].location,
          input: "",
        });
        setCmdArr(copyCmdArr);
        return;
      } else {
        arr.forEach((name) => createTextFile(name));
      }
    } else {
      copyCmdArr[copyCmdArr.length - 1].input = command;
      copyCmdArr.push({
        id: uuid_v4(),
        error: `'${
          command.split(" ")[0]
        }' is not recognized as an internal or external command,\n\operable program or batch file.`,
      });
      copyCmdArr.push({
        id: uuid_v4(),
        location: cmdArr[cmdArr.length - 1].location,
        input: "",
      });
      console.log(copyCmdArr);
      setCmdArr(copyCmdArr);
      return;
    }

    copyCmdArr[copyCmdArr.length - 1].input = command;
    copyCmdArr.push({
      id: uuid_v4(),
      location,
      input: "",
    });
    setCmdArr(copyCmdArr);
  };

  return (
    <Conatiner
      onClick={closeOptionBar}
      onContextMenu={openOptionsBar}
      name="main"
    >
      <Applications
        applicationsArr={applicationsArr}
        openApplication={openApplication}
        changeApplicationName={changeApplicationName}
      />
      <CMD
        open={checkIfCMDClicked()}
        closeCMD={closeCMD}
        minimizeCMD={minimizeCMD}
        cmdArr={cmdArr}
        sendCommand={sendCommand}
        cmdSavedCommands={cmdSavedCommands}
        setCountMinus1={setCountMinus1}
        setCountPlus1={setCountPlus1}
      />
      <TaskBar taskBarArr={taskBarArr} openCMD={openCMD} />
      <OptionsBar
        pageX={pageX}
        pageY={pageY}
        createFolder={createFolder}
        createTextFile={createTextFile}
      />
      <GlobalStyle />
    </Conatiner>
  );
}

export default App;

const Conatiner = styled.div`
  position: relative;
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: calc(100vh - 8rem); ;
`;
