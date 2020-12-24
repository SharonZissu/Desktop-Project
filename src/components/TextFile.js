import React from "react";
import styled, { css, keyframes } from "styled-components";
import NavigateBar from "./NavigateBar";

const TextFile = ({
  id,
  minimizeApp,
  sizingApp,
  closeApp,
  open,
  minimized,
  sizing,
  appName,
}) => {
  return (
    <Container open={open && !minimized} increseDiv={sizing}>
      <NavigateBar
        id={id}
        minimizeApp={minimizeApp}
        sizingApp={sizingApp}
        closeApp={closeApp}
        type="text"
        name={appName}
      />
      <TextContainer>erer</TextContainer>
    </Container>
  );
};

export default TextFile;

const Container = styled.div`
  width: ${({ increseDiv }) => (increseDiv ? "100%" : "70%")};
  height: ${({ increseDiv }) => (increseDiv ? "100%" : "70%")};
  ${({ open }) =>
    open
      ? css`
          transform: translate(-50%, -50%) scale(1);
        `
      : css`
          transform: translate(-50%, -50%) scale(0.5);
        `};
  opacity: ${({ open }) => (open ? "1" : "0")};
  transition: all 0.4s;

  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  position: absolute;
  top: 47%;
  left: 50%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const TextContainer = styled.main`
  background-color: white;
  width: 100%;
  flex: 1;
  overflow: scroll;
  font-size: 1.4rem;
  color: rgba(256, 256, 256, 0.7);
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
`;
