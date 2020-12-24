import React from "react";
import styled, { css } from "styled-components";

const NavigateBar = ({ minimized, sizing, close, type, name }) => {
  return (
    <Navigate increseCmd={increseCmd}>
      <NavigateBtns>
        <GreyHoverBtn onClick={minimized}>
          <RemoveIcon fontSize="large" />
        </GreyHoverBtn>
        <GreyHoverBtn onClick={sizing}>
          <CropSquareSharpIcon fontSize="large" />
        </GreyHoverBtn>

        <CloseBtn onClick={close}>
          <ClearIcon fontSize="large" />
        </CloseBtn>
      </NavigateBtns>
      <NameAndIcon>
        <Icon src={require(`../images/${type}.png`).default} />
        <Name>{name}</Name>
      </NameAndIcon>
    </Navigate>
  );
};

export default NavigateBar;

const Navigate = styled.div`
  flex: 0 0 7%;
  /* width: ${({ increseCmd }) => (increseCmd ? "100%" : "65rem")}; */
  width: 100%;
  /* transition: all 0.4s; */

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

  &:focus {
    outline: none;
  }
`;

const CloseBtn = styled(NavigateBtn)`
  &:hover {
    background-color: #e81123;
  }
`;
const GreyHoverBtn = styled(NavigateBtn)`
  &:hover {
    background-color: #e5e5e5;
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
