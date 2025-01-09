import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaImages } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addPostModal } from "../../redux/slice";

const Addpost = () => {
  const _700 = useMediaQuery("(min-width: 700px)");
  const _500 = useMediaQuery("(min-width: 500px)");
  const _300 = useMediaQuery("(min-width: 300px)");

  const dispatch = useDispatch();

  const {openAddPostModal} = useSelector((state)=> state.service)
  
  const [text, setText] = useState();
  const [media, setMedia] = useState();

  const mediaRef = useRef();

  const handleClose = () => {
    dispatch(addPostModal(false))
  };

  const handleMediaRef = () => {
    mediaRef.current.click();
  };

  const handlePost = ()=> {
    
  }


  return (
    <>
      <Dialog
        open={openAddPostModal}
        onClose={handleClose}
        fullWidth
        fullScreen={_700 ? false : true}
      >
        <Box position={"absolute"} top={20} right={20} onClick={handleClose}>
          <RxCross2 size={28} className="image-icon" />
        </Box>
        <DialogTitle textAlign={"center"} mb={5}>
          New Thread ....
        </DialogTitle>
        <DialogContent>
          <Stack flexDirection={"row"} gap={2} mb={5}>
            <Avatar src="" alt="" />
            <Stack>
              <Typography variant="h6" fontWeight={"bold"} fontSize={"1rem"}>
                Yogesh_0001
              </Typography>
              <textarea
                cols={_500 ? 40 : 25}
                className="text1"
                row={2}
                placeholder="Start a Thread...."
                autoFocus
                onChange={(e) => setText(e.target.value)}
              />
             {
              media ? ( <img
                src={URL.createObjectURL(media)}
                alt={""}
                id="url-img"
                width={_500 ? 300 : _300 ? 200 : 100}
                height={_500 ? 300 : _300 ? 200 : 100}
              />): null
             }
              <FaImages
                size={28}
                className="image-icon"
                onClick={handleMediaRef}
              />
              <input
                type="file"
                accept="image/*"
                className="file-input"
                ref={mediaRef}
                onChange={(e) => setMedia(e.target.files[0])}
              />
            </Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6" fontSize={"1rem"} color={"gray"}>
              Anyone can reply
            </Typography>
            <Button
              size="large"
              sx={{
                bgcolor: "GrayText",
                color: "white",
                borderRadius: "10px",
                ":hover": { bgcolor: "gray", cursor: "pointer" },
              }}
              onClick={handlePost}
            >
              Post
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Addpost;
