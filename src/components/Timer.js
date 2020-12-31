import React, { useState, useEffect } from "react";
import styled from "styled-components";
const Timer = ({ gameStart, setGameFinish }) => {
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    let interval = null;
    if (gameStart) {
      interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          setGameFinish(true);
          return;
        }
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(120);
    }
    return () => clearInterval(interval);
  }, [gameStart, seconds]);

  return (
    <Container>
      <Time>
        {seconds < 10 && "0"}
        {seconds}
      </Time>
    </Container>
  );
};

export default Timer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 100%;
`;
const Time = styled.div`
  font-size: 7rem;

  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
