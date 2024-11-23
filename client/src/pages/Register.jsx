import {
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

const Register = () => {
  const _700 = useMediaQuery("(min-width: 700px)");

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleLogin = () => {
    setLogin((prev) => !prev);
  };

  const handleLogin = () => {
    const data = {
      email,
      password,
    };
    console.log(data);
  };
  const handleRegister = () => {
    const data = {
      username,
      email,
      password,
    };
    console.log(data);
  };
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={
          _700
            ? {
                backgroundImage: "url('/register-bg.webp')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 600px",
              }
            : null
        }
      >
        <Stack 
        flexDirection={"column"} 
        width={_700 ? "40%" : "90%"} 
        gap={2} 
        mt={_700 ? 20 : 0}>
          <Typography
            variant="h5"
            fontSize={_700 ? "1.5rem" : "1.5rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            {login ? "Login with email" : "Register with email"}
          </Typography>
          {login ? null : (
            <TextField
              variant="outlined"
              placeholder="Enter your username ..."
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <TextField
            variant="outlined"
            placeholder="Enter your Email ..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter your password ..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            size="large"
            sx={{
              width: "100%",
              height: 52,
              bgcolor: "green",
              color: "white",
              fontSize: "1rem",
              ":hover": {
                bgcolor: "blue",
                cursor: "pointer",
              },
            }}
            onClick={login ? handleLogin : handleRegister}
          >
            {login ? "Login" : "Signup"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1rem" : "1rem"}
            alignSelf={"center"}
          >
            {login ? "Don't have an account ? " : "Already have an account ? "}
            <span className="login-link" onClick={toggleLogin}>
              {login ? "Signup" : "Login"}
            </span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
