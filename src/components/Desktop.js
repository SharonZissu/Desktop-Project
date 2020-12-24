import React from "react";

const Desktop = () => {
  return (
    <Container
      onClick={closeOptionBar}
      onContextMenu={openOptionsBar}
      name="main"
      startDesktop={startDesktop}
    >
      <Applications
        applicationsArr={applicationsArr}
        openApplication={openApplication}
        changeApplicationName={changeApplicationName}
      />
      <CMD
        // open={checkIfCMDClicked()}
        open={checkIfCMDClicked()}
        minimized={checkIfCMDMinimized()}
        closeCMD={closeCMD}
        minimizeCMD={minimizeCMD}
        clearCMD={clearCMD}
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
    </Container>
  );
};

export default Desktop;
