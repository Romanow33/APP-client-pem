import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export const SuccesAlert = ({ open, handleClose, menssage }) => {
  const [openSank, setOpenSnak] = useState(open);

  useEffect(() => {
    setOpenSnak(open);
  }, [open]);

  return (
    <Snackbar open={openSank} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {menssage}
      </Alert>
    </Snackbar>
  );
};
