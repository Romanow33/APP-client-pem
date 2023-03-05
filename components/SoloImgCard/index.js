import { Card, CardMedia } from "@mui/material";

export const SoloImageCard = ({ image }) => {
  return (
    <Card sx={{ width: "min-content" }}>
      <CardMedia
        component="img"
        sx={{ height: 200, width: "auto" }}
        image={image}
      />
    </Card>
  );
};

export default SoloImageCard;
