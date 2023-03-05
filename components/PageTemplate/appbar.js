import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../../utils/api";
import { useRouter } from "next/router";
import { Link } from "@mui/material";
import { DesktopMenu, MobileMenu } from "./NavBarMenus";

const settings = [
  { label: "Profile", url: "/profile" },
  { label: "Logout", url: "logout" },
  { label: "Help", url: "/help" },
];

function CustomAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const router = useRouter();

  async function logOut() {
    const res = await logout();
    if (res) {
      router.push("/login");
    }
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundImage:
        "linear-gradient(147deg, rgba(114,243,244,1) 0%, rgba(134,29,253,1) 26%, rgba(244,69,252,1) 100%)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "black",
      padding: 0
    }}>
      <Container maxWidth="xl" sx={{ padding: 0 }}>
        <Toolbar disableGutters sx={{ display: "flex" }}>
          <MobileMenu />
          <DesktopMenu />
          <Typography variant="subtitles" noWrap component="h1" href="" sx={{
            mr: 2,
            flexGrow: 1, fontWeight: 200, letterSpacing: ".3rem", color: "black", textDecoration: "none",
            fontSize: { md: "2em", xs: "2em" }
          }}>
            <Link href="/" sx={{ textDecoration: "none", color: "black" }}>

              PEM
            </Link>

          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, border: "3px solid rgba(0, 0, 0, 0.12)" }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => {
                if (setting.url === "logout") {
                  return (
                    <MenuItem key={index} onClick={logOut}>
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  );
                } else
                  return (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default CustomAppBar;
