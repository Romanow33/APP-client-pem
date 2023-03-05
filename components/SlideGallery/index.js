import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { getSlideByIdDB } from '../../utils/api'

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
    console.log(slide)
    return (
        <h1>hola</h1>
    )
}

export default SlideGallery
