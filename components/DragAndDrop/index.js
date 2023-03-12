import { updateEventImage, updateSlidesImage } from "../../utils/api";
import { uploadFile } from "../../firebase/config";
import { Box, Grid, ImageList, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback } from "react";
import DropBox from "./DropBox";
import Image from "./Image";

function DragAndDrop({
  eventId,
  images,
  setImages,
  isSelectionable,
  setSelection,
  path,
  selection,
  isModal
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map(async (file) => {
      try {
        const result = await uploadFile(path + "/" + file.name, file)
        if (result) {
          if (path.includes("slide")) {
            await updateSlidesImage(eventId, { slidesImages: [result] })
            setImages((prevState) => [
              ...prevState,
              result
            ]);
          } else {
            await updateEventImage(eventId, { imagesSrcs: [result] })
            setImages((prevState) => [
              ...prevState,
              result
            ]);
          }
        }
      } catch (error) {
        console.error(error);
      }

    })
  }, []);
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Grid sx={{ backgroundColor: "none" }}>
      <DropBox
        onDrop={(e) => {
          onDrop(e);
        }}
        onClick={(e) => e.stopPropagation()}
        images={images}
      >{matches ?
        <>
          {images.length !== 0 ? (
            <Box className="container" sx={{ width: "100%", height: "100%" }} >
              <ImageList variant="standard" cols={4} gap={1}>
                {images.map((image) => {
                  return (
                    <Image
                      image={image}
                      key={image}
                      isSelectionable={isSelectionable}
                      setSelection={setSelection}
                    />
                  );
                })}
              </ImageList>
            </Box>
          ) : (
            <Box sx={{ backgroundColor: "transparent" }}>
              <Typography variant="subtitle" sx={{ color: "white" }}>Drag 'n' drop some files here</Typography>
            </Box>
          )}
        </> : <>
          {
            images.length !== 0 ? (
              <Box className="container" sx={{ width: "100%", height: "100%" }} >
                <ImageList variant="standard" cols={1} gap={1}>
                  {images.map((image) => {
                    return (
                      <Image
                        image={image}
                        key={image}
                        isSelectionable={isSelectionable}
                        selection={selection}
                      />
                    );
                  })}
                </ImageList>
              </Box>
            ) : (
              <Box sx={{ backgroundColor: "transparent" }}>
                <Typography variant="subtitle" sx={{ color: "white" }}>Drag 'n' drop some files here</Typography>
              </Box>
            )
          }
        </>
        }
      </DropBox>
    </Grid >
  );
}
export default DragAndDrop;
