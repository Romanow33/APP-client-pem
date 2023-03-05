import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { Button, Collapse } from "@mui/material";
import IconTrash from "@mui/icons-material/Delete";
export function Droppable(props) {
  const { isOver, isEnd, setNodeRef } = useDroppable({
    id: "droppable",
  });

  const style = {
    color: isOver ? "white" : "white",
    display: "flex",
    justifyContent: isOver ? "center" : "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "2px",
    p: 1,
    height: "auto",
    borderRadius: "2%",
    margin: "none"
  };

  return (
    <Collapse
      in={props.children !== null || isOver}
      collapsedSize={250}
      orientation="vertical"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div ref={setNodeRef} style={style}>
        {isOver && (
          <>
            {props.children}
            <IconTrash
              fontSize="large"
              sx={{ width: "100px", height: "100px", marginTop: "80px" }}
              color="red"
            />
          </>
        )}
        {props.children || isOver ? (
          <>
            {props.children}
          </>
        ) : (
          <Button
            sx={{
              border: "2px dashed white",
              borderRadius: "2px",
              color: "white",
              fontFamily: 'Rajdhani',
              fontSize: "1.5rem"
            }}
          >

            Drop here to delete
          </Button>
        )}
      </div>
    </Collapse>
  );
}
