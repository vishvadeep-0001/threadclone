import { Avatar, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const ProfileBar = () => {
  const _700 = useMediaQuery("(min-width: 700px)");
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        width={_700 ? "80%" : "90%"}
        py={2}
        mx={"auto"}
        boxShadow={"5px 5px 5px gray"}
        borderRadius={"15px"}
        sx={{
          ":hover": { cursor: "pointer" },
        }}
      >
        <Stack flexDirection={"row"} gap={2}>
          <Avatar src="" alt="" />
          <Stack flexDirection={"column"} >
            <Typography variant="h6" fontWeight={"bold"} fontSize={_700 ? "1rem" : "0.9rem"}>
              Yogesh_2004
            </Typography>
            <Typography variant="caption" fontSize={_700 ? "1.1rem" : "0.75rem"} color="gray">
              This is Bio
            </Typography>
            <Typography variant="caption" fontSize={_700 ? "1rem" : "0.9rem"}>
              3 Followers
            </Typography>
          </Stack>
        </Stack>
        <Button size="medium" 
        sx={{
            border: '1px soild gray',
            color: "black",
            borderRadius: "10px",
            p: 2,
            height: 40,
        }}>Follow</Button>
      </Stack>
    </>
  );
};

export default ProfileBar;
