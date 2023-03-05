import { DndContext, PointerSensor } from "@dnd-kit/core";
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { deleteEvent, getAllEventsDB } from "../../utils/api";
import AddEventCard from "../AddEventCard";
import AddEventCardForm from "../AddEventCardForm";
import { SuccesAlert } from "../Alerts/SuccesAlert";
import AlertDialogSlide from "../Dialog";
import EventCard from "../EventCard";
import DeleteQuest from "./DeleteQuest";
import { Droppable } from "./Droppable";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AuthContext } from "../../context/auth";
import MobileCard from "../EventCard/mobileCard";
export const EventManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventId, setEventId] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSnakBar, setOpenSnakBar] = useState(false);
  const [eventToEdit, setEventToEdit] = useState({});
  const [snakMensage, setSnakMensagge] = useState("");
  const { user } = useContext(AuthContext);
  const matches = useMediaQuery('(min-width:900px)');

  const mouseSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 100,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);



  async function getAllEvents() {
    setLoading(true);
    const res = await getAllEventsDB(user.uid);
    if (res) {
      setEvents(res);
      setLoading(false);
    } else {
      console.error(res);
      setLoading(false);
    }
  }

  function handleAccept() {
    const res = deleteEvent(eventId);
    if (res) {
      handleSendAlert("Event Delete");
      setOpen(false);
      setEventId(null);
    } else {
      console.log("error");
    }
  }

  function handleShowForm() {
    setShowForm(true);
  }

  function handleShowEditForm() {
    setOpenEdit(true);
  }

  function handleHiddeForm() {
    setOpenEdit(false);
    setShowForm(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setEvents(allEvents);
    setEventId(null);
    setOpen(false);
  }

  function SelectEvent({ eventId }) {
    const eventTodelete = allEvents.filter((event) => {
      return event._id === eventId;
    });
    return <EventCard event={eventTodelete[0]} />;
  }

  function handleCloseSnak(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnakBar(false);
  }

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setAllEvents(events);
      setEventId(event.active.id);
      const newEvents = events.filter((eventCard) => {
        return eventCard._id !== event.active.id;
      });
      setEvents(() => newEvents);
      handleClickOpen();
    }
  }

  function handleCancelDrop() {
    setEventId(null);
    setEvents(events);
  }

  function handleSendAlert(mensagge) {
    setOpenSnakBar(true);
    setSnakMensagge(mensagge);
  }

  useEffect(() => {
    if (user.uid) {
      getAllEvents();
    } else {
      setLoading(true);
    }
  }, [user.uid]);
  if (loading || !events) {
    return <CircularProgress />;
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      cancelDrop={handleCancelDrop}
      sensors={sensors}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        columnGap={2}
        sx={{ paddingTop: "20px" }}
      >
        <DeleteQuest
          open={open}
          handleClose={handleClose}
          handleAccept={handleAccept}
        />
        <AlertDialogSlide
          open={openEdit}
          title="Edit"
          content={
            <AddEventCardForm
              closeAction={handleHiddeForm}
              setEvents={setEvents}
              isEdit={eventToEdit}
              sendAlert={handleSendAlert}
            />
          }
        />

        <Grid xs={12} md={2} sx={{ height: "100%", minHeight: { md: "100vh", xs: "auto" }, marginRight: { md: "20px", xs: "0" } }}>
          <AddEventCard
            title="Event Name"
            action={handleShowForm}
            disabled={showForm}
          />
          <Collapse in={showForm} orientation="vertical" >
            <AddEventCardForm
              closeAction={handleHiddeForm}
              setEvents={setEvents}
              sendAlert={handleSendAlert}
            />
          </Collapse>
          {!showForm & matches ?
            <Droppable>
              {eventId ? <SelectEvent eventId={eventId} /> : null}
            </Droppable> : null
          }
        </Grid>

        {events.length < 0 &&
          <Box
            sx={{
              width: "99%",
              height: "25vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "4px dashed gray",
            }}
          >
            < Typography variant="h3" color="grayText">
              No Events yet, create one!
            </Typography>
          </Box>
        }
        <Grid md={9}>
          <Stack direction="row" justifyContent={{ md: "flex-start", xs: "center" }} alignItems="flex-start" flexWrap="wrap" rowGap={2} columnGap={1}>
            {events.length > 0 && events?.map((event) => {
              if (matches) {
                return (
                  <EventCard
                    event={event}
                    onEdit={handleShowEditForm}
                    setEvent={setEventToEdit}
                  />
                )
              } else {
                return (
                  <MobileCard
                    event={event}
                    onEdit={handleShowEditForm}
                    setEvent={setEventToEdit}
                  />
                )
              }
            })}
          </Stack>
        </Grid>

        <SuccesAlert
          open={openSnakBar}
          handleClose={handleCloseSnak}
          menssage={snakMensage}
        />

      </Grid >
    </DndContext >
  );
};
export default EventManagement;
