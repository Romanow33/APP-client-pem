import { Button } from '@mui/material'
import React from 'react'

function PemButton({ label, ...props }) {
    return (
        <Button {...props} sx={{
            width: "100%",
            color: "black",
            fontFamily: 'Rajdhani',
            padding: "5px 10px",
            margin: "4px",
            fontSize: "1.4em",
            fontWeight: "bold",
            transition: "transform box-shadow 1s",
            border: "5px solid",
            borderImage: "linear-gradient(147deg, rgba(114,243,244,1) 0%, rgba(134,29,253,1) 26%, rgba(244,69,252,1) 100%) 1",
            ":hover": {
                transform: "scale(1.02 ,  1.02 )",
                boxShadow: "-2px 9px 49px -25px rgba(0,0,0,0.72)",
                "-webkit-box-shadow": "-2px 9px 49px -25px rgba(0,0,0,0.72)",
                "-moz-box-shadow": "-2px 9px 49px -25px rgba(0,0,0,0.72)",

            }
        }}>
            {label}
        </Button>
    )
}

export default PemButton
