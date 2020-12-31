import React from "react";
import { v4 as uuid_v4 } from "uuid";
import styled, { css } from "styled-components";
import Application from "./Application";
const Applications = ({ applicationsArr, openApp, changeApplicationName }) => {
  return (
    <Container>
      {applicationsArr.map((app) => {
        // console.log(app.name);
        return (
          <Application
            key={app.id}
            id={app.id}
            type={app.type}
            name={app.name}
            openApp={openApp}
            changeApplicationName={changeApplicationName}
            instructions={app.instructions}
          />
        );
      })}
    </Container>
  );
};

export default Applications;

const Container = styled.div`
  /* background-color: red; */
  /* width: 100%; */

  height: 100%;
  max-height: 100%;
  /* width: 100%; */
  position: absolute;
  top: 0;
  right: 0;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap-reverse;
`;
