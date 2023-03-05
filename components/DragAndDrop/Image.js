import { Checkbox, ImageListItem } from "@mui/material";
import React from "react";
function Image({ image, isSelectionable, setSelection }) {
  return (
    <ImageListItem key={image} sx={{ p: 1 }}>
      {isSelectionable && (
        <Checkbox
          sx={{ position: "absolute", right: "0" }}
          onClick={(e) => {
            e.stopPropagation();
            setSelection((state) => [...state, image]);
          }}
        />
      )}
      <img src={image} srcSet={image} alt={image} />
    </ImageListItem>
  );
}
export default Image;
