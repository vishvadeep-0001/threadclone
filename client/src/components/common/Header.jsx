import { Grid2, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../redux/slice";

const Header = () => {
  const { darkMode } = useSelector((state) => state.service);

  const _700 = useMediaQuery("(min-width : 700px)");

  const dispatch = useDispatch();

  const handleOpenMenu = (e) => {
    dispatch(toggleMainMenu(e.currentTarget));
  };

  return (
    <>
      {_700 ? (
        <Stack
          flexDirection={"row"}
          height={52}
          justifyContent={"space-around"}
          alignItems={"center"}
          position={"sticky"}
          top={0}
          py={1}
        >
          {darkMode ? (
            <img
              src="/Threads-logo-black-bg.webp"
              alt="Logo"
              height={40}
              width={50}
            />
          ) : (
            <img
              src="/Threads-logo-white-bg.png"
              alt="Logo"
              height={40}
              width={35}
            />
          )}
          <Stack
            justifyContent={"center"}
            width={"550px"}
            bgcolor={darkMode ? "" : "aliceblue"}
            zIndex={2}
            height={96}
          >
            <Navbar />
          </Stack>
          <IoMenu
            size={36}
            className="image-icon"
            color="gray"
            onClick={handleOpenMenu}
          />
        </Stack>
      ) : (
        <>
          <Stack
            position={"fixed"}
            bottom={0}
            justifyContent={"center"}
            width={"100%"}
            height={52}
            p={1}
            bgcolor={"aliceblue"}
            zIndex={2}
          >
            <Navbar />
          </Stack>
          <Grid2
            container
            height={60}
            justifyContent={"flex-end"}
            alignItems={"center"}
            p={1}
          >
            <Grid2 size={{ xs: 6 }}>
              <img
                src="/Threads-logo-white-bg.png"
                alt="logo"
                width={60}
                height={35}
              />
            </Grid2>
            <IoMenu size={36} className="image-icon" color="gray" />
          </Grid2>
        </>
      )}
    </>
  );
};

export default Header;
