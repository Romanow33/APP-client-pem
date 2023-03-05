import { Box, Button, Card } from "@mui/material";

export const AddEventCard = ({ action, disabled }) => {
  return (

    <Button
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#494a71",
        borderRadius: "2px",
        p: 1,
        width: "100%",
        "&:hover": { border: "none", color: "white", backgroundColor: "black" },
        fontFamily: 'Rajdhani',
        fontSize: "1.2rem",
        color: "white",
        mb: 2,
        "&.Mui-disabled": {
          color: "white"
        },
      }}
      onClick={action}
      disabled={disabled}
    >
      New Event
    </Button >
  );
};
export default AddEventCard;
