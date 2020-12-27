import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import background from "../images/start-screen-bg.png";
import background2 from "../images/start-screen-bg2.png";
import background3 from "../images/start-screen-bg3.png";
import { getCurrentTime } from "../utills";
import PersonIcon from "@material-ui/icons/Person";
import NameModal from "./NameModal";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const StartScreen = ({ startDesktop, startDesktopFunc }) => {
  const {
    hours,
    minutes,
    month,
    monthName,
    year,
    day,
    dayName,
  } = getCurrentTime();

  const [screenClicked, setScreenClicked] = useState(false);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const CloseModal = () => {
    setModalOpen(false);
  };
  const handleEnterClickedOnModal = (e) => {
    if (e.key === "Enter") setModalOpen(false);
  };
  return (
    <>
      <NameModal
        open={modalOpen}
        handleChange={handleChange}
        CloseModal={CloseModal}
        handleEnterClickedOnModal={handleEnterClickedOnModal}
      />

      <Container
        onClick={() => setScreenClicked(true)}
        blurBg={(screenClicked && !modalOpen) || modalOpen}
        startDesktop={startDesktop}
      >
        <TimeAndDate screenClicked={(screenClicked && !modalOpen) || modalOpen}>
          <Time>
            {hours}:{minutes}
          </Time>
          <Date>
            יום {dayName} {day} ב{monthName}
          </Date>
        </TimeAndDate>
      </Container>
      <StartModal screenClicked={screenClicked} startDesktop={startDesktop}>
        <IconContainer>
          <PersonIcon style={{ height: "100%", width: "100%" }} />
        </IconContainer>
        <Name>{name}</Name>
        <PasswordInputContainer>
          <StartIconContainer onClick={startDesktopFunc}>
            <ArrowBackIcon style={{ height: "80%", width: "80%" }} />
          </StartIconContainer>
          <PasswordInput
            type="password"
            dir="rtl"
            placeholder="הקלידו סיסמא לחווית המשתמש..."
          />
        </PasswordInputContainer>
      </StartModal>
    </>
  );
};

export default StartScreen;

const Container = styled.div`
  position: relative;
  background-image: url(${background});
  background-size: cover;
  width: 100%;
  height: calc(100vh - 8rem);
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.3);

  /* opacity: ${({ startDesktop }) => (startDesktop ? "0" : "1")};
  visibility: ${({ startDesktop }) => (startDesktop ? "hidden" : "visible")}; */
  ${({ blurBg }) =>
    blurBg &&
    css`
      filter: blur(8px);
      -webkit-filter: blur(8px);
    `}

  ${({ startDesktop }) =>
    startDesktop &&
    css`
      filter: none;
      -webkit-filter: none;
    `}
  transition: all .5s ease-out;
`;

const TimeAndDate = styled.div`
  position: absolute;
  bottom: 6rem;
  right: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: white;
  line-height: 1.2;
  font-weight: 200;
  transition: all 0.5s ease-out;
  ${({ screenClicked }) =>
    screenClicked
      ? css`
          opacity: 0;
          visibility: hidden;
        `
      : css`
          opacity: 1;
          visibility: visible;
        `}
`;
const Time = styled.label`
  font-size: 11rem;
`;
const Date = styled.label`
  font-size: 6rem;
`;

const StartModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: white;
  width: 30rem;
  height: 70vh;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-out;
  /* transition: ${({ startDesktop }) =>
    startDesktop ? "all 0s ease 0s" : "all 0.5s ease-out"}; */
  ${({ startDesktop }) =>
    startDesktop &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
  ${({ screenClicked }) =>
    screenClicked
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
`;

const IconContainer = styled.div`
  height: 15rem;
  width: 15rem;
  margin-bottom: 2rem;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: rgba(75, 76, 76, 0.7);
  border-radius: 50%;
`;
const Name = styled.label`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  height: 3.5rem;
  width: 25rem;
`;

const StartIconContainer = styled.div`
  width: 5rem;
  height: 100%;
  background-color: rgba(75, 76, 76, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0 1rem;
  &:focus {
    outline: none;
  }
`;
// const Container = styled.div`
//   position: relative;
//   background-image: url(${background});
//   background-size: cover;
//   width: 100%;
//   height: calc(100vh - 8rem);
//   opacity: ${({ startDesktop }) => (startDesktop ? "0" : "1")};
//   ${({ blurBg }) =>
//     blurBg &&
//     css`
//       filter: blur(8px);
//       -webkit-filter: blur(8px);
//     `}
//   transition: all .5s ease-out;
// `;

// const TimeAndDate = styled.div`
//   position: absolute;
//   bottom: 6rem;
//   right: 3rem;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-end;
//   color: white;
//   line-height: 1.2;
//   font-weight: 200;
//   transition: all 0.5s ease-out;

//   ${({ screenClicked }) =>
//     screenClicked
//       ? css`
//           opacity: 0;
//           visibility: hidden;
//         `
//       : css`
//           opacity: 1;
//           visibility: visible;
//         `}
// `;
// const Time = styled.label`
//   font-size: 11rem;
// `;
// const Date = styled.label`
//   font-size: 6rem;
// `;

// const StartModal = styled.div`
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   transform: translate(-50%, -50%);
//   color: white;
//   width: 30rem;
//   height: 70vh;
//   /* background-color: red; */
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.5s ease-out;
//   /* transition: ${({ startDesktop }) =>
//     startDesktop ? "all 0s ease 0s" : "all 0.5s ease-out"}; */

//   ${({ screenClicked }) =>
//     screenClicked
//       ? css`
//           opacity: 1;
//           visibility: visible;
//         `
//       : css`
//           opacity: 0;
//           visibility: hidden;
//         `}

//   ${({ startDesktop }) =>
//     startDesktop &&
//     css`
//       opacity: 0;
//       visibility: hidden;
//     `}
// `;

// const IconContainer = styled.div`
//   height: 15rem;
//   width: 15rem;
//   margin-bottom: 2rem;
//   /* background-color: rgba(0, 0, 0, 0.5); */
//   background-color: rgba(75, 76, 76, 0.7);
//   border-radius: 50%;
// `;
// const Name = styled.label`
//   font-size: 5rem;
//   margin-bottom: 2rem;
// `;

// const PasswordInputContainer = styled.div`
//   display: flex;
//   height: 3.5rem;
//   width: 25rem;
// `;

// const StartIconContainer = styled.div`
//   width: 5rem;
//   height: 100%;
//   background-color: rgba(75, 76, 76, 0.7);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const PasswordInput = styled.input`
//   width: 100%;
//   height: 100%;
//   border: none;
//   padding: 0 1rem;

//   &:focus {
//     outline: none;
//   }
// `;
