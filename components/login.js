import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { sendLogin, singUp } from "../utils/api";
import { IconButton, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useRouter } from "next/router";
import PemTextfield from "../theme/customComponents/textfield";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import PemButton from "../theme/customComponents/PemButton";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function Login() {
  const [isSingup, setIsSIngup] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const input = {
      email: data.get("email"),
      password: data.get("password"),
      ...(isSingup && {
        firstName: data.get("firstname"),
        lastName: data.get("lastname"),
        repassword: data.get("repassword")
      }),
    };
    console.log(input)
    if (isSingup) {
      const res = await singUp(input);
      if (res.status === 201) {
        const loginRes = await sendLogin({
          email: input.email,
          password: input.password,
        });
        if (loginRes.status === 200) {
          router.push("/");
        }
      } else {
        console.log(res);
      }
    } else {
      const res = await sendLogin(input);
      if (res.status === 200) {
        router.push("/");
      } else {
        console.log(res);
      }
    }
  };

  const formSwitcher = () => setIsSIngup(!isSingup);

  return (
    <Grid container
      component="main"
      justifyContent="center"
      sx={{
        height: "100vh",
        backgroundImage:
          "linear-gradient(147deg, rgba(114,243,244,1) 0%, rgba(134,29,253,1) 26%, rgba(244,69,252,1) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Grid
        item
        xs={false}
        sm={12}
        md={12}
      />
      <Box
        sx={{
          height: "100%",
          width: "30em",
          backgroundColor: "white",
          padding: "20px 40px",
          textAlign: "left",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column"
        }}
      >
        {isSingup ? (
          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ ml: "0px", padding: "0px" }}>
            <Typography component="h1" variant="titles" textAlign="right" padding="0px" sx={{ textDecoration: "underline", fontSize: "2em", cursor: "pointer" }} onClick={formSwitcher}>
              Back
            </Typography>
          </Stack>
        ) : (
          <Typography component="h1" variant="titles" textAlign="center" padding="15px 15px" sx={{
            textDecoration: "underline",
            marginBottom: "50px"
          }}>
            Login
          </Typography>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            height: "100%",
            backgroundColor: "white",
            textAlign: "left",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}

        >

          {isSingup && (
            <>
              <PemTextfield
                id="firstname"
                label="First Name"
                name="firstname"
                icon={<PersonIcon />}
                sx={{ width: "500px" }}
              />
              <PemTextfield
                id="lastname"
                label="Last Name"
                name="lastname"
                icon={<PersonIcon />}
                sx={{ width: "500px" }}
              />
            </>
          )}

          <PemTextfield
            margin="normal"
            name="email"
            variant="standard"
            icon={<AlternateEmailIcon />}
            label="Account email"
          />
          <PemTextfield
            margin="normal"
            name="password"
            variant="standard"
            icon={<PasswordIcon />}
            label="Your password"
          />

          {isSingup &&
            <PemTextfield
              name="repassword"
              label="Repeat your password"
              type="repassword"
              id="repassword"
              variant="standard"
              icon={<PasswordIcon />}
            />
          }
          {!isSingup ? (
            <Stack direction="column" justifyContent="center" alignContent="center" mt="50px">
              <PemButton
                type="submit"
                label="LogIn"
                sx={{ marginBottom: "40px" }}
              />
              <Typography component="h1" variant="titles" textAlign="center" sx={{ fontSize: "1.5em", marginTop: "20px" }}>
                No tienes cuenta?
                <a onClick={formSwitcher} style={{ cursor: "pointer", textDecoration: "underline" }}>
                  {" "}SingUp
                </a>
              </Typography>
            </Stack>
          ) : (
            <PemButton
              type="submit"
              label="SingUp"
            />
          )}
        </Box>

      </Box>
    </Grid >
  );
}
