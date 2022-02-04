import React from "react";
import { v4 as uuid_v4 } from "uuid";
import styled, { css } from "styled-components";
import Application from "./Application";
const Applications = ({
  applicationsArr,
  manipulateApp,
  changeApplicationName,
  handleAppNameInputChange,
  typeOfMap,
  folderId,
}) => {
  return (
    <Container typeOfMap={typeOfMap}>
      {applicationsArr.map((app) => {
        // console.log(app.name);
        return (
          <Application
            handleAppNameInputChange={handleAppNameInputChange}
            applicationsArr={applicationsArr}
            key={app.id}
            id={app.id}
            type={app.type}
            name={app.name}
            parentFolderId={app.parentFolderId}
            manipulateApp={manipulateApp}
            changeApplicationName={changeApplicationName}
            instructions={app.instructions}
            typeOfMap={typeOfMap}
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
  margin-top: ${({ typeOfMap }) => (typeOfMap === "desktop" ? "0" : "3rem")};
  max-height: 100%;
  /* width: 100%; */
  position: absolute;
  top: 0;
  right: 0;
  padding: 5.5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap-reverse;
`;
