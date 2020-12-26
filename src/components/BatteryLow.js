import { Backdrop } from "@material-ui/core";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import FlashOnIcon from "@material-ui/icons/FlashOn";

const BatteryLow = ({ open, chargedHandler, batteryIsCharging }) => {
  return (
    <Container open={open}>
      <Heading>.הסוללה נחלשת</Heading>
      <Content>.חבר את המחשב למקור חשמל</Content>
      <Button onClick={chargedHandler}>חבר</Button>

      <FlashIconContainer>
        <FlashOnIcon style={{ height: "100%", width: "100%" }} />
      </FlashIconContainer>
      <ChargerContainer>
        <Charger batteryIsCharging={batteryIsCharging}></Charger>
      </ChargerContainer>
      <WaitingCharging batteryIsCharging={batteryIsCharging}>
        ...המתן 5 שניות לטעינה מלאה
      </WaitingCharging>
    </Container>
  );
  // </>
};

export default BatteryLow;

const chargeAnimate = keyframes`
0%{
width: 8%;

}

35%{
  width: 35%;

}

70%{
  width: 70%;

}
100%{
  width: 100%;

}
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  height: 15rem;
  width: 50rem;
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1);
  background-color: #0067b3;
  color: white;
  opacity: 0;
  visibility: hidden;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: opacity 0.8s ease-in;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      visibility: visible;
      z-index: 200;
    `}
`;

const Heading = styled.h1`
  font-weight: 400;
`;

const Content = styled.p`
  margin-top: 0.2rem;
  font-size: 1.3rem;
`;

const Button = styled.button`
  border: 0.2rem solid white;
  padding: 0.5rem 2rem;
  background-color: #0076d7;
  color: white;
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  &:focus {
    outline: none;
  }
`;

const ChargerContainer = styled.div`
  width: 10rem;
  height: 4rem;
  border-radius: 0.6rem;
  border: 0.2rem solid white;
  position: absolute;
  right: 2rem;
  bottom: 2rem;
  display: flex;
`;

const FlashIconContainer = styled.div`
  position: absolute;
  right: 12rem;
  bottom: 2rem;
  height: 4.2rem;
  width: 5rem;
`;

const Charger = styled.div`
  height: 100%;
  width: 8%;
  ${({ batteryIsCharging }) =>
    batteryIsCharging &&
    css`
      animation: ${chargeAnimate} 0.8s linear infinite;
    `}
  border-radius: 0.6rem;
  background-color: #50af31;
  border: 0.2rem solid black;
`;

const WaitingCharging = styled.p`
  position: absolute;
  opacity: ${({ batteryIsCharging }) => (batteryIsCharging ? "1" : "0")};
  transition: opacity 0.7s;
  right: 17rem;
  bottom: 2rem;
  font-size: 1.3rem;
`;
