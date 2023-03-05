import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import SeeMore from "@mui/icons-material/Visibility";
import Edit from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

const SlideCard = ({ slide, onEdit, setEvent }) => {
    const router = useRouter();


    return (
        <Card sx={{ heigth: 50, width: 250, backgroundColor: "#494a71", color: "white", display: "flex", flexDirection: "row", }}>
            <Box sx={{ width: "100%" }}>
                <CardHeader
                    title={<Typography variant="subtitle" component="h2" sx={{ letterSpacing: "1px" }}>{slide.slideName}</Typography>}
                />
                <CardContent>
                    <Typography sx={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "flex-start",
                        columnGap: "8px",
                        fontFamily: 'Rajdhani',
                        fontWeight: 200
                    }}>
                        {slide.images?.length} photos
                    </Typography>
                </CardContent>
            </Box>
            <Divider orientation="vertical" flexItem />
            <CardActions sx={{ flexDirection: "column", justifyContent: "flex-start", alignItems: "center", margin: 0, padding: 0 }}>
                <IconButton
                    aria-label="settings"
                    onClick={() => router.push(`/slide/${slide.id}`)}
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
                        onEdit(), setEvent(slide);
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
    )
}

export default SlideCard
