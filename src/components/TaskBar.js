import React, { useState } from "react";
import OpenedTask from "./OpenedTask";
import moment from "moment";
//styles
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindows } from "@fortawesome/free-brands-svg-icons";

const TaskBar = ({ taskBarArr, openCMD }) => {
  const [hover, setHover] = useState(false);
  const date = new Date(moment().format());
  console.log(date);
  const hours = date.getHours();
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.toString().split(" ")[2];

  return (
    <Container>
      <TimeContainer>
        <Time>
          {hours}:{minutes}
        </Time>
        <DateContent>
          {day}/{month + 1}/{year}
        </DateContent>
      </TimeContainer>
      {taskBarArr.map(({ type, name }, i) => (
        <OpenedTask key={i} type={type} name={name} open={openCMD} />
      ))}
      <StartIcon
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <FontAwesomeIcon
          icon={faWindows}
          size="2x"
          color={hover ? "#429ce3" : "white"}
        />
      </StartIcon>
    </Container>
  );
};

export default TaskBar;

const Container = styled.div`
  width: 100%;
  height: 5rem;
  /* background-image: radial-gradient(#465f9d, #1f2b48); */
  background-image: linear-gradient(to right, #1f2b48, #2a3a62);

  /* background-image:  #1f2b48 #27365c; */
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0.8rem 1.4rem; */
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.4rem;
  height: 100%;
`;

const TimeAndData = styled.label`
  color: white;
  font-size: 1.4rem;
`;
const Time = styled(TimeAndData)``;
const DateContent = styled(TimeAndData)``;

const StartIcon = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.8rem 1.4rem;
  height: 100%;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #323c55;
  }
`;
