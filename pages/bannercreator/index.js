import { Box, Button, TextField, Typography } from '@mui/material'
import { createRef, useState } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import PageTemplate from '../../components/PageTemplate'
import { uploadFile } from '../../firebase/config'

function BannerCreator() {
    const screenRef = createRef(null)
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0,
    });
    const [bannerName, setBannerName] = useState()
    const [nameXposition, setnameXposition] = useState()
    const [nameyposition, setnameYposition] = useState()
    const [bannerBgColor, setBannerBgColor] = useState(null)
    const [bannerWidth, setBannerWidth] = useState(null)
    const [bannerHeight, setBannerHeight] = useState(null)
    const getImage = () => takeScreenShot(screenRef.current)

    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    async function handleSumbit(params) {
        const result = await uploadFile("slideImages/" + bannerName, dataURLtoFile(image))
        console.log(result)
        //esto se sube a firebase pero no al backend hay que conectarlo con los slide/events de alguna fucking manera
    }

    return (
        <PageTemplate>
            <div>
                <div>
                    Title
                    <TextField variant="filled" onChange={(e) => setBannerName(e.target.value)} />
                    xPosition title
                    <TextField variant="filled" onChange={(e) => setnameXposition(e.target.value)} />
                    yPositionTitle
                    <TextField variant="filled" onChange={(e) => setnameYposition(e.target.value)} />
                    bgColor
                    <TextField variant="filled" onChange={(e) => setBannerBgColor(e.target.value)} />
                    bannerWidth
                    <TextField variant="filled" onChange={(e) => setBannerWidth(e.target.value)} />
                    banne heigth
                    <TextField variant="filled" onChange={(e) => setBannerHeight(e.target.value)} />

                    <button style={{ marginBottom: '10px' }} onClick={getImage}>
                        Take screenshot
                    </button>
                </div>
                {image &&
                    <>
                        <img width={1000} src={image} alt={'Screenshot'} />
                        <Button onClick={handleSumbit}>
                            Save Image
                        </Button>
                    </>
                }
                <div ref={screenRef}>
                    <Box sx={{ backgroundColor: bannerBgColor, width: bannerWidth + "px", height: bannerHeight + "px" }}>
                        <Typography sx={{ position: "absolute", transform: `translate(${nameXposition}px, ${nameyposition}px)` }}>{bannerName}</Typography >
                    </Box>
                </div>
            </div>
        </PageTemplate >
    )
}
export default BannerCreator
