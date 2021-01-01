import React, { useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import NavigateBar from "./NavigateBar";
import ClearIcon from "@material-ui/icons/Clear";
import Applications from "./Applications";

const Folder = ({
  id,
  minimizeApp,
  sizingApp,
  closeApp,
  open,
  minimized,
  sizing,
  saved,
  appName,
  appsInFolder,
  lastAppClicked,
  handleApplicationClickedLast,
  saveTextFileWithAltS,
  saveTextFileWithBtn,
  handleTextFileChanged,
  unSaveTextFile,
  CancelTextFileModal,
  openApp,
  changeApplicationName,
  handleAppNameInputChange,
}) => {
  const textareaEl = useRef(null);

  return (
    <Container
      onClick={() => handleApplicationClickedLast(id)}
      open={open && !minimized}
      increseDiv={sizing}
      lastClick={lastAppClicked.id === id}
    >
      <NavigateBar
        id={id}
        minimizeApp={minimizeApp}
        sizingApp={sizingApp}
        closeApp={closeApp}
        type="folder"
        name={appName}
        saved={saved}
      />
      <FolderContainer accessKey={id}>
        <Applications
          applicationsArr={appsInFolder}
          openApp={openApp}
          changeApplicationName={changeApplicationName}
          handleAppNameInputChange={handleAppNameInputChange}
        />
        {/* if(app.type === 'folder') { 
          //   return (
          //     <Folder
          //       key={app.id}
          //       id={app.id}
          //       minimizeApp={minimizeApp}
          //       sizingApp={sizingApp}
          //       closeApp={closeApp}
          //       open={app.open}
          //       minimized={app.minimized}
          //       sizing={app.sizing}
          //       saved={app.saved}
          //       appName={app.name}
          //       appsInFolder={app.appsInFolder}
          //       lastAppClicked={lastAppClicked}
          //       handleApplicationClickedLast={handleApplicationClickedLast}
          //       saveTextFileWithAltS={saveTextFileWithAltS}
          //       saveTextFileWithBtn={saveTextFileWithBtn}
          //       handleTextFileChanged={handleTextFileChanged}
          //       unSaveTextFile={unSaveTextFile}
          //       CancelTextFileModal={CancelTextFileModal}
          //     />
          //   )
          // } else if(app.type === 'text') {
          //   return (
          //     <TextFile
          //     key={app.id}
          //     id={app.id}
          //     minimizeApp={minimizeApp}
          //     sizingApp={sizingApp}
          //     closeApp={closeApp}
          //     open={app.open}
          //     minimized={app.minimized}
          //     sizing={app.sizing}
          //     text={app.text}
          //     saved={app.saved}
          //     appName={app.name}
          //     openSaveModal={app.openSaveModal}
          //     lastAppClicked={lastAppClicked}
          //     handleApplicationClickedLast={handleApplicationClickedLast}
          //     saveTextFileWithAltS={saveTextFileWithAltS}
          //     saveTextFileWithBtn={saveTextFileWithBtn}
          //     handleTextFileChanged={handleTextFileChanged}
          //     unSaveTextFile={unSaveTextFile}
          //     CancelTextFileModal={CancelTextFileModal}
          //   />
          //   )
          // }*/}
      </FolderContainer>
    </Container>
  );
};

export default Folder;

const Container = styled.div`
  /* width: ${({ increseDiv }) => (increseDiv ? "100%" : "70%")}; */
  /* height: ${({ increseDiv }) => (increseDiv ? "100%" : "70%")}; */
  /* border: ${({ increseDiv }) =>
    increseDiv ? "none" : "1px solid black"}; */
  /* box-shadow: ${({ increseDiv }) =>
    increseDiv ? "none" : "0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1)"}; */
  ${({ increseDiv }) =>
    increseDiv
      ? css`
          height: calc(100% - 5rem);
          margin-top: -2.45rem;
          width: 100%;
          box-shadow: none;
          border: none;
          top: 50%;
        `
      : css`
          height: 80%;
          width: 80%;
          box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1);
          border: 1px solid black;
          top: 47%;
        `}
  ${({ open }) =>
    open
      ? css`
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
          visibility: visible;
        `
      : css`
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 0;
          visibility: hidden;
        `};
  /* opacity: ${({ open }) => (open ? "1" : "0")}; */
  transition: all 0.4s;
  z-index: ${({ lastClick }) => (lastClick ? "15" : "14")};
  /* visibility: ${({ open }) => (open ? "visible" : "hidden")}; */
  position: absolute;
  left: 50%;

  display: flex;
  flex-direction: column;
  background-color: white;
`;

const FolderContainer = styled.div`
  background-color: white;
  width: 100%;
  flex: 1;
  color: black;
  border: none;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
  padding: 0.4rem;
  &:focus {
    outline: none;
  }
`;

const SaveModal = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  box-shadow: 0 1rem 2rem 0.5rem rgba(0, 0, 0, 0.1);
  width: 36rem;
  height: 14rem;
  display: flex;
  flex-direction: column;
  opacity: 0;
  visibility: hidden;
  ${({ openSaveModal }) =>
    openSaveModal &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const NameAndCloseIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 10%;
  padding: 0.4rem;
`;
const Name = styled.label`
  font-size: 1.3rem;
  height: 100%;
`;

const CloseIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 50%;
`;

const Content = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  color: #3a3399;
`;

const BtnsContainer = styled.div`
  flex: 1;
  background-color: #f0f0f0;
  display: flex;
  justify-content: flex-start;
  padding-left: 1rem;
  align-items: center;
  border-top: 1px solid rgba(173, 173, 173, 0.3);
`;

const Btn = styled.button`
  background-color: #e1e1e1;
  border: 1px solid #adadad;
  padding: 0.2rem 2rem;
  height: 2.4rem;
  transition: all 0.3s;
  &:hover {
    background-color: #e5f1fb;
    border: 1px solid #0078d7;
  }
  &:not(:last-child) {
    margin-right: 0.6rem;
  }
  &:focus {
    outline: none;
  }
`;

const SaveBtn = styled(Btn)`
  border: 2px solid #0078d7;
  width: 7rem;
`;
const UnSaveBtn = styled(Btn)``;
const CancelBtn = styled(Btn)``;
