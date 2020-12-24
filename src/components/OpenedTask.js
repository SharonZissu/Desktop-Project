import React, { useState } from "react";
import styled from "styled-components";

const OpenedTask = ({ id, type, name, open, minimized, openFunc }) => {
  const handleClick = () => {
    openFunc();
  };
  return (
    <Container onClick={handleClick} open={open && !minimized}>
      <TaskImg src={require(`../images/${type}.png`).default} />;
    </Container>
  );
};

export default OpenedTask;

const Container = styled.div`
  /* height: 100%; */
  width: 7rem;
  height: 100%;
  /* width: 100%; */
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.3rem solid #76b9ed;
  background-color: ${({ open }) =>
    open ? "rgba(256, 256, 256, 0.1)" : "transparent"};
  &:hover {
    background-color: rgba(256, 256, 256, 0.1); //#323c55
  }
`;
const TaskImg = styled.img`
  height: 60%;
  width: 3.5rem;
`;
