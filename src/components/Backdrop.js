import React from "react";
import styled, { css } from "styled-components";

const Backdrop = ({ open, type }) => {
  return <Container open={open} type={type}></Container>;
};

export default Backdrop;

const Container = styled.div`
  position: absolute;
  height: calc(100vh - 8rem);
  width: calc(100vw - 8rem);
  /* height: 90%; */
  /* width: 90%; */
  z-index: ${({ type }) => (type === "main" ? "15" : "5")};

  background-color: black;
  opacity: ${({ open }) => (open ? ".6" : "0")};
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transition: opacity 0.8s ease-in;
  /* z-index: ${({ open }) => (open ? "5" : "-15")}; */
`;
