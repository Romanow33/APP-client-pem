import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import AlertDialogSlide from "../Dialog";

export function DeleteQuest({ open, handleAccept, handleClose }) {
  const Decline = () => {
    return <Button sx={{ width: 200, color: "white", backgroundColor: "black", ":hover": { color: "white", backgroundColor: "black" } }} onClick={handleClose}>Decline</Button>;
  };

  const OnAccept = () => {
    return <Button sx={{ width: 200, color: "white", backgroundColor: "red", ":hover": { color: "white", backgroundColor: "red" } }} onClick={handleAccept}>Accept</Button>;
  };
  return (
    <AlertDialogSlide
      open={open}
      handleClose={handleClose}
      content={
        <Stack sx={{ padding: "40px" }}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography variant="subtitle" sx={{ fontWeight: 700, fontSize: "2rem", mb: 4 }}>
            Are You sure to delete this event?
          </Typography>
          <Stack direction="row" columnGap={4}>
            <Decline />
            <OnAccept />
          </Stack>
        </Stack>}
    />
  );
}

export default DeleteQuest;
