import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getEventById, updateEventDB } from "../../utils/api";
import DragAndDrop from "../DragAndDrop";
import { useRouter } from "next/router";
import { deleteImage } from "../../firebase/config";
import saveZip from "../../utils/transformToZip";


export const EventDetail = ({ eventId }) => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [selection, setSelection] = useState([]);
  const [images, setImages] = useState([]);
  const router = useRouter();

  async function getEventDetail() {
    setLoading(true);
    const res = await getEventById(eventId);
    try {
      if (res) {
        setEvent(res);
        setImages(res.imagesSrcs);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }
  /*   const input = {
      title: data.get("name"),
      type: data.get("type"),
      eventDate: moment(date).format("MM/DD/YYYY"),
      author: user._id,
    }; */
  function deleteAlImages(params) {
    const array1 = event.imagesSrcs
    const array2 = params

    /* const result = newUsers.filter(e => !likedUsers.some(a => a.id == e.id));
    console.log(result) */
    //const duplicates = array1.filter(value => array2.some(oneElement => oneElement === value));
    //const duplicatesId = array1.filter(value => array2.some(oneElement => oneElement.id === value.id)).map(oneElement => oneElement.id);

 /*    const mergedArray = [
      ...array1,
      ...array2.filter(value => !duplicatesId.some(oneDuplicate => oneDuplicate === value.id))
    ]; */
    /*  ({ ...params, imagesSrcs:  }) */
    //updateEventDB
    //deleteImage(selection[0])
    console.log(array2 +"aaaaaaaa a");
  }
  console.log(selection)
  useEffect(() => {
    if (eventId) {
      getEventDetail();
    }
    return () => setEvent(null);
  }, [eventId]);

  function dowloadFileZip() {
    saveZip(event.title, event.imagesSrcs)
  }
  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Grid container direction={{ xs: "column", md: "row", sm: "row" }} justifyContent={"space-around"} sx={{ mt: 0, height: "100%", minHeight: "100vh" }}>
        <Typography
          variant="subtitle"
          noWrap
          component="a"
          sx={{
            fontWeight: 200,
            letterSpacing: ".3rem",
            textDecoration: "none",
            fontSize: "4rem",
            textAlign: "center",
            width: { xs: "100%" },
            display: { md: "none", xs: "block" },
            height: "50%",
            color: "white"
          }}
        >
          {event.title}
        </Typography>
        <Grid item xs={12} md={2}
          sx={{
            display: "flex",
            flexDirection: { md: "column", xs: "row" },
            textAlign: "left",
            justifyContent: { md: "flex-start", xs: "center" },
            alignItems: { md: "flex-start", xs: "center" },
            padding: 1
          }}>

          <Typography
            variant="subtitle"
            noWrap
            component="a"
            sx={{
              fontWeight: 200,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "4rem",
              textAlign: "left",
              display: { xs: "none", md: "inherit" },
              color: "white"

            }}
          >
            {event.title}
          </Typography>
          <Divider flexItem sx={{ borderColor: "black" }} />

          <Button
            sx={{ color: "white", justifyContent: { md: "flex-start", xs: "center" }, }}
            fullWidth
          >
            <a href={`/market?eventId=${eventId}`} target="_blank" style={{ textDecoration: "none", color: "white" }}>
              Go kioco
            </a>
          </Button>

          <Divider flexItem sx={{ borderColor: "black" }} />

          <Button sx={{
            color: "white",
            justifyContent: { md: "flex-start", xs: "center" }
          }}
            fullWidth
            onClick={dowloadFileZip}
          >
            Dowload Zip
          </Button>

          <Divider flexItem sx={{ borderColor: "black" }} />

          <Button
            onClick={() => router.push(`${eventId}/slides`)}
            sx={{
              color: "white", justifyContent: { md: "flex-start", xs: "center" }
            }}
            fullWidth
          >
            Event Slides
          </Button>

          <Divider flexItem sx={{ borderColor: "black" }} />

          {selection.length !== 0 &&
            <Button
              onClick={() => deleteAlImages(selection)}
              sx={{
                justifyContent: "flex-start"
              }}
              fullWidth
            >
              Delete
            </Button>}
        </Grid>
        <Divider orientation="vertical" flexItem sx={{ borderColor: "black" }} />
        <Grid item md={7} xs={12} sx={{ ml: 2, mr: 2, backgroundColor: "none", height: { xs: "auto" } }}>
          <DragAndDrop
            eventId={eventId}
            images={images}
            setImages={setImages}
            setSelection={setSelection}
            selection={selection}
            isSelectionable
            path="eventImages"
          />
        </Grid>
      </Grid >
    );
  }
};
export default EventDetail;
