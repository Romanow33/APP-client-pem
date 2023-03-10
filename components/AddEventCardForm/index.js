import Close from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import { CreateEventDB, updateEventDB } from "../../utils/api";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import moment from "moment";
import PemTextfield from "../../theme/customComponents/textfield";

export const AddEventCardForm = ({
  closeAction,
  setEvents,
  isEdit,
  sendAlert,
}) => {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("");
  const [date, setDate] = useState(moment());
  const [name, setName] = useState("");

  const options = [
    "Birthday",
    "Business",
    "Convention",
    "Exposition",
    "Marriage",
    "Others",
  ];

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeDate = (newValue) => {
    setDate(newValue);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  console.log(isEdit)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let input = {}
    if(isEdit){
      input = Object.assign(isEdit, {title: data.get("name"), type: data.get("type") });
      console.log(input)
    }else{
        input = {
        title: data.get("name"),
        type: data.get("type"),
        eventDate: moment(date).format("MM/DD/YYYY"),
        author: user._id,
      };
    }

    if (isEdit) {
      const res = await updateEventDB(isEdit._id, input);
      if (res) {
        setEvents((events) => {
          const newEvents = events.filter((event) => event._id !== res._id);
          return [...newEvents, res];
        });
        closeAction();
        sendAlert("Succes Edit!");
      } else {
        console.log("Error: ", res);
      }
    } else {
      try {
        const res = await CreateEventDB(input);
        if (res) {
          console.log("Create event Succes:", res);
          setEvents((events) => [...events, res]);
          closeAction();
          sendAlert("Succes create!");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setType(isEdit.type);
      setDate(isEdit.eventDate);
      setName(isEdit.title);
      return () => {
        setName("");
        setType("");
        setDate(moment());
      };
    }
  }, [isEdit]);

  return (
    <Card sx={{
      p: 1,
      backgroundColor: "#494a71",
      color: "white",
      maxWidth: {
        md: 250, xs: "100%"
      },
      mb: { xs: 4 }

    }}
    >
      <CardContent>
        <Typography variant="subtitle" sx={{ textDecoration: "underline", mb: "20px", fontWeight: 200 }}>
          Event title
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{
          mt: 0,
          flexDirection: "column",
          display: "flex"
        }}>
          <PemTextfield
            required
            fullWidth
            id="name"
            bottomColor="white"
            label={isEdit ? "" : ""}
            name="name"
            value={name || ""}
            onChange={handleChangeName}
          />
          <Typography variant="subtitle" sx={{ textDecoration: "underline", mb: "20px", fontWeight: 200 }}>
            Event Type
          </Typography>
          <Select
            id="type"
            value={type || ""}
            fullWidth
            required
            name="type"
            onChange={handleChangeType}
            sx={{
              mb: "20px",
              ':after': { border: '1px solid white' },
              "& .MuiPopover-root": {
                backgroundColor: "red"
              }
            }}
            variant="standard"
          >
            {options.map((option) => (
              <MenuItem key={option} value={option.toLowerCase()}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="subtitle" sx={{ textDecoration: "underline", mb: "25px", fontWeight: 200 }}>
            Event Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DesktopDatePicker
              inputFormat="MM/DD/YYYY"
              value={date}
              required
              name="date"
              id="date"
              onChange={handleChangeDate}
              renderInput={(params) => <TextField variant="standard" sx={{
                '& .MuiInput-root:after': { borderBottomColor: 'white' },
              }} {...params} />}
            />
          </LocalizationProvider>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              border: "1px solid gray",
              backgroundColor: "black",
              ":hover": {
                backgroundColor: "inherit"
              },
              mt: 4
            }}
          >
            {isEdit ? "Edit" : "Create"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={closeAction}
            label={"Cancel"}
            sx={{
              border: "1px solid gray",
              backgroundColor: "black",
              ":hover": {
                backgroundColor: "inherit"
              },
              mt: 2
            }}

          >
            Cancel
          </Button>
        </Box>
      </CardContent>
    </Card >
  );
};
export default AddEventCardForm;
