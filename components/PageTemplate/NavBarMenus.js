import { Box, Button, IconButton, Link, Menu, MenuItem, Typography } from "@mui/material"
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
    { label: "My Events", url: "/events" },
];
export const DesktopMenu = () => {

    return (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex", } }}>
            {pages.map((page, index) => (
                <Button
                    key={index}
                    sx={{ my: 1, color: "black", display: "block", }}
                >
                    <Link href={page.url} sx={{ textDecoration: "none", color: "black", fontFamily: 'Rajdhani', fontWeight: 800 }}>
                        {page.label}
                    </Link>
                </Button>
            ))}
        </Box>
    )
}

export const MobileMenu = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    return (
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true"
                onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
                keepMounted transformOrigin={{ vertical: "top", horizontal: "left", }} open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu} sx={{ display: { xs: "block", md: "none" }, }}>
                {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                        <a href={page.url}>
                            <Typography textAlign="center" sx={{ color: "black" }}>{page.label}</Typography>
                        </a>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}