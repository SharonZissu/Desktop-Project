import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import { v4 as uuid_v4 } from "uuid";

const CMD = ({
  open,
  closeCMD,
  minimizeCMD,
  cmdArr,
  sendCommand,
  cmdSavedCommands,
  setCountMinus1,
  setCountPlus1,
}) => {
  const [command, setCommand] = useState("");
  const [enterPressed, setEnterPressed] = useState(false);
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
    setEnterPressed(false);
  }, [open, enterPressed, command]);

  const handleChange = (e) => {
    setCommand(e.target.value);
  };

  const handleSendCommand = (e) => {
    if (e.key === "Enter") {
      if (command.trim() === "") return;
      setEnterPressed(true);
      sendCommand(command);
      setCommand("");
    } else if (e.key === "ArrowUp" && cmdSavedCommands.commands.length > 0) {
      e.preventDefault();
      if (cmdSavedCommands.count > 0) {
        console.log("yesssssssss");
        setCommand(cmdSavedCommands.commands[cmdSavedCommands.count - 1]);
        setCountMinus1();
      }
    } else if (
      e.key === "ArrowDown" &&
      cmdSavedCommands.count < cmdSavedCommands.commands.length
    ) {
      if (
        cmdSavedCommands.count >= 0 &&
        cmdSavedCommands.count !== cmdSavedCommands.commands.length - 1
      ) {
        e.preventDefault();
        setCommand(cmdSavedCommands.commands[cmdSavedCommands.count + 1]);
        setCountPlus1();
      }
    }
  };

  return (
    <Container open={open}>
      <Navigate>
        <NavigateBtns>
          <NavigateBtn onClick={minimizeCMD}>
            <RemoveIcon fontSize="large" />
          </NavigateBtn>
          <NavigateBtn onClick={closeCMD}>
            <ClearIcon fontSize="large" />
          </NavigateBtn>
        </NavigateBtns>
        <NameAndIcon>
          <Icon src={require("../images/cmd.png").default} />
          <Name>שורת הפקודה</Name>
        </NameAndIcon>
      </Navigate>
      <CommandsContainer>
        <Heading>
          Microsoft Windows <br /> (c) 2020 Microsoft Corporation. All rights
          reserved.
        </Heading>
        {cmdArr.map((item) => {
          if (!item.error) {
            return (
              <Command key={item.id} onKeyDown={handleSendCommand}>
                <Location>{item.location}></Location>
                <CommandInput
                  ref={inputEl}
                  value={item.input || command}
                  onChange={handleChange}
                  // onKeyDown={(e) => getLastCommand(e, item.id)}
                />
              </Command>
            );
          } else {
            return (
              <Command key={item.id} onKeyDown={handleSendCommand}>
                <CommandError> {item.error}</CommandError>
              </Command>
            );
          }
        })}
      </CommandsContainer>
    </Container>
  );
};

export default CMD;

const Container = styled.div`
  width: 65rem;
  height: 40rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  ${({ open }) =>
    open
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0.5);
        `};
  opacity: ${({ open }) => (open ? "1" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.4s;
`;

const Navigate = styled.div`
  flex: 0 0 7%;
  width: 65rem;
  padding-right: 1.65rem;
  padding-left: 0.6rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const NavigateBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigateBtn = styled.button`
  border: none;
  padding: 0 1.4rem;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.6);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #e81123;
  }
  &:focus {
    outline: none;
  }
`;

const NameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Name = styled.label`
  font-size: 1.2rem;
  height: 80%;
`;
const Icon = styled.img`
  /* height: 0.8rem; */
  width: 1.6rem;
  margin-right: 0.4rem;
  height: 50%;
`;

const CommandsContainer = styled.main`
  background-color: black;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
  font-size: 1.4rem;
  color: rgba(256, 256, 256, 0.7);
`;

const Heading = styled.label`
  line-height: 1.4;
`;

const Command = styled.div`
  display: flex;
  margin-top: 1rem;
  &:first-of-type {
    margin-top: 2rem;
  }
`;

const Location = styled.label``;
const CommandInput = styled.input`
  background-color: transparent;
  color: rgba(256, 256, 256, 0.7);

  border: none;
  &:focus {
    outline: none;
  }
`;

const CommandError = styled.label`
  color: red;
`;
