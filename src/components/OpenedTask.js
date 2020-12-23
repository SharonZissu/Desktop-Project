import React from "react";
import styled from "styled-components";

const OpenedTask = ({ type, name, open }) => {
  return (
    <Container onClick={open}>
      <TaskImg src={require(`../images/${type}.png`).default} />;
    </Container>
  );
};

export default OpenedTask;

const Container = styled.div`
  height: 100%;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.3rem solid #76b9ed;
`;
const TaskImg = styled.img`
  height: 60%;
  width: 3.5rem;
`;
