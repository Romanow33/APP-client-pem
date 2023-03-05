import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";

export const GuestDowload = () => {
  const router = useRouter();

  const downloadImage = () => {
    saveAs(router.query.image, "image.jpg"); // Put your image url here.
  };

  return (
    <>
      <img
        src={router.query.image}
        srcSet={router.query.image}
        alt={router.query.image}
      />
      <Button onClick={downloadImage}>Download</Button>;
    </>
  );
};
export default GuestDowload;
