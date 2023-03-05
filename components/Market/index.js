import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getEventById, guestGetImageDB } from "../../utils/api";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { v4 as uuid } from "uuid";
import QRCode from "react-qr-code";

export const Market = () => {
  const router = useRouter();
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);



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


  if (loading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box className="container" sx={{ heigth: 400 }}>
        <Grid
          container
          direction="row"
          justifyContent={"space-around"}
          rowGap={4}
          columnGap={1}
        >
          {event?.imagesSrcs?.map((image) => {
            return (
              <Grid xs={3}>
                <Paper
                  sx={{
                    minHeight: "250px",
                    maxHeight: "400px",
                    heigth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 250,
                      width: "100%",
                      maxHeight: { xs: 233, md: 250 },
                    }}
                    src={image}
                    srcSet={image}
                    alt={image}
                  />

                  <div
                    style={{
                      height: "auto",
                      margin: "16px auto",
                      maxWidth: 100,
                      width: "100%",
                    }}
                  >
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={`192.168.100.195:3000/guest?image=${image.src}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </>
  );
};

export default Market;
