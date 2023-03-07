import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getSlideByIdDB } from '../../utils/api'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { Box, CircularProgress } from '@mui/material';

function SlideGallery({ slideId }) {
    const [slide, setSlide] = useState()

    async function getSlideByid(params) {
        const res = await getSlideByIdDB(params)
        if (res) {
            setSlide(res)
        } else {
            console.log(res)
        }
    }
    
    useEffect(() => {
        getSlideByid(slideId)
    }, [slideId])

    var settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        adaptiveHeight:true
      };

    if(!slide || !slide.images) return <CircularProgress />

    return (
        <Slider {...settings} autoplay infinite autoplaySpeed={2500} fade pauseOnHover={false} centerPadding > 
            {slide.images.map((image) => {
                return(
                    <Box sx={{height:"99.1vh", overflowY:"hidden"}}>
                        <img src={image} style={{height:"100%", width:"100%"}}/>
                    </Box>
                )
            })}
        </Slider>
    )
}

export default SlideGallery
