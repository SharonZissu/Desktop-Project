import React from "react";
import styled, { css } from "styled-components";
import RateReviewIcon from "@material-ui/icons/RateReview";

const OptionsBar = ({
  pageX,
  pageY,
  createFolder,
  createTextFile,
  handleOpenChangeBG,
  folderWantsToAddId,
  createFolderInFolder,
  createTextFileInFolder,
}) => {
  let xPx = 0;
  let yPx = 0;
  if (pageX && pageY) {
    console.log("HERERERER");
    xPx = `${pageX}px`;
    yPx = `${pageY}px`;
  }
  return (
    <>
      {pageX && !folderWantsToAddId && (
        <Container x={xPx} y={yPx}>
          {/* <Line onClick={() => createFolder(undefined)}> */}
          <Line onClick={createFolder}>
            <Label>צור תיקיה חדשה</Label>
            <Icon src={require("../images/folder.png").default} />
          </Line>
          <Line onClick={createTextFile}>
            <Label>צור מסמך טקסט</Label>
            <Icon src={require("../images/text.png").default} />
          </Line>
          <Line onClick={handleOpenChangeBG}>
            <Label>שנה רקע</Label>
            <Icon src={require("../images/view.png").default} />
          </Line>
        </Container>
      )}
      {folderWantsToAddId && (
        <Container x={xPx} y={yPx}>
          {/* <Line onClick={() => createFolder(undefined)}> */}
          <Line onClick={() => createFolderInFolder(folderWantsToAddId)}>
            <Label>צור תיקיה חדשה</Label>
            <Icon src={require("../images/folder.png").default} />
          </Line>
          <Line onClick={() => createTextFileInFolder(folderWantsToAddId)}>
            <Label>צור מסמך טקסט</Label>
            <Icon src={require("../images/text.png").default} />
          </Line>
          <Line onClick={handleOpenChangeBG}>
            <Label>שנה רקע</Label>
            <Icon src={require("../images/view.png").default} />
          </Line>
        </Container>
      )}
    </>
  );
};

export default OptionsBar;

const Container = styled.div`
  position: absolute;
  left: ${({ x }) => x};
  top: ${({ y }) => y};
  height: 20rem;
  width: 15rem;
  background-color: #ffffff;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  z-index: 205;
`;

const Line = styled.div`
  width: 100%;
  height: 3rem;
  padding-right: 1rem;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
`;

const Icon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  margin-left: 1rem;
`;
