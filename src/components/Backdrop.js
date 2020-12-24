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
  transition: opacity 0.8s ease-in;
  /* z-index: ${({ open }) => (open ? "5" : "-15")}; */

  z-index: 5;
`;
