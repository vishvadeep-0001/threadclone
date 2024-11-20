import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";

const ProfileBar = () => {
  return (
    <>
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        px={1}
        width={"90%"}
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
            <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
              Yogesh_2004
            </Typography>
            <Typography variant="caption" fontSize={"1.1rem"} color="gray">
              This is Bio
            </Typography>
            <Typography variant="caption" fontSize={"1rem"}>
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
