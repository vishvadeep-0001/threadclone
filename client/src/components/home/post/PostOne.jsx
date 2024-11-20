import { Avatar, AvatarGroup, Badge, Stack, Stepper } from "@mui/material";
import React from "react";

const PostOne = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              alt="+"
              src=""
              sx={{
                backgroundColor: "green",
                width: 20,
                height: 20,
                position: "relative",
                bottom: 4,
                right: 4,
              }}
            >
              +
            </Avatar>
          }
        >
          <Avatar
            alt="AJ"
            src=""
            sx={{
              width: 40,
              height: 40,
            }}
          />
        </Badge>
        <Stack
          flexDirection={"colum"}
          alignItems={"center"}
          gap={2}
          height={"100%"}
        >
          <Stepper
            orientation="vertical"
            activeStep={0}
            sx={{
              border: "0.1rem soild gray",
              width: "0px",
              height: "100%",
            }}
          ></Stepper>
          <AvatarGroup
            total={3}
            // max={3}
            sx={{
              "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 12 },
            }}
          >
            <Avatar src="" alt="" />
          </AvatarGroup>
        </Stack>
      </Stack>
    </>
  );
};

export default PostOne;
