import CustomAppBar from "./appbar";
import Container from "@mui/material/Container";

export const PageTemplate = ({ children }) => {
  return (
    <>
      <CustomAppBar />
      {children}
    </>
  );
};

export default PageTemplate;
