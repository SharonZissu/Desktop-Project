import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Application = ({
  applicationsArr,
  id,
  type,
  name,
  manipulateApp,
  parentFolderId,
  changeApplicationName,
  instructions,
  handleAppNameInputChange,
  typeOfMap,
}) => {
  // console.log(name);
  const inputNameEl = useRef(null);
  let timer = useRef(null);
  useEffect(() => {
    console.log("useEffect....");
    console.log(inputNameEl);
    console.log(inputNameEl.current);
    if (inputNameEl.current) {
      timer = setTimeout(() => {
        inputNameEl.current.focus();
        inputNameEl.current.select();
      }, [100]);
    }
  }, []);

  const handleOnFocus = () => {
    inputNameEl.current.focus();
    inputNameEl.current.select();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // changeApplicationName(id, newAppName);
      // if (newAppName.trim() === "") {
      //   if (type === "text") setNewAppName("מסמך טקסט");
      //   else if (type === "folder") setNewAppName("תיקייה חדשה");
      // }
      inputNameEl.current.blur();
    }
  };

  const saveName = () => {
    changeApplicationName(id);

    // let newName;
    // if (newAppName.trim() === "") {
    //   if (type === "text") {
    //     newName = "מסמך טקסט";
    //   } else if (type === "folder") newName = "תיקייה חדשה";
    // }
    // console.log("applicationsArr", applicationsArr);
    // const extraStr = applicationsArr.filter(
    //   (app) => app.type === type && app.name === newName && app.id !== id
    // ).length;
    // console.log("extraStr", extraStr);

    // if (extraStr) newName = `(${extraStr})` + newName;
    // console.log("newName", newName);

    // setNewAppName(newName);

    inputNameEl.current.blur();
  };
  return (
    <>
      {((typeOfMap === "desktop" && !parentFolderId) ||
        (typeOfMap === "folderInFolder" && parentFolderId)) && (
        <ApplicationContainer>
          <ApplicationImg
            src={require(`../images/${type}.png`).default}
            onDoubleClick={() => manipulateApp("open", id)}
          />
          {(type === "cmd" || instructions || type === "game") && (
            <ApplicationName typeOfMap={typeOfMap} dir="rtl">
              {name}
            </ApplicationName>
          )}
          {type !== "cmd" && !instructions && (
            <ApplicationNameInput
              typeOfMap={typeOfMap}
              type="text"
              value={name}
              onChange={(e) => handleAppNameInputChange(e.target.value, id)}
              onKeyDown={handleKeyDown}
              ref={inputNameEl}
              onBlur={saveName}
              onFocus={handleOnFocus}
              rows="2"
            />
          )}
        </ApplicationContainer>
      )}
    </>
  );
};

export default Application;

const ApplicationContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 10rem;
  min-height: 8rem;
  margin-bottom: 2.2rem;
  margin-left: 3rem;
`;
const ApplicationName = styled.label`
  color: ${({ typeOfMap }) => (typeOfMap === "desktop" ? "white" : "black")};
  font-size: 1.4rem;
  text-align: center;
`;

const ApplicationNameInput = styled.input`
  color: ${({ typeOfMap }) => (typeOfMap === "desktop" ? "white" : "black")};

  height: auto;
  font-size: 1.4rem;
  border: none;
  background-color: transparent;
  width: 10rem;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  padding: 0.2rem;
  &:focus {
    outline: none;
    border: 0.5px solid black;
  }
`;

const ApplicationImg = styled.img`
  height: 5rem;
  width: 5rem;
`;
