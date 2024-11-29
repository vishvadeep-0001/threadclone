import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const MainMenu = () => {
  const handleClose = () => {};

  const handleLogout = () => {};

  const handleToggleTheme = () => {};
  return (
    <>
      <Menu
        anchorEl={""}
        open={true}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme </MenuItem>
        <Link to={"/profile/threads/2"} className="link">
          <MenuItem>My Profile </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default MainMenu;
