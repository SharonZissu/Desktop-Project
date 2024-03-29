import React, { useState, useEffect } from "react";
import { v4 as uuid_v4 } from "uuid";

//components
import TaskBar from "./components/TaskBar";
import Applications from "./components/Applications";
import CMD from "./components/CMD";
import OptionsBar from "./components/OptionsBar";
import StartScreen from "./components/StartScreen";
import TextFile from "./components/TextFile";
import BatteryLow from "./components/BatteryLow";
import Backdrop from "./components/Backdrop";
import ChangeBackground from "./components/ChangeBackground";
import HowFastAreU2 from "./components/HowFastAreU2";
import Folder from "./components/Folder";
//styles
import styled, { css, keyframes } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import backgroundImg1 from "./images/background1.jpg";
import backgroundImg2 from "./images/background2.jpg";
import backgroundImg3 from "./images/background3.jpg";

import {
  INITIAL_APPLICATIONS,
  INITIAL_CMD,
  NEW_FOLDER,
  NEW_TEXTFILE,
} from "./utills";

function App() {
  const [taskBarArr, setTaskBarArr] = useState([]);
  const [applicationsArr, setApplicationArr] = useState(INITIAL_APPLICATIONS);
  const [cmdArr, setCmdArr] = useState(INITIAL_CMD);
  const [cmdSavedCommands, setCmdSavedCommands] = useState({
    commands: [],
    count: 0,
  });
  const [pageX, setPageX] = useState(null);
  const [pageY, setPageY] = useState(null);
  const [startDesktop, setStartDesktop] = useState(false);
  const [lastAppClicked, setLastAppClicked] = useState("");
  const [batteryLow, setBatteryLow] = useState(false);
  const [batteryIsCharging, setBatteryIsCharging] = useState(false);
  const [chosenBG, setChosenBG] = useState("");
  const [openBgIsClicked, setOpenBgIsClicked] = useState(false);
  const [folderWantsToAddId, setFolderWantsToAddId] = useState(null);
  const [sameNameApplications, setSameNameApplications] = useState(false);
  // const batteryTimeOut = useRef();

  //open battery low when dekstop screen is on
  useEffect(() => {
    let batteryTimeOut;
    if (startDesktop) {
      setTimeout(() => {
        batteryTimeOut = setBatteryLow(true);
        console.log("Battery low");
      }, 60000);
    }
    return () => {
      clearTimeout(batteryTimeOut);
    };
  }, [startDesktop, batteryLow]);

  //checking for same names for folders or textfiles and changes it
  useEffect(() => {
    const copyApplicationArr = [...applicationsArr];
    const lastAppName = copyApplicationArr[copyApplicationArr.length - 1];

    const findAppsWithSameType = copyApplicationArr.find(
      (app) =>
        app.type === lastAppName.type &&
        app.name === lastAppName.name &&
        app.id !== lastAppName.id
    );

    console.log({ findAppsWithSameType });

    if (findAppsWithSameType) {
      console.log("in iffff");
      if (findAppsWithSameType.name.indexOf("(") === 0) {
        const newStr = findAppsWithSameType.name.slice(3);

        lastAppName.name = `(${
          +findAppsWithSameType.name.charAt(1) + 1
        })${newStr}`;
        setApplicationArr(copyApplicationArr);
      } else {
        lastAppName.name = `(${1})${lastAppName.name}`;
        setApplicationArr(copyApplicationArr);
      }
    }
  }, [applicationsArr]);

  ///START SCREEN
  //execute when setting a password in the start screen and clicking on the button
  const startDesktopFunc = () => setStartDesktop(true);

  ////////LOW BATTERY
  //execute when clicking on the charge battery button
  const chargedHandler = () => {
    setBatteryIsCharging(true);
    setTimeout(() => {
      setBatteryIsCharging(false);
      setBatteryLow(false);
    }, 5000);
  };

  ////////CHANGE BACKGROUND////////
  //opening the "change background" modal
  const handleOpenChangeBG = () => setOpenBgIsClicked(true);

  //closing the "change background" modal
  const closeChangeBg = () => setOpenBgIsClicked(false);

  //execute when picking background in the "change background" modal
  const handlePickBG = (chose) => setChosenBG(chose);

  //helper function to find an application in the desktop
  const findObj = (id) => {
    const copyApplicationArr = [...applicationsArr];
    return [
      copyApplicationArr,
      copyApplicationArr.find((app) => app.id === id),
    ];
  };

  //if more than 1 applications are open, and we click on the body of app that behind another
  //we want the z-index of the behind app will be more then the "now" app
  //execute when we click on the main div of opened application
  const handleApplicationClickedLast = (id) => {
    const [, clickedObj] = findObj(id);
    setLastAppClicked(clickedObj);
  };

  //execute when we close application, we remove the application from the task bar in the bottom
  const deleteObjFromTaskBar = (id) => {
    const filteredTaskArr = taskBarArr.filter((task) => task.id !== id);
    setTaskBarArr(filteredTaskArr);
  };

  ////OPEN / CLOSE / MINIMIZE / SIZING
  //- when clicking an application in the desktop
  //- when clicking on "x" button on the navigate bar closing an opened application and remove it from task bar if needed
  //- when clicking on "-" button on the navigate bar ,minimized an opened application and add it to task bar
  //- when clicking on "ם" button on the navigate bar ,increase/decrease an opened application
  const manipulateApp = (action, id) => {
    const [copyApplicationArr, appObj] = findObj(id);
    console.log("id", id);
    console.log("action", action);
    console.log({ appObj });
    switch (action) {
      case "open":
        appObj.open = true;
        appObj.minimized = false;
        console.log({ copyApplicationArr });
        setApplicationArr(copyApplicationArr);
        setLastAppClicked(appObj);
        break;
      case "close":
        if (!appObj.saved && appObj.type === "text") {
          appObj.openSaveModal = true;
        } else {
          console.log("closingggggg");
          appObj.open = false;
          appObj.sizing = false;
          deleteObjFromTaskBar(id);
        }
        setApplicationArr(copyApplicationArr);
        break;
      case "minimize":
        appObj.minimized = true;
        setApplicationArr(copyApplicationArr);
        const taskObj = taskBarArr.find((task) => task.id === id);
        if (!taskObj) {
          console.log(appObj);
          setTaskBarArr([...taskBarArr, appObj]);
        }
        break;
      case "sizing":
        appObj.sizing = !appObj.sizing;
        setApplicationArr(copyApplicationArr);
        break;
      default:
        return null;
    }
  };

  //OPTIONS BAR
  //execute when clicking right click on mouse
  //opens the options bar
  const openOptionsBar = (e) => {
    e.preventDefault();
    if (!batteryLow) {
      if (e.target instanceof HTMLDivElement) {
        if (e.target.accessKey) {
          setFolderWantsToAddId(e.target.accessKey);
        }
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
    }
  };

  //closes the options bar when clicking on another area in screen
  const closeOptionBar = () => {
    setPageX(null);
    setPageY(null);
    setFolderWantsToAddId(null);
  };

  const createFolderInFolder = (folderId) => {
    const [copyApplicationArr, appObj] = findObj(folderId);
    const applicationObj = {
      ...NEW_FOLDER,
      id: uuid_v4(),
      parentFolderId: appObj.id,
    };
    appObj.appsInFolder.push(applicationObj);
    setApplicationArr([...copyApplicationArr, applicationObj]);
    setFolderWantsToAddId(null);
  };
  const createTextFileInFolder = (folderId) => {
    const [copyApplicationArr, appObj] = findObj(folderId);
    const applicationObj = {
      ...NEW_TEXTFILE,
      id: uuid_v4(),
      parentFolderId: appObj.id,
    };
    appObj.appsInFolder.push(applicationObj);
    setApplicationArr([...copyApplicationArr, applicationObj]);
    setFolderWantsToAddId(null);
  };

  //create a folder - when clicking on the option in options bar
  const createFolder = (name) => {
    let newName;
    if (typeof name === "object") newName = "תיקייה חדשה";
    else newName = name;

    const applicationObj = {
      ...NEW_FOLDER,
      id: uuid_v4(),
      name: newName,
    };

    setApplicationArr((prevState) => [...prevState, applicationObj]);
  };

  //create a text file - when clicking on the option in options bar
  const createTextFile = (name) => {
    let newName;
    if (typeof name === "object") newName = "מסמך טקסט";
    else newName = name;
    const applicationObj = {
      ...NEW_TEXTFILE,
      id: uuid_v4(),
      name: newName,
    };
    setApplicationArr((prevState) => [...prevState, applicationObj]);
  };

  //APPLICATION NAME
  //checking if the application name after creating is empty, if yes it sets the name to default names
  const changeApplicationName = (id) => {
    const [copyApplicationArr, appObj] = findObj(id);
    if (appObj.name.trim() === "") {
      if (appObj.type === "folder") appObj.name = "תיקייה חדשה";
      else if (appObj.type === "text") appObj.name = "מסמך טקסט";
      setApplicationArr(copyApplicationArr);
    }
  };

  //when changing application input name
  const handleAppNameInputChange = (newValue, id) => {
    const [copyApplicationArr, appObj] = findObj(id);
    appObj.name = newValue;
    setApplicationArr(copyApplicationArr);
  };

  //CMD functionallity
  //execute when we command 'cls' or when closing the CMD
  const clearCMD = () => {
    setCmdArr(INITIAL_CMD);
    setCmdSavedCommands({
      commands: [],
      count: 0,
    });
  };

  //send command in CMD - all the options
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

  const handleTextFileChanged = (e, id) => {
    const [copyApplicationArr, appObj] = findObj(id);
    if (appObj.text !== e.target.value) {
      appObj.saved = false;
    } else {
      appObj.saved = true;
    }
    setApplicationArr(copyApplicationArr);
  };

  //for the functionallity of the "up arrow" and "down arrow" on keyboard to see previos commands
  const setCountMinus1 = () => {
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

  //TEXT FILE FUNCIONALITY
  const saveTextFileWithAltS = (e, id, el) => {
    console.log(e.key);
    if ((e.key === "s" && e.altKey) || (e.key === "ד" && e.altKey)) {
      console.log("hereeee");
      const [copyApplicationArr, appObj] = findObj(id);
      appObj.text = el.current.value;
      appObj.saved = true;
      setApplicationArr(copyApplicationArr);
    }
  };

  //execute when clicking on "save" button in the "saving" modal
  const saveTextFileWithBtn = (id, el) => {
    const [copyApplicationArr, appObj] = findObj(id);
    appObj.text = el.current.value;
    appObj.saved = true;
    appObj.openSaveModal = false;
    appObj.open = false;
    setApplicationArr(copyApplicationArr);
  };

  //execute when clicking on "unSave" button in the "saving" modal
  const unSaveTextFile = (id, textareaEl) => {
    const [copyApplicationArr, appObj] = findObj(id);
    console.log(appObj);
    textareaEl.current.value = appObj.text;
    appObj.saved = true;
    appObj.openSaveModal = false;
    appObj.open = false;
    console.log(appObj);

    setApplicationArr(copyApplicationArr);
  };

  //execute when clicking on "cancel" button in the "saving" modal
  const CancelTextFileModal = (id) => {
    const [copyApplicationArr, appObj] = findObj(id);
    appObj.openSaveModal = false;
    setApplicationArr(copyApplicationArr);
  };

  return (
    <>
      <StartScreen
        startDesktop={startDesktop}
        startDesktopFunc={startDesktopFunc}
      />

      <Container
        onClick={closeOptionBar}
        onContextMenu={openOptionsBar}
        name="main"
        startDesktop={startDesktop}
        chosenBG={chosenBG}
      >
        <BatteryLow
          open={batteryLow}
          chargedHandler={chargedHandler}
          batteryIsCharging={batteryIsCharging}
        />

        <Backdrop open={batteryLow} type="main" />

        <Applications
          applicationsArr={applicationsArr}
          manipulateApp={manipulateApp}
          changeApplicationName={changeApplicationName}
          handleAppNameInputChange={handleAppNameInputChange}
          typeOfMap="desktop"
        />

        {applicationsArr.map((app) => {
          const { key, ...other } = app;

          if (app.type === "text") {
            return (
              <TextFile
                key={key}
                {...other}
                manipulateApp={manipulateApp}
                lastAppClicked={lastAppClicked}
                handleApplicationClickedLast={handleApplicationClickedLast}
                saveTextFileWithAltS={saveTextFileWithAltS}
                saveTextFileWithBtn={saveTextFileWithBtn}
                handleTextFileChanged={handleTextFileChanged}
                unSaveTextFile={unSaveTextFile}
                CancelTextFileModal={CancelTextFileModal}
              />
            );
          } else if (app.type === "cmd") {
            return (
              <CMD
                key={key}
                {...other}
                clearCMD={clearCMD}
                manipulateApp={manipulateApp}
                cmdArr={cmdArr}
                sendCommand={sendCommand}
                cmdSavedCommands={cmdSavedCommands}
                setCountMinus1={setCountMinus1}
                setCountPlus1={setCountPlus1}
                lastAppClicked={lastAppClicked}
                handleApplicationClickedLast={handleApplicationClickedLast}
              />
            );
          } else if (app.type === "folder") {
            return (
              <Folder
                key={key}
                {...other}
                manipulateApp={manipulateApp}
                lastAppClicked={lastAppClicked}
                handleApplicationClickedLast={handleApplicationClickedLast}
                saveTextFileWithAltS={saveTextFileWithAltS}
                saveTextFileWithBtn={saveTextFileWithBtn}
                handleTextFileChanged={handleTextFileChanged}
                unSaveTextFile={unSaveTextFile}
                CancelTextFileModal={CancelTextFileModal}
                changeApplicationName={changeApplicationName}
                handleAppNameInputChange={handleAppNameInputChange}
              />
            );
          } else if (app.type === "game") {
            return (
              <HowFastAreU2
                key={key}
                {...other}
                manipulateApp={manipulateApp}
                handleApplicationClickedLast={handleApplicationClickedLast}
              />
            );
          }
        })}

        <ChangeBackground
          handlePickBG={handlePickBG}
          chosenBG={chosenBG}
          openBgIsClicked={openBgIsClicked}
          closeChangeBg={closeChangeBg}
        />

        <TaskBar taskBarArr={taskBarArr} manipulateApp={manipulateApp} />
        <OptionsBar
          pageX={pageX}
          pageY={pageY}
          createFolder={createFolder}
          createTextFile={createTextFile}
          handleOpenChangeBG={handleOpenChangeBG}
          folderWantsToAddId={folderWantsToAddId}
          createFolderInFolder={createFolderInFolder}
          createTextFileInFolder={createTextFileInFolder}
        />
      </Container>

      <GlobalStyle />
    </>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ chosenBG }) => {
    if (chosenBG === 1 || !chosenBG)
      return css`
        background-image: url(${backgroundImg1});
      `;
    if (chosenBG === 2)
      return css`
        background-image: url(${backgroundImg2});
      `;
    if (chosenBG === 3)
      return css`
        background-image: url(${backgroundImg3});
      `;
  }}
  background-size: cover;
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1);
  /* height: 90%; */
  /* width: 90%; */
  height: calc(100vh - 8rem);
  width: calc(100vw - 8rem);
  /* z-index: 10; */
  z-index: 10;
  transition: all 0.4s ease-out;

  ${({ startDesktop }) =>
    startDesktop
      ? css`
          opacity: 1;
          visibility: visible;
          filter: none;
          -webkit-filter: none;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          filter: blur(8px);
          -webkit-filter: blur(8px);
        `}
`;

/* position: relative;
  background-image: url(${backgroundImg});
  background-size: cover;
  width: 100%;
  height: calc(100vh - 8rem);
  opacity: 0;
  visibility: hidden;
  transition: all 0.7s ease-out;
  ${({ startDesktop }) =>
    startDesktop &&
    css`
      opacity: 1;
      visibility: visible; */

/* transition: all 1s ease-out; */

// const openCMD = () => {
//   const [copyApplicationArr, cmdObj] = findCmdObj();
//   cmdObj.open = true;
//   cmdObj.minimized = false;
//   setApplicationArr(copyApplicationArr);
//   // const copyCmdArr = [...cmdArr];
//   // copyCmdArr.push({
//   //   id: uuid_v4(),
//   //   location: "\\Desktop",
//   //   input: "",
//   // });
//   // setCmdArr(copyCmdArr);
// };

// const closeCMD = () => {
//   const [copyApplicationArr, cmdObj] = findCmdObj();
//   cmdObj.open = false;
//   setApplicationArr(copyApplicationArr);
//   const filteredTaskArr = taskBarArr.filter((task) => task.type !== "cmd");
//   setTaskBarArr(filteredTaskArr);
// };

// const minimizeCMD = () => {
//   const [copyApplicationArr, cmdObj] = findCmdObj();
//   cmdObj.minimized = true;
//   setApplicationArr(copyApplicationArr);
//   const taskObj = taskBarArr.find((task) => task.type === "cmd");
//   if (!taskObj) {
//     console.log(cmdObj);
//     setTaskBarArr([...taskBarArr, cmdObj]);
//   }
// };

// const findCmdObj = () => {
//   const copyApplicationArr = [...applicationsArr];
//   return [
//     copyApplicationArr,
//     copyApplicationArr.find((app) => app.type === "cmd"),
//   ];
// };

// const checkIfCMDClicked = () => {
//   const cmdObj = applicationsArr.find((app) => app.type === "cmd");
//   return cmdObj.open;
// };

// const checkIfCMDMinimized = () => {
//   const cmdObj = applicationsArr.find((app) => app.type === "cmd");
//   return cmdObj.minimized;
// };

// const checkIfCMDSizing = () => {
//   const cmdObj = applicationsArr.find((app) => app.type === "cmd");
//   return cmdObj.sizing;
// };

// const checkCMDId = () => {
//   const cmdObj = applicationsArr.find((app) => app.type === "cmd");
//   return cmdObj.id;
// };

// const checkIfInstructionClicked = () => {
//   const instructionObj = applicationsArr.find(
//     (app) => app.instructions === true
//   );
//   return instructionObj.open;
// };

// const checkIfInstructionMinimized = () => {
//   const instructionObj = applicationsArr.find(
//     (app) => app.instructions === true
//   );
//   return instructionObj.minimized;
// };

// const checkIfInstructionSizing = () => {
//   const instructionObj = applicationsArr.find(
//     (app) => app.instructions === true
//   );
//   return instructionObj.sizing;
// };

// const checkInstructionsFileId = () => {
//   const instructionObj = applicationsArr.find(
//     (app) => app.instructions === true
//   );
//   return instructionObj.id;
// };

/*
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

  const handleTextFileChanged = (e, id) => {
    console.log(id);
    console.log(e.target.value);
    const [copyApplicationArr, appObj] = findObj(id);
    if (appObj.text !== e.target.value) {
      console.log(appObj.text + "||!==||" + e.target.value);
      appObj.saved = false;
    } else {
      console.log(appObj.text + "||===||" + e.target.value);

      appObj.saved = true;
    }
    setApplicationArr(copyApplicationArr);
  };

*/
