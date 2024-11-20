import React from "react";
import { Stack } from "@mui/material";
import Post from "../../../components/home/Post";

const Thread = () => {
  return (
    <>
      <Stack
        flexDirection={"column"}
        gap={2}
        mb={10}
        width={"800px"}
        mx={"auto"}
      >
        <Post />
        <Post />
        <Post />
      </Stack>
    </>
  );
};

export default Thread;
