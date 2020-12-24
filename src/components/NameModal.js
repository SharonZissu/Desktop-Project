import React from "react";
import styled, { css, keyframes } from "styled-components";
import Backdrop from "./Backdrop";
import startBtn from "../images/startBtn.png";

const NameModal = ({
  open,
  handleChange,
  CloseModal,
  handleEnterClickedOnModal,
}) => {
  return (
    <>
      <Backdrop open={open} />
      <Container open={open} onKeyDown={handleEnterClickedOnModal}>
        <NameInput
          placeholder="הקלד את שם שולחן העבודה..."
          dir="rtl"
          onChange={handleChange}
        />
        <StartImg src={startBtn} onClick={CloseModal} />
      </Container>
    </>
  );
};

export default NameModal;

const aniamteModal = keyframes`
0% {
    top: -50rem;
}
50% {
    top: 10rem;
}
100%{
    top: 8rem;
}
`;
const Container = styled.div`
  height: 20rem;
  width: 40rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  border: 0.3rem solid white;
  position: absolute;
  left: 8rem;
  /* top: 8rem; */
  animation: ${aniamteModal} 0.8s forwards;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ open }) =>
    open
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`;

const NameInput = styled.input`
  border: none;
  font-size: 2rem;
  margin-bottom: 3rem;
  padding: 1rem 2rem;
  border-bottom: 0.2rem solid white;
  background-color: transparent;
  color: white;
  ::-webkit-input-placeholder {
    color: white;
  }
  &:focus {
    outline: none;
  }
`;

const StartImg = styled.img`
  height: 5.5rem;
  width: 5rem;
  cursor: pointer;
`;
