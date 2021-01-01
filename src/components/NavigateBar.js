import React from "react";
import styled, { css } from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import RemoveIcon from "@material-ui/icons/Remove";
import CropSquareSharpIcon from "@material-ui/icons/CropSquareSharp";

const NavigateBar = ({
  id,
  minimizeApp,
  sizingApp,
  closeApp,
  type,
  name,
  saved,
}) => {
  return (
    <Navigate>
      <NavigateBtns>
        <GreyHoverBtn onClick={() => minimizeApp(id)}>
          <RemoveIcon fontSize="large" />
        </GreyHoverBtn>
        <GreyHoverBtn onClick={() => sizingApp(id)}>
          <CropSquareSharpIcon fontSize="large" />
        </GreyHoverBtn>
        <CloseBtn onClick={() => closeApp(id)}>
          <ClearIcon fontSize="large" />
        </CloseBtn>
      </NavigateBtns>
      {!saved && type === "text" && <Saved>*</Saved>}
      <NameAndIcon>
        <IconContainer>
          <Icon src={require(`../images/${type}.png`).default} />
        </IconContainer>
        <Name>{name}</Name>
      </NameAndIcon>
    </Navigate>
  );
};

export default NavigateBar;

const Navigate = styled.div`
  height: 3.3rem;
  /* flex: 0 0 7%; */
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

const Saved = styled.label`
  font-size: 3rem;
  line-height: 1.4;
`;

const NameAndIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Name = styled.label`
  font-size: 1.2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const IconContainer = styled.div`
  height: 100%;
  width: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.4rem;
`;
const Icon = styled.img`
  /* height: 0.8rem; */
  width: 100%;
  height: 50%;
`;
