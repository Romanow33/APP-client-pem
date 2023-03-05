import { ImageList } from "@mui/material";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "blue";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-width: 4px;
  border-radius: 10px;
  border-color: gray;
  border-style: dashed;
  background-color: none;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
  margin-top: 20px
`;

function DropBox({ onDrop, children }) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <section className="dropbox">
      <Container
        {...getRootProps({
          isDragAccept,
          isFocused,
          isDragReject,
          className: "dropzone",
        })}
        onClick={(e) => {
          e.stopPropagation();
          open();
        }}
      >
        <input {...getInputProps()} />
        {children}
      </Container>
    </section>
  );
}
export default DropBox;
