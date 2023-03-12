import { Checkbox, ImageListItem } from "@mui/material";
import React from "react";
function Image({ image, isSelectionable, setSelection, selection }) {
  return (
    <ImageListItem key={image} sx={{ p: 1 }}>
      {isSelectionable && (
        <Checkbox
          sx={{ position: "absolute", right: "0" }}
          onClick={(e) => {
            e.stopPropagation();
            console.log(selection)
            let res = ""
            if (selection && selection.length != 0) res = selection?.filter((selectedImage) => selectedImage != image)
            setSelection(res);
          }}
        />
      )}
      <img src={image} srcSet={image} alt={image} />
    </ImageListItem>
  );
}
export default Image;
