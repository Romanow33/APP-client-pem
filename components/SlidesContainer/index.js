import { Box, Button, Card, Container, Divider, IconButton, ImageList, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useState } from "react";
import SlidesModal from "./SlidesModal";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getEventById } from "../../utils/api";
import Image from "../DragAndDrop/Image"
import SlideCard from "../SlideCard";

export const SlidesContainer = () => {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  console.log(event)

  async function getEventDetail() {
    setLoading(true);
    const res = await getEventById(router.query.eventId);
    try {
      if (res) {
        setEvent(res);
        console.log(res)
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    if (router.query.eventId) {
      getEventDetail();
    }
    return () => setEvent(null);
  }, [router.query.eventId]);

  if (loading) return <h1>loading</h1>
  else {

    return (
      <>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="subtitle" sx={{ color: "white" }}>Event Slides</Typography>
          <Button
            sx={{
              p: 0.5,
              width: 120,
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClickOpen}
          >
            Add Slider <AddToPhotosIcon sx={{ ml: 0.5 }} />
          </Button>
        </Stack>
        <Divider sx={{ borderColor: "white", mb: 2 }} />
        <Stack direction={"row"}
          alignItems="center"
          justifyContent={"flex-start"}>

          {event?.eventSlides?.map((slide) => {
            return (
              <SlideCard slide={slide} />
            )
          })}

        </Stack>
        <Divider sx={{ borderColor: "white", mt: 2, mb: 2 }} />
        <Typography variant="subtitle" sx={{ color: "white" }}>Event Images</Typography >
        <Divider sx={{ borderColor: "white", mt: 2 }} />

        <Box className="container" sx={{ width: "100%", height: "100%" }} >
          {/* Slide images deberian guardarse por separado en el tipo slide images cuando se guarda la imagen en un slider */}
          <ImageList variant="masonry" cols={4} gap={1}>
            {event?.imagesSrcs?.map((image) => {
              return (
                <Image
                  image={image}
                  key={image}
                />
              );
            })}
          </ImageList>
        </Box>

        {event?.slidesImages?.length !== 0 &&
          <>
            <Divider sx={{ borderColor: "white", mt: 2, mb: 2 }} />

            <Typography variant="subtitle" sx={{ color: "white" }}>Slides images</Typography>

            <Divider sx={{ borderColor: "white", mt: 2, mb: 2 }} />
            <Box className="container" sx={{ width: "100%", height: "100%" }} >
              <ImageList variant="masonry" cols={4} gap={1}>
                {event?.slidesImages?.map((image) => {
                  return (
                    <Image
                      image={image}
                      key={image}
                    />
                  );
                })}
              </ImageList>
            </Box>
          </>}
        <SlidesModal open={open} handleClose={handleClose} />
      </>
    );
  }

};

export default SlidesContainer;