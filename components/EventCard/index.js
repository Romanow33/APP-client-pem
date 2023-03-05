import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SeeMore from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import CelebrationIcon from "@mui/icons-material/Celebration";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import FestivalIcon from "@mui/icons-material/Festival";
import CakeIcon from "@mui/icons-material/Cake";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useDraggable } from "@dnd-kit/core";
export const EventCard = ({ event, onEdit, setEvent }) => {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event._id,
  });

  function selectTypeEvent(type) {
    let selectedType = {};
    switch (type) {
      case "birthday":
        selectedType = { name: "Birthday", icon: <CelebrationIcon /> };
        break;
      case "business":
        selectedType = { name: "Business", icon: <BusinessCenterIcon /> };
        break;
      case "convention":
        selectedType = { name: "Convention", icon: <GroupsIcon /> };
        break;
      case "exposition":
        selectedType = { name: "Exposition", icon: <FestivalIcon /> };
        break;
      case "marriage":
        selectedType = { name: "Marriage", icon: <CakeIcon /> };
        break;
      case "others":
        selectedType = { name: "Others", icon: <BookmarkAddedIcon /> };
        break;

      default:
        break;
    }
    return selectedType;
  }
  return (
    <Card ref={setNodeRef}  {...listeners} {...attributes} sx={{ transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined, heigth: 50, width: 250, backgroundColor: "#494a71", color: "white", display: "flex", flexDirection: "row", }}>
      <Box sx={{ width: "100%" }}>
        <CardHeader
          title={<Typography variant="subtitle" component="h2" sx={{ letterSpacing: "1px" }}>{event.title}</Typography>}
        />
        <CardContent>
          <Typography>{event.eventDate}</Typography>
          <Typography
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-start",
              columnGap: "8px",
              fontFamily: 'Rajdhani',
              fontWeight: 200
            }}
          >
            {selectTypeEvent(event.type).name}{" "}
            {selectTypeEvent(event.type).icon}{" "}
          </Typography>

          <Typography sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "flex-start",
            columnGap: "8px",
            fontFamily: 'Rajdhani',
            fontWeight: 200
          }}>{event.imagesSrcs?.length} photos</Typography>
        </CardContent>
      </Box>
      <Divider orientation="vertical" flexItem />
      <CardActions sx={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", margin: 0, padding: 0 }}>
        <IconButton
          aria-label="settings"
          onClick={() => router.push(`/events/${event._id}`)}
          sx={{
            margin: "0px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "0px",
            width: "100%",
            "&:not(:first-of-type)": {
              marginLeft: "0px"
            }
          }}
        >
          <SeeMore />
        </IconButton>
        <IconButton
          aria-label="settings"
          onClick={() => {
            onEdit(), setEvent(event);
          }}
          sx={{
            margin: "0px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            borderRadius: "0px",
            width: "100%",
            "&:not(:first-of-type)": {
              marginLeft: "0px"
            }
          }}
        >
          <Edit />
        </IconButton>
      </CardActions>
    </Card >
  );
};
export default EventCard;
