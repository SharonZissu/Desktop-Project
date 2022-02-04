import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Row from "./Row";
import Timer from "./Timer";
import NavigateBar from "./NavigateBar";
import KeyboardIcon from "@material-ui/icons/Keyboard";

const keyboard = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Delete"],
  ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
  [
    "Shift Left",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    ",",
    ".",
    "/",
    "Shift Right",
  ],
  ["Space"],
];
const HowFastAreU2 = ({
  id,
  open,
  minimized,
  sizing,
  manipulateApp,
  handleApplicationClickedLast,
}) => {
  const [keyState, setKeyState] = useState("");
  const [nextKey, setNextKey] = useState("");
  const [correctKey, setCorrectKey] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);
  const [gameFinish, setGameFinish] = useState(false);
  const [keyboardColor, setKeyboardColor] = useState(true);

  const gameRef = useRef(null);
  let timeout = useRef(null);

  useEffect(() => {
    if (open) {
      console.log(gameRef);
      console.log(gameRef.current);

      if (gameRef.current) {
        console.log("Focus now!!!");
        timeout = setTimeout(() => {
          gameRef.current.focus();
        }, 400); //because the transition of 0.4s in the animation
      }
    } else {
      restartGame();
      clearTimeout(timeout);
    }
    randomNextKey();

    return () => {
      clearTimeout(timeout);
    };
  }, [open, minimized]); //When click on the application in desktop then it will focus

  const randomNextKey = () => {
    const keysArr = [
      ...keyboard[0],
      ...keyboard[1],
      ...keyboard[2],
      ...keyboard[3],
      ...keyboard[4],
    ];

    const itemNum = Math.floor(Math.random() * keysArr.length);
    setNextKey(keysArr[itemNum]);
  };

  const handleKeyPressed = (e, name) => {
    if (!gameFinish) {
      e.preventDefault();

      const { key, code } = e;
      console.log("key", key);
      let keyPress;
      if (key === "CapsLock") keyPress = "Caps Lock";
      else if (key === "Backspace") keyPress = "Delete";
      else if (key === " ") keyPress = "Space";
      else if (key === "Enter") keyPress = "Enter";
      else if (key === "Tab") keyPress = "Tab";
      else if (key === "Shift") {
        if (code === "ShiftLeft") keyPress = "Shift Left";
        else keyPress = "Shift Right";
      } else keyPress = key;
      keyPress = keyPress.toUpperCase();
      setKeyState(keyPress);

      if (keyPress === nextKey.toUpperCase()) {
        setCorrectKey(true);
        if (score === 0) {
          setGameStart(true);
        }
        setScore((prevState) => prevState + 1);
        randomNextKey();
      } else {
        setCorrectKey(false);
      }
    }
  };

  const restartGame = () => {
    setGameStart(false);
    setGameFinish(false);
    randomNextKey();
    setScore(0);
  };

  const changeKeyboardColor = () => {
    setKeyboardColor(!keyboardColor);
  };

  return (
    <Container
      onKeyDown={(e) => handleKeyPressed(e)}
      onClick={() => handleApplicationClickedLast(id)}
      tabIndex="0"
      ref={gameRef}
      open={open && !minimized}
      increseDiv={sizing}
    >
      <NavigateBar
        id={id}
        manipulateApp={manipulateApp}
        type="game"
        name="2 כמה מהירים אתם"
      />
      <GameBoard keyboardColor={keyboardColor}>
        <IconContainer sizing={sizing}>
          <img
            src={require("../images/keyboardIcon.png").default}
            style={{
              height: sizing ? "100%" : "100%",
              width: sizing ? "170%" : "150%",
            }}
          />
        </IconContainer>

        <ColumnContainer>
          <Button keyboardColor={keyboardColor} onClick={restartGame}>
            משחק חדש
          </Button>
          <Button keyboardColor={keyboardColor} onClick={changeKeyboardColor}>
            החלף צבע מקלדת
          </Button>
        </ColumnContainer>
        <GameContent>
          <ColumnContainer>
            <Title>שניות שנותרו</Title>
            <Timer gameStart={gameStart} setGameFinish={setGameFinish} />
          </ColumnContainer>
          <ColumnContainer>
            <Title>המקש הבא</Title>
            <NextCharacter decreaseStr={nextKey.length > 5} type="nextkey">
              {nextKey}
            </NextCharacter>
          </ColumnContainer>
          <ColumnContainer>
            <Title>תוצאה</Title>
            <Score>{score}</Score>
          </ColumnContainer>
        </GameContent>
      </GameBoard>
      <KeyBoard keyboardColor={keyboardColor}>
        {keyboard.map((row, i) => (
          <Row
            key={i}
            row={row}
            handleKeyPressed={handleKeyPressed}
            keyState={keyState}
            setKeyState={setKeyState}
            nextKey={nextKey}
            correctKey={correctKey}
            keyboardColor={keyboardColor}
          />
        ))}
      </KeyBoard>
    </Container>
  );
};

export default HowFastAreU2;

const Container = styled.div`
  background-color: white;
  border: 0.4rem solid black;
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 47%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.4s;
  &:focus {
    outline: none;
  }
  ${({ increseDiv }) =>
    increseDiv
      ? css`
          height: calc(100% - 5rem);
          margin-top: -2.45rem;
          width: 100%;
          box-shadow: none;
          border: none;
          top: 50%;
          box-shadow: none;
        `
      : css`
          height: 85%;
          width: 90%;
          box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.4);
          border: 1px solid black;
        `}
  ${({ open }) =>
    open
      ? css`
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          visibility: visible;
        `
      : css`
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          visibility: hidden;
        `};
`;

const GameBoard = styled.div`
  height: 27%;
  width: 100%;
  position: relative;
  ${({ keyboardColor }) =>
    keyboardColor
      ? css`
          background-color: #6b6565;
          border-bottom: 0.1rem solid black;
        `
      : css`
          background-color: #d5d5d8;
          border-bottom: 0.1rem solid white;
        `};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GameContent = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  height: 100%;
  overflow: hidden;
`;

const IconContainer = styled.div`
  position: absolute;
  height: 100%;
  left: ${({ sizing }) => (sizing ? "-8.5rem" : "-6.5rem")};
  opacity: 0.075;
`;

const ColumnContainer = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 3;
`;
const Title = styled.label`
  height: 20%;
  width: 100%;
  font-size: 2.6rem;
  color: red;
  text-align: center;

  margin-bottom: -2rem;
`;
const NextCharacter = styled.label`
  font-size: ${({ decreaseStr }) => (decreaseStr ? "4rem" : "7rem")};

  height: 80%;
  width: 100%;

  /* border: 0.2rem solid black; */
  /* padding: 0.4rem 2.4rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ type }) =>
    type &&
    css`
      width: 33rem;
      height: 11rem;
    `}
`;

const Score = styled.div`
  font-size: 7rem;
  width: 100%;
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const KeyBoard = styled.div`
  /* background-color: #f3f3f3; */
  background-color: ${({ keyboardColor }) =>
    keyboardColor ? "#6b6565" : "#d5d5d8"};
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 1rem 0.6rem 1rem;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  /* border: 1px solid black; */
  border: none;
  font-size: 2rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  ${({ keyboardColor }) =>
    keyboardColor
      ? css`
          background-color: black;
          color: white;
        `
      : css`
          background-color: #fcfcfc;
          color: black;
        `}
  cursor: pointer;
  border-radius: 0.6rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &:focus {
    outline: none;
  }
`;
