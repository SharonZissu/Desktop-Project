import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Application = ({
  id,
  type,
  name,
  openApplication,
  changeApplicationName,
  instructions,
}) => {
  // console.log(name);
  const [newAppName, setNewAppName] = useState(name);
  const inputNameEl = useRef(null);
  useEffect(() => {
    if (inputNameEl.current) inputNameEl.current.focus();
  }, []);

  const handleChange = (e) => {
    setNewAppName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      changeApplicationName(id, newAppName);
      inputNameEl.current.blur();
    }
  };

  const saveName = () => {
    changeApplicationName(id, newAppName);
    inputNameEl.current.blur();
  };
  return (
    <ApplicationContainer>
      <ApplicationImg
        src={require(`../images/${type}.png`).default}
        onDoubleClick={() => openApplication(id)}
      />
      {(type === "cmd" || instructions) && (
        <ApplicationName>{name}</ApplicationName>
      )}
      {type !== "cmd" && !instructions && (
        <ApplicationNameInput
          type="text"
          value={newAppName}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputNameEl}
          onBlur={saveName}
          rows="2"
        />
      )}
    </ApplicationContainer>
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
  color: white;
  font-size: 1.4rem;
`;

const ApplicationNameInput = styled.input`
  color: white;
  height: auto;
  font-size: 1.4rem;
  border: none;
  background-color: transparent;
  width: 9rem;
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
