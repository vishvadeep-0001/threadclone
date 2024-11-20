import { Stack, Typography } from "@mui/material";
import { FaRegHeart, FaRegComment, FaRetweet } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import React from "react";

const PostTwo = () => {
  return (
    <>
      <Stack flexDirection={"column"} justifyContent={"space-between"}>
        <Stack flexDirection={"column"} gap={2}>
          <Stack flexDirection={"column"}>
            <Typography variant="h6" fontSize={"1rem"} fontWeight={"bold"}>
              Yogesh Sharma
            </Typography>
            <Typography variant="h5" fontSize={"1rem"}>
              Hi, Guyzz ! comment on this project and give your feedback.
            </Typography>
          </Stack>
          <img
            src="/error-bg.png"
            alt=""
            loading="lazy"
            width={"400px"}
            height={"auto"}
          />
        </Stack>
        <Stack flexDirection={"column"} gap={1}>
          <Stack flexDirection={"row"} gap={2} m={1}>
            <FaRegHeart size={28} />
            <FaRegComment size={28} />
            <FaRetweet size={28} />
            <IoMdSend size={28} />
          </Stack>
          <Stack
            flexDirection={"row"}
            gap={1}
            position={"relative"}
            top={3}
            left={4}
          >
            <Typography variant="caption" color="GrayText" fontSize={"1rem"}>
              2 Likes
            </Typography>

            <Typography variant="caption" color="GrayText" fontSize={"1rem"}>
              2 Comments
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PostTwo;
