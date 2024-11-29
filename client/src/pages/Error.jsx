import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack>
        <Stack
          flexDirection={"column"}
          width={"100%"}
          height={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          // sx={{
          //   background: 'url("/error-bg.png")',
          //   backgroundRepeat: "no-repeat",
          //   backgroundSize: "cover"
          // }}
        >
          <Typography variant="h3">OOP's</Typography>
          <Typography variant="h6">You Entered Wrong Location !</Typography>
          <Button
            size="large"
            sx={{
              bgcolor: "green",
              marginTop: "10px",
              color: "white",
              borderRadius: "4px",
              py: "5px",
              px: "15px",
            }}
            onClick={() => navigate(-1)}
          >
            Go Back !
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Error;
