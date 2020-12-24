import React from "react";
import styled, { css } from "styled-components";

const Backdrop = ({ open }) => {
  return <Container open={open}></Container>;
};

export default Backdrop;

const Container = styled.div`
  position: absolute;
  height: calc(100vh - 8rem);
  width: calc(100vw - 8rem);
  background-color: black;
  opacity: ${({ open }) => (open ? ".6" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: all 0.8s;
  /* z-index: ${({ open }) => (open ? "5" : "-15")}; */
  visibility: ${({ open }) => (open ? "block" : "none")};

  z-index: 5;
`;
