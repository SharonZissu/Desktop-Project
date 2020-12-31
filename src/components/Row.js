import React from "react";
import styled, { css, keyframes } from "styled-components";

const Row = ({
  row,
  handleKeyPressed,
  keyState,
  setKeyState,
  nextKey,
  correctKey,
  keyboardColor,
}) => {
  return (
    <RowContainer>
      {row.map((item, i) => {
        let itemPadding;
        let itemWidth;
        if (item === "Tab") {
          itemWidth = "10%";
        } else if (item === "Caps Lock" || item === "Enter") {
          itemWidth = "15%";
        } else if (item === "Shift Left" || item === "Shift Right") {
          itemWidth = "20%";
        }
        return (
          <Key
            key={i}
            itemWidth={itemWidth}
            clicked={keyState === item.toUpperCase()}
            correct={nextKey === keyState}
            wrong={nextKey !== keyState}
            correctKey={correctKey}
            setKeyState={setKeyState}
            keyboardColor={keyboardColor}
          >
            {item === "Shift Left" || item === "Shift Right" ? "Shift" : item}
          </Key>
        );
      })}
    </RowContainer>
  );
};

export default Row;

const animateKey = (setKeyState, correctKey) => keyframes`
0%{
  box-shadow: 0 1rem 0rem 0.3rem rgba(0, 0, 0, 0.4);
  /* background-color: black;
  color: white; */
}
100%{
  box-shadow: 0 0.5rem 0rem 0.25rem rgba(0, 0, 0, 0.3);
      transform: translatey(2px);
      background-color:${correctKey === "correct" ? "green" : "red"};
      color: black;
      font-weight: bold;
      ${setTimeout(() => {
        setKeyState("");
      }, 500)}
      
}
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Key = styled.div`
  /* background-color: #ffffff; */
  ${({ keyboardColor }) =>
    keyboardColor
      ? css`
          background-color: black;
          color: white;
          box-shadow: 0 1rem 0rem 0.3rem rgba(0, 0, 0, 0.4);
        `
      : css`
          background-color: #fcfcfc;
          color: black;
          box-shadow: 0 1rem 0rem 0.3rem rgba(0, 0, 0, 0.1);
        `}

  display: flex;
  font-weight: bold;
  flex: 1;
  border-radius: 0.6rem;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;

  padding: 1rem;
  flex: ${({ itemWidth }) => itemWidth && `0 0 ${itemWidth}`};
  /* transition: all 0.2s; */

  ${({ clicked, correct, wrong, setKeyState, correctKey }) => {
    if (clicked && correctKey)
      return css`
        animation: ${animateKey(setKeyState, "correct")} 0.3s ease-in-out;
      `;
    else if (clicked && !correctKey)
      return css`
        animation: ${animateKey(setKeyState, "wrong")} 0.3s ease-in-out;
      `;
  }}
`;
