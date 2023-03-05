import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { getEventById, getImageDB, updateEventSlide } from "../../utils/api";
import DragAndDrop from "../DragAndDrop";
import { v4 } from "uuid"
export const SlidesModal = ({ open, handleClose }) => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [selection, setSelection] = useState([]);
  const name = useRef();
  const router = useRouter();


  async function getEventDetail() {
    setLoading(true);
    const res = await getEventById(router.query.eventId);
    try {
      if (res) {
        setEvent(res);
        setImages([...res.slidesImages, ...res.imagesSrcs])
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleSumbit() {
    const filterState = selection.filter((item, index) => {
      return selection.indexOf(item) === index;
    });
    const res = await updateEventSlide(event._id, { slide: { slideName: name.current.value, images: filterState } })
    console.log(res)
  }

  useEffect(() => {
    if (router.query.eventId) {
      getEventDetail();
    }
    return () => setEvent(null);
  }, [router.query.eventId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      fullWidth={true}
      maxWidth={"xl"}

    >
      <DialogTitle id="scroll-dialog-title">
        <TextField variant="filled" inputRef={name} />
        <Button onClick={() => router.push(`/bannercreator?=${event._id}`)}>
          Create new banner
        </Button>
      </DialogTitle>

      <DialogContent >
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          <DragAndDrop
            eventId={router.query.eventId}
            images={images}
            setImages={setImages}
            isSelectionable
            setSelection={setSelection}
            path="slideImage"
            isModal
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSumbit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SlidesModal;
