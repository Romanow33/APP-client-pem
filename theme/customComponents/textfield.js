import { FormControl, Input, InputAdornment, Typography } from '@mui/material'
import React from 'react'

function PemTextfield({ icon, label, bottomColor, ...props }) {
    return (
        <>
            <Typography variant="subtitle" ml="5px" sx={{ textDecoration: "underline", mb: "20px" }}>
                {label}
            </Typography>
            <FormControl variant="standard" hiddenLabel margin="none" sx={{ mb: "20px", }}>
                <Input
                    {...props}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    }
                    autoComplete="false"
                    sx={{
                        "input:-internal-autofill-selected": {
                            appearance: "menulist - button",
                            backgroundImage: "none !important",
                            backgroundColor: "-internal-light-dark(rgb(232, 240, 254), rgba(70, 90, 126, 0.4))!important",
                            color: "fieldtext !important",
                        },
                        ':after': { borderBottomColor: bottomColor ? bottomColor : 'purple' },
                    }}
                />
            </FormControl >
        </>
    )
}

export default PemTextfield
