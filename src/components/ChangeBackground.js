import React from "react";
import styled, { css } from "styled-components";
import backgroundImg1 from "../images/background1.jpg";

import backgroundImg2 from "../images/background2.jpg";
import backgroundImg3 from "../images/background3.jpg";
import ClearIcon from "@material-ui/icons/Clear";

const ChangeBackground = ({
  handlePickBG,
  chosenBG,
  openBgIsClicked,
  closeChangeBg,
}) => {
  const pickBG = (pick) => {
    // handlePickBG(`./images/background${pick}.jpg`);
    handlePickBG(pick);
  };
  return (
    <Container openBgIsClicked={openBgIsClicked}>
      <CloseIconContainer onClick={closeChangeBg}>
        <ClearIcon fontSize="large" />
      </CloseIconContainer>
      <Background
        chosen={chosenBG === 1 || !chosenBG}
        src={backgroundImg1}
        onClick={() => pickBG(1)}
      ></Background>
      <Background
        chosen={chosenBG === 2}
        src={backgroundImg2}
        onClick={() => pickBG(2)}
      ></Background>
      <Background
        chosen={chosenBG === 3}
        src={backgroundImg3}
        onClick={() => pickBG(3)}
      ></Background>
    </Container>
  );
};

export default ChangeBackground;

const Container = styled.div`
  /* background-color: rgba(256, 256, 256, 0.4); */
  background-color: white;
  height: 25rem;
  width: 80rem;
  border: 0.1rem solid black;
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 3rem;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s;
  opacity: 0;
  visibility: hidden;
  ${({ openBgIsClicked }) =>
    openBgIsClicked &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const Background = styled.img`
  height: 18rem;
  width: 23rem;
  ${({ chosen }) =>
    chosen &&
    css`
      border: 0.4rem solid red;
    `}/* &:not(:last-child) {
    margin-right: 2rem;
  } */
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0rem;
  right: 0rem;
  padding: 0.2rem 0.6rem;
  &:hover {
    background-color: #e81123;
  }
`;
